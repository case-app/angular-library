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
  selector: 'abc-tel-input',
  templateUrl: './tel-input.component.html',
  styleUrls: ['./tel-input.component.scss']
})
export class TelInputComponent implements OnChanges, AbcInput {
  @Input() label: string
  @Input() initialValue: { value: string }
  @Input() placeholder: string
  @Input() helpText: string
  @Input() showErrors = false
  @Input() validators: ValidatorFn[] = []
  @Input() uniqueId: string

  @Output() valueChanged: EventEmitter<{ value: string }> = new EventEmitter()

  telForm: FormGroup
  required: boolean

  constructor(private formBuilder: FormBuilder) {}

  ngOnChanges() {
    this.telForm = this.formBuilder.group({
      text: [
        this.initialValue ? this.initialValue.value : null,
        this.validators
      ]
    })
    this.required = this.validators.includes(Validators.required)
  }

  onChange(newValue: string) {
    this.valueChanged.emit({ value: newValue })
  }
}
