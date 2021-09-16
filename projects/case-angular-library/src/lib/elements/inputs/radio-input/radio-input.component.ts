import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output
} from '@angular/core'
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms'

import { AbcInput } from '../../../interfaces/abc-input.interface'
import { SelectOption } from '../../../interfaces/select-option.interface'

@Component({
  selector: 'abc-radio-input',
  templateUrl: './radio-input.component.html',
  styleUrls: ['./radio-input.component.scss']
})
export class RadioInputComponent implements OnChanges, AbcInput {
  @Input() label: string
  @Input() placeholder: string
  @Input() helpText: string
  @Input() initialValue: { value: string | number }
  @Input() selectOptions: SelectOption[]
  @Input() showErrors = false
  @Input() validators: ValidatorFn[] = []
  @Input() uniqueId: string

  @Output() valueChanged: EventEmitter<{
    value: string | number
  }> = new EventEmitter()

  form: FormGroup
  required: boolean

  constructor(private formBuilder: FormBuilder) {}

  ngOnChanges(): void {
    this.form = this.formBuilder.group({
      radio: [null, this.validators || []]
    })

    if (this.initialValue) {
      setTimeout(() => {
        this.form.get('radio').setValue(this.initialValue.value)
      })
    }

    this.required = this.validators.includes(Validators.required)
  }

  select(item: SelectOption) {
    if (item.disabled) {
      return
    }
    this.selectOptions.forEach((i) => {
      i.selected = false
    })

    item.selected = !item.selected
    this.valueChanged.emit({ value: item.value })
  }
}
