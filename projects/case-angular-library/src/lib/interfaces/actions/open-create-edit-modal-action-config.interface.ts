import { Field } from '../field.interface'
import { ResourceDefinition } from '../resource-definition.interface'

export interface OpenCreateEditModalActionConfig {
  title: string
  fields: Field[]
  definition: ResourceDefinition
  mode: string
  item?: any
  redirectTo?: string
  helpText?: string
  keyPoints?: { label: string; value: string }[]
}
