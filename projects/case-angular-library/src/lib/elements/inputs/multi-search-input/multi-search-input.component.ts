import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core'
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms'
import * as fastLevenshtein from 'fast-levenshtein'

import { CaseInput } from '../../../interfaces/case-input.interface'
import { HTMLInputEvent } from '../../../interfaces/html-input-event.interface'
import { SearchResult } from '../../../interfaces/search-result.interface'
import { ResourceService } from '../../../services/resource.service'

@Component({
  selector: 'case-multi-search-input',
  templateUrl: './multi-search-input.component.html',
  styleUrls: ['./multi-search-input.component.scss'],
  providers: [ResourceService]
})
export class MultiSearchInputComponent implements CaseInput, OnChanges {
  @Input() label: string
  @Input() initialValue: {
    [key: string]: string[]
  }
  @Input() placeholder: string
  @Input() helpText: string

  @Input() resources: string[]
  @Input() params: { [key: string]: string }
  @Input() maxSelectedItems
  @Input() readonly = false
  @Input() showErrors = false
  @Input() validators: ValidatorFn[] = []
  @Input() uniqueId: string

  @Output() valueChanged: EventEmitter<{
    [key: string]: number[]
  }> = new EventEmitter()

  @ViewChild('searchInput', { static: false }) searchInputEl: ElementRef

  suggestedSearchResults: SearchResult[] = []
  selectedSearchResults: SearchResult[] = []

  terms = ''
  showList = false
  focusedItemIndex: number
  form: FormGroup
  required: boolean

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private resourceService: ResourceService,
    private formBuilder: FormBuilder
  ) {}

  ngOnChanges() {
    this.getSearchResultObjects()
    this.form = this.formBuilder.group({
      multiSearch: [this.initialValue, this.validators || []]
    })
    this.required = this.validators.includes(Validators.required)
  }

  // Fetch full objects from API to display them. Based on initialValue (ids ony).
  getSearchResultObjects(): void {
    // If we have an initialValue.
    if (
      this.initialValue &&
      Object.values(this.initialValue).some((v) => !!v)
    ) {
      this.resourceService
        .list('search/get-search-result-objects', this.initialValue)
        .subscribe((initialSearchResultRes) => {
          this.selectedSearchResults = initialSearchResultRes
        })
    }
  }

  toggleItem(item: any): void {
    if (!this.readonly) {
      // Check if there already is an item with same id on selection
      if (this.selectedSearchResults.find((i: any) => i.id === item.id)) {
        this.selectedSearchResults.splice(
          this.selectedSearchResults.indexOf(item),
          1
        )
        this.renderer.setProperty(this.searchInputEl.nativeElement, 'value', '')
      } else if (
        !this.maxSelectedItems ||
        this.selectedSearchResults.length < this.maxSelectedItems
      ) {
        this.selectedSearchResults.push(item)
        this.renderer.setProperty(this.searchInputEl.nativeElement, 'value', '')
      }
      this.showList = false

      this.form.get('multiSearch').setValue(this.selectedSearchResults)
      this.valueChanged.emit(this.formatToEmit(this.selectedSearchResults))
    }
  }

  onSearchInputKeyup(event: HTMLInputEvent) {
    if (!this.readonly) {
      this.terms = event.target.value
      this.showList = true

      // Navigate through results
      if (['ArrowDown', 'ArrowUp', 'Enter'].includes(event.key)) {
        return this.navigateSuggestedValues(event.key)
      }

      this.resourceService
        .list('search', {
          resources: this.resources,
          terms: this.terms,
          ...this.params
        })
        .subscribe((searchResultsRes: SearchResult[]) => {
          // Sort by Levenshtein distance and limit array.
          this.suggestedSearchResults = searchResultsRes
            .sort(
              (a: SearchResult, b: SearchResult) =>
                fastLevenshtein.get(this.terms, a.label) -
                fastLevenshtein.get(this.terms, b.label)
            )
            .slice(0, 20)

          delete this.focusedItemIndex
        })
    }
  }

  // Transform an array of search results into an object of properties that have as value an array of ids.
  formatToEmit(selectedResults: SearchResult[]): { [key: string]: any } {
    const emittedValueObject: {
      [key: string]: any
    } = this.resources.reduce((acc, resourceName: string) => {
      acc[resourceName] = []
      return acc
    }, {})

    selectedResults.forEach((searchResult: SearchResult) => {
      emittedValueObject[searchResult.resourceName].push(
        searchResult.resourceName === 'localities'
          ? searchResult.label
          : searchResult.id
      )
    })

    // If one item only, we return value directly instead of array.
    if (this.maxSelectedItems === 1) {
      const resourceName = Object.keys(emittedValueObject)[0]
      const response = {}
      response[resourceName.slice(0, -1) + 'Id'] =
        emittedValueObject[resourceName][0]

      return response
    }

    // Format "array-of-ids" name based on resource name. Ex: cars => carIds.
    return Object.keys(emittedValueObject).reduce((acc, resourceName) => {
      acc[resourceName.toLowerCase() + 'Ids'] = emittedValueObject[resourceName]
      return acc
    }, {})
  }

  // Use arrowKeys and enter to select suggested themes with keyboard
  navigateSuggestedValues(key: string): void {
    if (key === 'ArrowDown') {
      if (typeof this.focusedItemIndex === 'undefined') {
        this.showList = true
        this.focusedItemIndex = 0
      } else if (
        this.focusedItemIndex <
        this.suggestedSearchResults.length - 1
      ) {
        this.focusedItemIndex++
      }
    } else if (key === 'ArrowUp') {
      if (!this.focusedItemIndex) {
        this.showList = false
        delete this.focusedItemIndex
      } else {
        this.focusedItemIndex--
      }
    } else if (
      key === 'Enter' &&
      typeof this.focusedItemIndex !== 'undefined' &&
      this.suggestedSearchResults[this.focusedItemIndex]
    ) {
      this.toggleItem(this.suggestedSearchResults[this.focusedItemIndex])
      delete this.focusedItemIndex
    }
  }

  // Click outside closes list
  @HostListener('document:click', ['$event.target'])
  clickOut(eventTarget) {
    if (!this.elementRef.nativeElement.contains(eventTarget)) {
      this.showList = false
    }
  }
}
