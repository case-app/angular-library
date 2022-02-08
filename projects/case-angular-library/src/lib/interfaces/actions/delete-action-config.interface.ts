import { ResourceDefinition } from '../resource-definition.interface'

export interface DeleteActionConfig {
  itemToDelete: any
  definition: ResourceDefinition
  navigateTo?: string
}
