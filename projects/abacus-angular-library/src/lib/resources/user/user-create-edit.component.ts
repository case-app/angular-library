import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'

import { AbcCreateEditComponent } from '../../components/abc-create-edit.component'
import { InputType } from '../../enums/input-type.enum'
import { Field } from '../../interfaces/field.interface'
import { ResourceDefinition } from '../../interfaces/resource-definition.interface'
import { BreadcrumbService } from '../../services/breadcrumb.service'
import { FlashMessageService } from '../../services/flash-message.service'
import { ResourceService } from '../../services/resource.service'

import { abcCreateEditTemplate } from '../../templates/abc-create-edit.template'
import { userDefinition } from './user.definition'
import { UserFieldsGenerator } from './user.fields'

@Component({
  template: abcCreateEditTemplate
})
export class UserCreateEditComponent
  extends AbcCreateEditComponent
  implements OnInit, OnDestroy {
  definition: ResourceDefinition = userDefinition
  isEditMyself: boolean

  // EditMyself only : Changing user's own email makes token obsolete.
  emailChanged = false

  fields: Field[]

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
    private fieldsGenerator: UserFieldsGenerator
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
    this.fields = this.fieldsGenerator.userFields

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
