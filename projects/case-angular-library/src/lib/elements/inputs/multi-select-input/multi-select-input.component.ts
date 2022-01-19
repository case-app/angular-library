import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
  SimpleChange
} from '@angular/core'
import { ValidatorFn, Validators } from '@angular/forms'

import { CaseInput } from '../../../interfaces/case-input.interface'
import { SelectOption } from '../../../interfaces/select-option.interface'

@Component({
  selector: 'case-multi-select-input',
  templateUrl: './multi-select-input.component.html',
  styleUrls: ['./multi-select-input.component.scss']
})
export class MultiSelectInputComponent implements CaseInput, OnChanges {
  @Input() label: string
  @Input() initialValue: { value: string[] } = { value: [] }
  @Input() selectOptions: SelectOption[]
  @Input() placeholder = 'Selectionnez un ou plusieurs éléments'
  @Input() helpText: string
  @Input() itemNameSingular = 'élément'
  @Input() itemNamePlural = 'éléments'
  @Input() showErrors = false
  @Input() validators: ValidatorFn[] = []
  @Input() uniqueId: string

  @Output() valueChanged: EventEmitter<{
    value: any[]
  }> = new EventEmitter()

  selectedOptions: string[] = []
  showList = false
  required: boolean
  isInputSetUp = false

  constructor(private elementRef: ElementRef) {}

  ngOnChanges(changes: { selectOptions?: SimpleChange }) {
    // Reset form value if we change select options.
    if (this.isInputSetUp && changes.selectOptions) {
      this.selectNone()
    }

    this.selectedOptions = (this.initialValue && this.initialValue.value) || []

    if (typeof this.selectedOptions === 'string') {
      this.selectedOptions = [this.selectedOptions]
    }
    if (this.selectOptions && this.selectOptions.length) {
      this.selectOptions.forEach((selectOption: SelectOption) => {
        if (this.selectedOptions.find((sI) => sI === selectOption.value)) {
          selectOption.selected = true
        }
      })
    }
    this.required = this.validators.includes(Validators.required)
    this.isInputSetUp = true
  }

  toggleSelected(option: SelectOption) {
    option.selected = !option.selected

    const index = this.selectedOptions.indexOf(option.value.toString())
    if (index !== -1) {
      this.selectedOptions.splice(index, 1)
    } else {
      this.selectedOptions.push(option.value.toString())
    }

    const newArray = this.selectedOptions

    this.valueChanged.emit({ value: newArray })
  }

  selectAll() {
    this.selectOptions.forEach((i) => (i.selected = true))
    this.selectedOptions = this.selectOptions.map((i) => i.value.toString())
    this.valueChanged.emit({ value: this.selectedOptions })
  }

  selectNone() {
    this.selectOptions.forEach((i) => (i.selected = false))
    this.selectedOptions = []
    this.valueChanged.emit({ value: this.selectedOptions })
  }

  // Click outside closes list
  @HostListener('document:click', ['$event.target'])
  clickOut(eventTarget) {
    if (
      !this.elementRef.nativeElement.contains(eventTarget) &&
      !eventTarget.className.includes('mass-selection-button')
    ) {
      this.showList = false
    }
  }
}
