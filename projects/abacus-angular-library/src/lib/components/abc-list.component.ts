import { Component, Inject } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { timer } from 'rxjs'
import { switchMap } from 'rxjs/operators'

import { LinkType } from '../enums/link-type.enum'
import { AbacusConfig } from '../interfaces/abacus-config.interface'
import { Filter } from '../interfaces/filter.interface'
import { KeyNumber } from '../interfaces/key-number.interface'
import { OrderByChangedEvent } from '../interfaces/order-by-changed-event.interface'
import { Paginator } from '../interfaces/paginator.interface'
import { ResourceDefinition } from '../interfaces/resource-definition.interface'
import { BreadcrumbService } from '../services/breadcrumb.service'
import { FlashMessageService } from '../services/flash-message.service'
import { ResourceService } from '../services/resource.service'

@Component({
  template: 'NO UI TO BE FOUND HERE!'
})
export class AbcListComponent {
  definition: ResourceDefinition
  paginator: Paginator<any>
  createResourcePermission: string

  filters: Filter[]
  resolvedFilters: Filter[]

  orderBy: string
  orderByDesc = false
  loading = false

  LinkType = LinkType
  onlyNumbersRegex: RegExp = new RegExp('^[0-9]+$')

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private resourceService: ResourceService,
    private flashMessageService: FlashMessageService,
    @Inject('ABACUS_CONFIG_TOKEN') private config: AbacusConfig
  ) {}

  async initListView() {
    this.createResourcePermission = `add${this.classify(this.definition.slug)}`
    this.resolvedFilters = await this.resolveFilters(this.filters)

    this.activatedRoute.queryParams.subscribe(async (queryParams) => {
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
          }

          this.getKeyNumbers(queryParams)
        })
        .catch((err) => {
          this.loading = false
          this.flashMessageService.error(
            `Une erreur a eu lieu : impossible de récupérer la liste des ${this.definition.namePlural}.`
          )
        })

      this.setBreadcrumbs()
    })
  }

  getItems(queryParams: object): Promise<Paginator<any> | any> {
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

  getKeyNumbers(queryParams: Params) {
    if (!this.definition.keyNumbers || !this.definition.keyNumbers.length) {
      return
    }

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
      filter.initialValue = {}

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

  reload() {
    this.router.navigate([`/${this.definition.path || this.definition.slug}`], {
      queryParams: {
        reload: new Date().toISOString()
      },
      queryParamsHandling: 'merge'
    })
  }

  // Return value from queryParams considering that everything is a string in a URL.
  formatValueFromQueryParams(value: string): string | boolean | number {
    if (value === 'true') {
      return true
    } else if (value === 'false') {
      return false
    } else if (this.onlyNumbersRegex.test(value)) {
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
}
