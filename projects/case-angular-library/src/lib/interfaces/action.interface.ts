import { Params } from '@angular/router'
import { ActionType } from '../enums/action-type.enum'
import { Field } from './field.interface'
import { ResourceDefinition } from './resource-definition.interface'

export interface Action {
  type: ActionType

  link?: {
    path: string
    queryParams?: Params
  }

  patch?: {
    resourceName: string
    successMessage: string
    errorMessage: string
    id?: number | string
    suffix?: string
    formData?: FormData
  }

  delete?: {
    itemToDelete: any
    definition: ResourceDefinition
    navigateTo?: string
  }

  openCreateEditModal?: {
    title: string
    fields: Field[]
    definition: ResourceDefinition
    mode: string
    item?: any
    redirectTo?: string
  }
}
