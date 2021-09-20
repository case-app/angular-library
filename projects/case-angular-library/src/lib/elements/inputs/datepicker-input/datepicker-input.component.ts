import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output
} from '@angular/core'
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms'
import { IMyDateModel } from 'angular-mydatepicker'

import { CaseDatepickerComponent } from '../../../components/case-datepicker.component'
import { CaseInput } from '../../../interfaces/case-input.interface'

@Component({
  selector: 'case-datepicker-input',
  templateUrl: './datepicker-input.component.html',
  styleUrls: ['./datepicker-input.component.scss']
})
export class DatepickerInputComponent
  extends CaseDatepickerComponent
  implements CaseInput, OnChanges
{
  @Input() label: string
  @Input() helpText: string
  // Accepts YYYY-MM-DD formatted date
  @Input() initialValue: { value: string }
  @Input() placeholder: string
  @Input() showErrors = false
  @Input() validators: ValidatorFn[] = []
  @Input() uniqueId: string

  @Output() valueChanged: EventEmitter<{ value: string }> = new EventEmitter()

  form: FormGroup
  required: boolean

  constructor(private formBuilder: FormBuilder) {
    super()
  }

  ngOnChanges() {
    this.form = this.formBuilder.group({
      date: [
        this.initialValue && this.initialValue.value
          ? this.formatStandardDate(this.initialValue.value)
          : null,
        this.validators || []
      ]
    })
    this.required = this.validators.includes(Validators.required)
  }

  // Emits YYYY-MM-DD date or or null if date was removed.
  onDateChanged(event: IMyDateModel) {
    this.valueChanged.emit(
      event.singleDate.jsDate
        ? { value: this.formatMyDatePickerDate(event) }
        : { value: null }
    )
  }
}