import { InputType } from '../enums/input-type.enum'
import { SelectOption } from './select-option.interface'

export interface Filter {
  label?: string
  placeholder?: string
  properties?: { [key: string]: string }
  initialValue?: { [key: string]: string }
  inputType: InputType
  className?: string
  async?: boolean
  selectOptions?: SelectOption[] | (() => Promise<SelectOption[]>)

  // Input-specific props
  searchResources?: string[]
}
