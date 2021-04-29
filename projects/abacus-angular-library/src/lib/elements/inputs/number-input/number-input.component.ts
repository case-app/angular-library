import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output
} from '@angular/core'
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms'

import { AbcInput } from '../../../interfaces/abc-input.interface'

@Component({
  selector: 'abc-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.scss']
})
export class NumberInputComponent implements OnChanges, AbcInput {
  @Input() label: string
  @Input() initialValue: { value: number }
  @Input() placeholder: string
  @Input() helpText: string
  @Input() showErrors = false
  @Input() validators: ValidatorFn[] = []
  @Input() uniqueId: string

  // Custom number input params.
  @Input() step: string
  @Input() min: number
  @Input() max: number

  @Output() valueChanged: EventEmitter<{ value: number }> = new EventEmitter()

  numberForm: FormGroup
  required: boolean

  constructor(private formBuilder: FormBuilder) {}

  ngOnChanges() {
    this.numberForm = this.formBuilder.group({
      number: [
        this.initialValue ? this.initialValue.value : null,
        this.validators
      ]
    })
    this.required = this.validators.includes(Validators.required)
  }

  onChange(newValue: string) {
    this.valueChanged.emit({ value: parseFloat(newValue) })
  }
}
