import { Component } from '@angular/core'
import { Validators } from '@angular/forms'
import {
  Field,
  InputType
} from '../../../../../case-angular-library/src/public-api'

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.scss']
})
export class CreateEditComponent {
  fields: Field[] = [
    {
      id: 'name',
      label: 'Nom',
      property: 'name',
      className: 'is-3',
      inputType: InputType.Text,
      required: true
    },
    {
      id: 'roleId',
      label: `Rôle`,
      placeholder: `Choisir le rôle du collaborateur...`,
      property: 'roleId',
      retrievedItemProperties: {
        roleId: 'role.id'
      },
      inputType: InputType.Select,
      selectOptions: [
        {
          label: 'Test',
          value: 'test'
        },
        {
          label: 'Test 2',
          value: 'test 2'
        }
      ],
      className: 'is-3',
      required: true
    },
    {
      id: 'email',
      label: 'Email',
      property: 'email',
      className: 'is-3',
      inputType: InputType.Email,
      required: true,
      validators: [Validators.email]
    },
    {
      label: 'Mot de passe',
      property: 'password',
      className: 'is-3',
      inputType: InputType.Password,
      createValidators: [Validators.required],
      editValidators: []
    },
    {
      label: 'Avatar',
      placeholder: 'Choisir un fichier image',
      property: 'image',
      className: 'is-3',
      inputType: InputType.Image
    },
    {
      label: 'Actif',
      helpText: `Seul les utilisateurs actifs peuvent se connecter à l'application`,
      property: 'isActive',
      initialValue: { value: false },
      className: 'is-3',
      inputType: InputType.Checkbox
    },
    {
      label: 'Couleur',
      property: 'color',
      className: 'is-6',
      inputType: InputType.ColorPicker,
      required: true
    }
  ]
  loading = false
}