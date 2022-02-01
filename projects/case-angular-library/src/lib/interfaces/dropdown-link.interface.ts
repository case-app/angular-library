import { Action } from './action.interface'

export interface DropdownLink {
  label: string
  action: (resource: any) => Action
  permission?: string
  condition?: (resource: any) => boolean
  className?: string
  withDivision?: boolean
}
