import { Params } from '@angular/router'
import { ActionType } from '../enums/action-type.enum'

export interface Action {
  type: ActionType

  // TODO: Rename linkAction and patchAction as is not understandable.
  link?: {
    path: string
    queryParams?: Params
  }

  patchAction?: (resource: any) => {
    resourceName: string
    id?: number | string
    suffix?: string
    formData?: FormData
    successMessage: string
    errorMessage: string
  }
}
