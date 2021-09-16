import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output
} from '@angular/core'
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms'

import { AbcInput } from '../../../interfaces/abc-input.interface'
import { colors } from './colors'

@Component({
  selector: 'abc-color-picker-input',
  templateUrl: './color-picker-input.component.html',
  styleUrls: ['./color-picker-input.component.scss']
})
export class ColorPickerInputComponent implements AbcInput, OnChanges {
  @Input() label: string
  @Input() helpText: string
  @Input() initialValue: {
    value: string
  }
  @Input() showErrors = false
  @Input() validators: ValidatorFn[] = []
  @Input() uniqueId: string

  @Output() valueChanged: EventEmitter<{ value: string }> = new EventEmitter()
  colors: string[] = colors
  selectedColor: string

  showList = false

  form: FormGroup
  required: boolean

  constructor(
    private formBuilder: FormBuilder,
    private elementRef: ElementRef
  ) {}

  ngOnChanges() {
    this.selectedColor = this.initialValue ? this.initialValue.value : null

    this.form = this.formBuilder.group({
      color: [this.selectedColor, this.validators || []]
    })
    this.required = this.validators.includes(Validators.required)
  }

  select(color: string) {
    this.selectedColor = color
    this.showList = false
    this.valueChanged.emit({ value: color })
  }

  // Click outside closes list
  @HostListener('document:click', ['$event.target'])
  clickOut(eventTarget) {
    if (!this.elementRef.nativeElement.contains(eventTarget)) {
      this.showList = false
    }
  }
}
