import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges
} from '@angular/core'
import { AbcInput } from '../../../interfaces/abc-input.interface'
import { ValidatorFn, FormGroup, FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'abc-toggle-input',
  templateUrl: './toggle-input.component.html',
  styleUrls: ['./toggle-input.component.scss']
})
export class ToggleInputComponent implements AbcInput, OnChanges {
  @Input() set initialValue(val: boolean) {
    this.checked = val
  }
  @Input() label: string
  @Input() placeholder: string
  @Input() helpText: string
  @Input() showErrors = false
  @Input() validators: ValidatorFn[] = []
  @Input() uniqueId: string

  @Output() valueChanged: EventEmitter<{ value: boolean }> = new EventEmitter()

  form: FormGroup
  checked: boolean
  required: boolean

  constructor(private formBuilder: FormBuilder) {}

  ngOnChanges() {
    this.form = this.formBuilder.group({
      toggle: [this.initialValue, this.validators || []]
    })
    this.required = this.validators.includes(Validators.required)
  }

  onChange() {
    this.checked = !this.checked
    this.valueChanged.emit({ value: this.checked })
  }
}
