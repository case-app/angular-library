import { InputType } from '../enums/input-type.enum'
import { SelectOption } from './select-option.interface'

export interface Filter {
  label: string

  // Property or properties changed by the filer.
  // Example: single property "lateInvoicesOnly" or multiple property {dateFrom: "startDateFrom", dateTo: "startDateTo"}
  property?: string
  properties?: { [key: string]: string }

  placeholder?: string
  initialValue?: { [key: string]: string }
  inputType: InputType
  className?: string
  async?: boolean

  // Input-specific props
  searchResources?: string[]
  selectOptions?: SelectOption[] | (() => Promise<SelectOption[]>)
}
