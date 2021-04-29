import { Params } from '@angular/router'

export interface ActionButton {
  label: string
  icon?: string
  className: string
  permission: string
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
  condition(resource: any): boolean
}
