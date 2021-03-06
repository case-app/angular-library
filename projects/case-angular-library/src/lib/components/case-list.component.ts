import { Component, Inject } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'

import { ReplaySubject, timer } from 'rxjs'
import { switchMap } from 'rxjs/operators'

import { LinkType } from '../enums/link-type.enum'
import { CaseConfig } from '../interfaces/case-config.interface'
import { Filter } from '../interfaces/filter.interface'
import { KeyNumber } from '../interfaces/key-number.interface'
import { OrderByChangedEvent } from '../interfaces/order-by-changed-event.interface'
import { Paginator } from '../interfaces/paginator.interface'
import { ResourceDefinition } from '../interfaces/resource-definition.interface'
import { AuthService } from '../services/auth.service'
import { BreadcrumbService } from '../services/breadcrumb.service'
import { FlashMessageService } from '../services/flash-message.service'
import { ResourceService } from '../services/resource.service'

@Component({
  template: 'NO UI TO BE FOUND HERE!'
})
export class CaseListComponent {
  definition: ResourceDefinition
  paginator: Paginator<any>
  paginator$: ReplaySubject<Paginator<any>> = new ReplaySubject()

  createResourcePermission: string

  filters: Filter[]
  resolvedFilters: Filter[]

  orderBy: string
  orderByDesc = false
  loading = false

  LinkType = LinkType

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private resourceService: ResourceService,
    private flashMessageService: FlashMessageService,
    private authService: AuthService,
    @Inject('CASE_CONFIG_TOKEN') private config: CaseConfig
  ) {}

  async initListView() {
    this.createResourcePermission = `add${this.classify(this.definition.slug)}`
    this.resolvedFilters = await this.resolveFilters(this.filters)

    this.activatedRoute.queryParams.subscribe(async (queryParams: Params) => {
      this.orderBy = queryParams.orderBy
      this.orderByDesc = queryParams.orderByDesc === 'true'

      const initialValuesNotInQueryParams: { [key: string]: any } =
        this.getInitialValuesNotInQueryParams(queryParams)

      // If we have initial values, we add them to the URL queryParams.
      if (!this.isObjectEmpty(initialValuesNotInQueryParams)) {
        return this.router.navigate(
          [`/${this.definition.path || this.definition.slug}`],
          {
            queryParams: initialValuesNotInQueryParams,
            queryParamsHandling: 'merge'
          }
        )
      }

      this.setFilterInitialValues(queryParams)

      delete this.paginator
      this.loading = true

      this.getItems(queryParams)
        .then((res: Paginator<any> | { filePath: string }) => {
          this.loading = false
          // If it's an export, we open a new tab to download Excel file.
          if (queryParams.toXLS) {
            return this.exportFile((res as { filePath: string }).filePath)
          } else {
            this.paginator = res as Paginator<any>
            this.paginator$.next(this.paginator)
          }

          this.getKeyNumbers(queryParams)
        })
        .catch((err) => {
          this.loading = false
          this.flashMessageService.error(
            `Une erreur a eu lieu : impossible de r??cup??rer la liste des ${this.definition.namePlural}.`
          )
        })

      this.setBreadcrumbs()
    })
  }

  getItems(
    queryParams: object
  ): Promise<Paginator<any> | { filePath: string }> {
    return this.resourceService
      .list(this.definition.slug, queryParams)
      .toPromise()
  }

  // Return a promise of an array of filters with all async items rendered.
  resolveFilters(filters: Filter[]): Promise<Filter[]> {
    if (!filters || !filters.length) {
      return Promise.resolve([])
    }

    const asyncFilterPromises: Promise<any>[] = []

    filters.forEach((filter: Filter) => {
      if (typeof filter.selectOptions === 'function') {
        asyncFilterPromises.push(
          filter.selectOptions().then((res) => {
            filter.selectOptions = res
          })
        )
      }
    })

    return Promise.all(asyncFilterPromises).then(() => filters)
  }

  async getKeyNumbers(queryParams: Params) {
    if (!this.definition.keyNumbers || !this.definition.keyNumbers.length) {
      return
    }

    const permissions = await this.authService.getPermissions()

    this.definition.keyNumbers = this.definition.keyNumbers.filter(
      (kN: KeyNumber) => !kN.permission || permissions.includes(kN.permission)
    )

    this.definition.keyNumbers.forEach((keyNumber: KeyNumber) => {
      if (keyNumber.subscription) {
        keyNumber.subscription.unsubscribe()
        keyNumber.value = null
      }

      keyNumber.subscription = timer(2000)
        .pipe(
          switchMap(() => {
            keyNumber.loading = true
            return this.resourceService.list(
              this.definition.slug,
              Object.assign(keyNumber.extraParams, queryParams)
            )
          })
        )
        .subscribe((res: number) => {
          keyNumber.loading = false
          keyNumber.value = res
        })
    })
  }

  setFilterInitialValues(queryParams: Params) {
    // Common for all lists.
    this.orderBy = queryParams.orderBy
    this.orderByDesc = queryParams.orderByDesc === 'true'

    // Specific filters.
    this.resolvedFilters.forEach((filter: Filter) => {
      filter.initialValue = filter.initialValue || {}

      if (filter.property) {
        filter.properties = { value: filter.property }
      }

      Object.keys(filter.properties || []).forEach((inputProp: string) => {
        const filterProp: string = filter.properties[inputProp]
        if (queryParams[filterProp]) {
          filter.initialValue[inputProp] = queryParams[filterProp]
        }
      })
    })
  }

  // Return an object of filter initial values not in queryParams.
  getInitialValuesNotInQueryParams(queryParams: Params): {
    [key: string]: any
  } {
    return this.resolvedFilters.reduce((acc, filter: Filter) => {
      if (filter.property) {
        filter.properties = { value: filter.property }
      }

      Object.keys(filter.properties).forEach((inputProp) => {
        const propName: string = filter.properties[inputProp]

        if (
          filter.initialValue &&
          filter.initialValue[inputProp] &&
          !queryParams[propName]
        ) {
          acc[propName] = filter.initialValue[inputProp]
        }
      })
      return acc
    }, {})
  }

  setBreadcrumbs() {
    this.breadcrumbService.breadcrumbLinks.next([
      {
        path: `/${this.definition.path || this.definition.slug}`,
        label: this.definition.title
      }
    ])
  }

  exportFile(path: string) {
    window.open(`${this.config.storagePath}/${path}`)

    // Remove param and reload list
    const exportParams: any = {}
    exportParams.toXLS = null
    this.router.navigate([`/${this.definition.path || this.definition.slug}`], {
      queryParams: exportParams,
      queryParamsHandling: 'merge'
    })
  }

  onFilterValueChanged(value: { [key: string]: string }, filter: Filter) {
    // Return to page 1 when changing a filter. Reload to force reloading (not automatic in array queryParams)
    const queryParams: Params = { page: '1', reload: new Date().toISOString() }

    Object.keys(filter.properties).forEach((inputProp: string) => {
      queryParams[filter.properties[inputProp]] = value[inputProp]
    })
    this.router.navigate([`/${this.definition.path || this.definition.slug}`], {
      queryParams,
      queryParamsHandling: 'merge'
    })
  }

  onPageChanged(page: number) {
    const queryParams: Params = { page: page.toString() }
    this.router.navigate([`/${this.definition.path || this.definition.slug}`], {
      queryParams,
      queryParamsHandling: 'merge'
    })
  }

  onOrderByChanged(event: OrderByChangedEvent) {
    const queryParams: Params = {
      page: '1',
      orderBy: event.orderBy,
      orderByDesc: event.orderByDesc || null
    }

    this.router.navigate([`/${this.definition.path || this.definition.slug}`], {
      queryParams,
      queryParamsHandling: 'merge'
    })
  }

  // Return value from queryParams considering that everything is a string in a URL.
  formatValueFromQueryParams(value: string): string | boolean | number {
    if (value === 'true') {
      return true
    } else if (value === 'false') {
      return false
    } else if (new RegExp('^[0-9]+$').test(value)) {
      return parseInt(value, 10)
    } else {
      return value
    }
  }

  destroySubscriptions() {
    if (this.definition.keyNumbers && this.definition.keyNumbers.length) {
      this.definition.keyNumbers.forEach((keyNumber: KeyNumber) => {
        if (keyNumber.subscription) {
          keyNumber.subscription.unsubscribe()
        }
      })
    }
  }

  classify(text: string): string {
    const string = text.replace(
      /^([A-Z])|[\s-_]+(\w)/g,
      function (_match, p1, p2) {
        if (p2) return p2.toUpperCase()
        return p1.toLowerCase()
      }
    )
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  private isObjectEmpty(obj): boolean {
    return (
      obj &&
      Object.keys(obj).length === 0 &&
      Object.getPrototypeOf(obj) === Object.prototype
    )
  }
}
