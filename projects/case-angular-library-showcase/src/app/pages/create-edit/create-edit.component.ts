import { Component } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'

import {
  BreadcrumbService,
  CaseCreateEditComponent,
  caseCreateEditTemplate,
  Field,
  FlashMessageService,
  InputType,
  ResourceDefinition,
  ResourceService
} from '../../../../../case-angular-library/src/public-api'
import { carDefinition } from '../car.definition'

@Component({
  template: caseCreateEditTemplate
})
export class CreateEditComponent extends CaseCreateEditComponent {
  definition: ResourceDefinition = carDefinition

  fields: Field[] = [
    {
      id: 'name',
      label: 'Nom',
      property: 'name',
      className: 'is-3',
      inputType: InputType.Text,
      required: true,
      initialValue: () =>
        Promise.resolve({
          value: 'test ASYNC'
        })
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
      validators: [Validators.email],
      initialValue: {
        value: 'test 1'
      }
    },
    {
      label: 'Mot de passe',
      property: 'password',
      className: 'is-3',
      inputType: InputType.Password,
      createValidators: [Validators.required],
      editValidators: [],
      initialValue: {
        value: 'test 1'
      }
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

  constructor(
    formBuilder: FormBuilder,
    router: Router,
    activatedRoute: ActivatedRoute,
    resourceService: ResourceService,
    breadcrumbService: BreadcrumbService,
    flashMessageService: FlashMessageService,
    private customResourceService: ResourceService
  ) {
    super(
      formBuilder,
      router,
      breadcrumbService,
      resourceService,
      flashMessageService,
      activatedRoute
    )
  }

  ngOnInit() {
    this.initCreateEditView()
  }
}
