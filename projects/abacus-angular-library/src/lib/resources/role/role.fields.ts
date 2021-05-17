import { Validators } from '@angular/forms'
import { InputType } from '../../enums/input-type.enum'
import { Field } from '../../interfaces/field.interface'

export const roleFields: Field[] = [
  {
    label: 'Identifiant',
    properties: {
      value: 'name'
    },
    inputType: InputType.Text,
    required: true
  },
  {
    label: 'Nom',
    properties: {
      value: 'displayName'
    },
    inputType: InputType.Text,
    required: true
  },
  {
    hidden: true,
    label: 'Permissions',
    properties: {
      value: 'permissionIds'
    },
    selectOptions: [],
    inputType: InputType.MultiSelect,
    className: 'is-2'
  }
]
