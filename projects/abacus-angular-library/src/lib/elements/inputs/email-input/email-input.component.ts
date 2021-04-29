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
  selector: 'abc-email-input',
  templateUrl: './email-input.component.html',
  styleUrls: ['./email-input.component.scss']
})
export class EmailInputComponent implements AbcInput, OnChanges {
  @Input() label: string
  @Input() placeholder: string
  @Input() helpText: string
  @Input() initialValue: { value: string }
  @Input() showErrors = false
  @Input() validators: ValidatorFn[] = []
  @Input() uniqueId: string

  @Output() valueChanged: EventEmitter<{ value: string }> = new EventEmitter()

  emailForm: FormGroup
  required: boolean

  constructor(private formBuilder: FormBuilder) {}

  ngOnChanges() {
    this.emailForm = this.formBuilder.group({
      email: [
        this.initialValue ? this.initialValue.value : null,
        this.validators
      ]
    })
    this.required = this.validators.includes(Validators.required)
  }

  onKeyup(newValue: string) {
    this.valueChanged.emit({ value: newValue })
  }
}
