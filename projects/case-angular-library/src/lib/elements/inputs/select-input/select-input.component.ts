import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange
} from '@angular/core'
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms'

import { CaseInput } from '../../../interfaces/case-input.interface'
import { SelectOption } from '../../../interfaces/select-option.interface'

@Component({
  selector: 'case-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss']
})
export class SelectInputComponent implements CaseInput, OnInit, OnChanges {
  @Input() label: string
  @Input() placeholder: string
  @Input() helpText: string
  @Input() initialValue: { value: string | number }
  @Input() selectOptions: SelectOption[]
  @Input() showErrors = false
  @Input() validators: ValidatorFn[] = []
  @Input() uniqueId: string

  @Output() valueChanged: EventEmitter<{
    value: string
  }> = new EventEmitter()

  form: FormGroup
  required: boolean

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      select: [null, this.validators || []]
    })

    if (this.initialValue) {
      setTimeout(() => {
        this.form.get('select').setValue(this.initialValue.value)
      })
    }

    this.required = this.validators.includes(Validators.required)
  }

  // Reset form value if we change select options.
  ngOnChanges(changes: { selectOptions?: SimpleChange }) {
    if (this.form && changes.selectOptions) {
      this.form.get('select').setValue('')
      this.valueChanged.emit({ value: null })
    }
  }

  onSelect(newValue: string) {
    this.valueChanged.emit({ value: newValue })
  }
}
