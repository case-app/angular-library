import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'

import { AbcCreateEditComponent } from '../../components/abc-create-edit.component'
import { InputType } from '../../enums/input-type.enum'
import { Field } from '../../interfaces/field.interface'
import { ResourceDefinition } from '../../interfaces/resource-definition.interface'
import { Role } from '../../interfaces/resources/role.interface'
import { BreadcrumbService } from '../../services/breadcrumb.service'
import { FlashMessageService } from '../../services/flash-message.service'
import { ResourceService } from '../../services/resource.service'
import { abcCreateEditTemplate } from '../../templates/abc-create-edit.template'
import { userDefinition } from './user.definition'

@Component({
  template: abcCreateEditTemplate
})
export class UserCreateEditComponent
  extends AbcCreateEditComponent
  implements OnInit, OnDestroy
{
  definition: ResourceDefinition = userDefinition
  isEditMyself: boolean

  // EditMyself only : Changing user's own email makes token obsolete.
  emailChanged = false

  fields: Field[] = [
    {
      id: 'name',
      label: 'Nom',
      properties: {
        value: 'name'
      },
      className: 'is-6',
      inputType: InputType.Text,
      required: true
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
        this.customResourceService
          .list('roles', { withoutPagination: true })
          .toPromise()
          .then((roleRes: Role[]) =>
            roleRes.map((r) => ({
              label: r.displayName,
              value: r.id.toString()
            }))
          ),
      className: 'is-6',
      required: true
    },
    {
      id: 'email',
      label: 'Email',
      properties: {
        value: 'email'
      },
      className: 'is-6',
      inputType: InputType.Email,
      required: true,
      validators: [Validators.email]
    },
    {
      label: 'Mot de passe',
      properties: {
        value: 'password'
      },
      className: 'is-6',
      inputType: InputType.Password,
      createValidators: [Validators.required],
      editValidators: []
    },
    {
      label: 'Avatar',
      placeholder: 'Choisir un fichier image',
      properties: { value: 'image' },
      className: 'is-6',
      inputType: InputType.Image
    },
    {
      label: 'Actif',
      helpText: `Seul les utilisateurs actifs peuvent se connecter à l'application`,
      properties: { value: 'isActive' },
      initialValue: { value: false },
      className: 'is-6 has-checkbox-centered',
      inputType: InputType.Checkbox
    },
    {
      label: 'Couleur',
      properties: { value: 'color' },
      className: 'is-6',
      inputType: InputType.ColorPicker,
      required: true
    }
  ]

  constructor(
    formBuilder: FormBuilder,
    router: Router,
    breadcrumbService: BreadcrumbService,
    resourceService: ResourceService,
    flashMessageService: FlashMessageService,
    activatedRoute: ActivatedRoute,
    private customBreadcrumbService: BreadcrumbService,
    private customFlashMessageService: FlashMessageService,
    private customRouter: Router,
    private customActivatedRoute: ActivatedRoute,
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
    this.isEditMyself = activatedRoute.snapshot.data.editMyself
  }

  ngOnInit() {
    if (this.isEditMyself) {
      this.initUserEditMyselfView()
    } else {
      this.initCreateEditView()
    }
  }

  // Special version of this form when user edits hisself or herself.
  async initUserEditMyselfView() {
    this.mode = this.customActivatedRoute.snapshot.data.mode
    this.fieldSpecialRules = [
      {
        fieldId: 'roleId',
        hidden: true
      },
      {
        fieldId: 'positionId',
        hidden: true
      }
    ]

    this.resolvedFields = await this.resolveFields(this.fields)

    await this.getItem('myself')
    this.item.id = 'myself'

    this.form = this.generateForm(this.fields)

    this.form.valueChanges.subscribe((newValue: { email: string }) => {
      if (newValue.email !== this.item.email) {
        this.emailChanged = true
      }
    })

    this.customBreadcrumbService.breadcrumbLinks.next([
      {
        path: `/${this.definition.path || this.definition.slug}`,
        label: this.definition.title
      },
      {
        label: `Modifier mon profil`
      }
    ])
  }

  ngOnDestroy() {
    if (this.isEditMyself && this.emailChanged) {
      this.customRouter.navigate(['/logout'])
      this.customFlashMessageService.info(
        `Vous avez changé votre adresse email. Veuillez vous re-connecter avec votre nouvelle adresse.`
      )
    }
  }
}
