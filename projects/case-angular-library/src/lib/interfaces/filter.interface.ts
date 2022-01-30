import { InputType } from '../enums/input-type.enum'
import { ResourceDefinition } from './resource-definition.interface'
import { SelectOption } from './select-option.interface'

export interface Filter {
  label: string

  // Property or properties changed by the filer.
  // Example: single property "lateInvoicesOnly" or multiple property {dateFrom: "startDateFrom", dateTo: "startDateTo"}
  property?: string
  properties?: { [key: string]: string }

  placeholder?: string
  secondPlaceholder?: string
  initialValue?: { [key: string]: string }
  inputType: InputType
  className?: string
  async?: boolean

  // Input-specific props
  searchResources?: ResourceDefinition[]
  selectOptions?: SelectOption[] | (() => Promise<SelectOption[]>)
}
