export interface SelectOption {
  label: string
  subLabel?: string
  // Type is a mandatory "string" because values with return inevitably as strings when coming back from HTML "value" attr.
  value: string
  selected?: boolean
  disabled?: boolean
}
