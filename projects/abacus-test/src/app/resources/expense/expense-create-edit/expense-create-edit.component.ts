import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'

import { InputType } from '../../../../../../abacus-angular-library/src/lib/enums/input-type.enum'
import { Field } from '../../../../../../abacus-angular-library/src/lib/interfaces/field.interface'
import { ResourceDefinition } from '../../../../../../abacus-angular-library/src/lib/interfaces/resource-definition.interface'
import {
  AbcCreateEditComponent,
  abcCreateEditTemplate,
  BreadcrumbService,
  FlashMessageService,
  ResourceService
} from '../../../../../../abacus-angular-library/src/public-api'
import { expenseDefinition } from '../expense.definition'

@Component({
  template: abcCreateEditTemplate
})
export class ExpenseCreateEditComponent
  extends AbcCreateEditComponent
  implements OnInit
{
  definition: ResourceDefinition = expenseDefinition

  fields: Field[] = [
    {
      id: 'projectId',
      label: 'Mission',
      placeholder: `Choisissez une mission...`,
      properties: {
        projectId: 'projectId'
      },
      retrievedItemProperties: {
        projectId: 'project.id'
      },
      searchResources: ['projects'],
      maxSelectedItems: 1,
      inputType: InputType.MultiSearch,
      validators: [Validators.required],
      className: 'is-12'
    },
    {
      label: 'Libellé',
      properties: {
        value: 'name'
      },
      inputType: InputType.Text,
      validators: [Validators.required],
      className: ' is-12-mobile is-6-tablet'
    },
    {
      label: 'Référence',
      properties: {
        value: 'reference'
      },
      inputType: InputType.Text,
      validators: [],
      className: ' is-12-mobile is-6-tablet is-3-widescreen'
    },
    {
      label: 'Montant HT',
      placeholder: 'Montant HT',
      properties: {
        value: 'amount'
      },
      inputType: InputType.Number,
      validators: [Validators.required],
      className: ' is-12-mobile is-6-tablet is-3-widescreen'
    },
    {
      label: 'Reçu',
      placeholder: 'Choisir le reçu',
      properties: { value: 'attachment' },
      className: ' is-12-mobile is-6-tablet is-3-widescreen',
      inputType: InputType.File,
      validators: []
    },
    {
      label: 'Refacturable au client',
      placeholder: 'Refacturable au client',
      properties: { value: 'billableToCustomer' },
      initialValue: { value: false },
      className: ' is-12-mobile is-6-tablet is-3-widescreen',
      inputType: InputType.Checkbox,
      validators: []
    },
    {
      label: `Date d'achat`,
      placeholder: `Date d'achat..`,
      properties: {
        value: 'date'
      },
      inputType: InputType.Datepicker,
      validators: [],
      className: 'is-12-mobile is-6-tablet is-3-widescreen'
    },
    {
      label: `Date de paiement`,
      placeholder: `Date de paiement`,
      properties: {
        value: 'paymentDate'
      },
      inputType: InputType.Datepicker,
      validators: [],
      className: 'is-12-mobile is-6-tablet is-3-widescreen'
    },
    {
      label: 'Commentaires',
      placeholder: 'Commentaires...',
      properties: {
        value: 'comments'
      },
      inputType: InputType.Text,
      validators: [],
      className: 'is-12'
    }
  ]

  constructor(
    formBuilder: FormBuilder,
    router: Router,
    breadcrumbService: BreadcrumbService,
    resourceService: ResourceService,
    flashMessageService: FlashMessageService,
    activatedRoute: ActivatedRoute
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
