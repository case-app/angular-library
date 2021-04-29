import { InputType } from '../enums/input-type.enum'
import { SelectOption } from './select-option.interface'
import { ValidatorFn } from '@angular/forms'

export interface Field {
  // Optional unique identifier if needed to add a FieldSpecialRule on it.
  id?: string

  label: string
  placeholder?: string
  helpText?: string
  hidden?: boolean
  className?: string

  inputType: InputType

  validators: ValidatorFn[]
  editValidators?: ValidatorFn[]

  properties?: { [key: string]: string }

  // Sometimes we are sending the field data as a property but we fetch it as a different prop,usually for relations
  // Ex: we send as user.positionId but we get it as user.position.id. The key is the item property
  // and the value is the real path to that value.
  retrievedItemProperties?: { [key: string]: string }

  initialValue?: { [key: string]: any }
  forcedValue?: { [key: string]: any }

  selectOptions?: SelectOption[] | (() => Promise<SelectOption[]>)

  // Input-specific
  searchResources?: string[]
  searchParams?: { [key: string]: string }
  maxSelectedItems?: number
  min?: number
  max?: number
  copyDateFromOnDateTo?: boolean

  // Function to trigger on change value.
  onChange?: (newValue: { [key: string]: any }) => void
}
