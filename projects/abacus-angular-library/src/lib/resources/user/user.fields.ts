import { Validators } from '@angular/forms'
import { InputType } from '../../enums/input-type.enum'
import { Field } from '../../interfaces/field.interface'
import { ResourceService } from '../../services/resource.service'

// A generator class is needed because some field properties rely on other services.
export class UserFieldsGenerator {
  public userFields: Field[]

  constructor(private resourceService: ResourceService) {
    this.userFields = [
      {
        id: 'name',
        label: 'Nom',
        properties: {
          value: 'name'
        },
        className: 'p-x-0-mobile is-6',
        inputType: InputType.Text,
        validators: [Validators.required]
      },
      {
        id: 'roleId',
        label: `Rôle`,
        placeholder: `Choisir le rôle du collaborateur...`,
        properties: { value: 'roleId' },
        retrievedItemProperties: {
          roleId: 'role.id'
        },
        inputType: InputType.Select,
        selectOptions: () =>
          this.resourceService
            .list('roles', { withoutPagination: true })
            .toPromise()
            // TODO : type roleRes as Role[]
            .then((roleRes: any[]) =>
              roleRes.map((r) => ({
                label: r.displayName,
                value: r.id.toString()
              }))
            ),
        className: 'p-x-0-mobile is-6',
        validators: [Validators.required]
      },
      {
        id: 'email',
        label: 'Email',
        properties: {
          value: 'email'
        },
        className: 'p-x-0-mobile is-6',
        inputType: InputType.Email,
        validators: [Validators.required, Validators.email]
      },
      {
        id: 'positionId',
        label: `Profil`,
        placeholder: `Choisir le profil du collaborateur...`,
        properties: { value: 'positionId' },
        retrievedItemProperties: {
          positionId: 'position.id'
        },
        inputType: InputType.Select,
        selectOptions: () =>
          this.resourceService
            .list('positions', { withoutPagination: true })
            .toPromise()
            // TODO : type positionRes as Position[]
            .then((positionRes: any[]) =>
              positionRes.map((p) => ({
                label: p.name,
                value: p.id.toString()
              }))
            ),
        className: 'p-x-0-mobile is-6',
        validators: [Validators.required]
      },
      {
        label: 'Mot de passe',
        properties: {
          value: 'password'
        },
        className: 'p-x-0-mobile is-6',
        inputType: InputType.Password,
        validators: [Validators.required],
        editValidators: []
      },
      {
        label: 'Avatar',
        placeholder: 'Choisir un fichier image',
        properties: { value: 'image' },
        className: 'p-x-0-mobile is-6',
        inputType: InputType.Image,
        validators: []
      },
      {
        label: 'Actif',
        helpText: `Seul les utilisateurs actifs peuvent se connecter à l'application`,
        properties: { value: 'isActive' },
        initialValue: { value: false },
        className: 'p-x-0-mobile is-6 aligned-checkbox',
        inputType: InputType.Checkbox,
        validators: []
      },
      {
        label: 'Couleur',
        properties: { value: 'color' },
        className: 'p-x-0-mobile is-6',
        inputType: InputType.ColorPicker,
        validators: [Validators.required]
      }
    ]
  }
}
