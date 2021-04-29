import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ValidatorFn } from '@angular/forms'

import { InputType } from '../../../enums/input-type.enum'
import { AbcInput } from '../../../interfaces/abc-input.interface'
import { SelectOption } from '../../../interfaces/select-option.interface'

@Component({
  selector: 'abc-input',
  templateUrl: './abc-input.component.html',
  styleUrls: ['./abc-input.component.scss']
})

// * Default ABC input wrapper that calls the other ones
export class AbcInputComponent implements AbcInput {
  // Common props.
  @Input() type: InputType
  @Input() properties: string[]
  @Input() label: string
  @Input() placeholder: string
  @Input() helpText: string
  @Input() showErrors: boolean
  @Input() validators: ValidatorFn[] = []

  // Input specific props.
  @Input() initialValue: any
  @Input() searchResources: string[]
  @Input() resourceName: string
  @Input() selectOptions: SelectOption[]
  @Input() step: string
  @Input() accept: string
  @Input() min: number
  @Input() max: number
  @Input() maxSelectedItems = 50
  @Input() searchParams: { [key: string]: string }
  @Input() copyDateFromOnDateTo = false

  @Output() valueChanged: EventEmitter<any> = new EventEmitter()

  InputType = InputType

  // Generate a unique id for each input. Necessary to make "label -> input" link (click on label to focus input).
  uniqueId: string = Math.floor(Math.random() * 10000).toString()

  // Transmit information to parent.
  onValueChanged(event: any) {
    this.valueChanged.emit(event)
  }
}
