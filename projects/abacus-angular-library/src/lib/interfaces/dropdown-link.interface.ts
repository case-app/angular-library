import { LinkType } from '../enums/link-type.enum'
import { Params } from '@angular/router'

export interface DropdownLink {
  type: LinkType
  permission: string
  label?: string
  condition?: (resource: any) => boolean
  linkAction?: (
    resource: any
  ) => {
    path: string
    queryParams: Params
  }
  patchAction?: (
    resource: any
  ) => {
    resourceName: string
    id?: number | string
    suffix?: string
    formData?: FormData
    successMessage: string
    errorMessage: string
  }
}
