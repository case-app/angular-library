import { Component, OnInit } from '@angular/core'
import { Validators } from '@angular/forms'
import { ActionType } from '../../../../../case-angular-library/src/lib/enums/action-type.enum'
import { Action } from '../../../../../case-angular-library/src/lib/interfaces/actions/action.interface'
import {
  Filter,
  InputType,
  Paginator,
  ResourceDefinition,
  Yield,
  YieldType
} from '../../../../../case-angular-library/src/public-api'
import { carDefinition } from '../car.definition'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  requiredValidator = [Validators.required]

  InputType = InputType

  paginator: Paginator<any> = {
    data: [
      { id: 10, name: 'Volvo', country: 'Sweden', isActive: true },
      { id: 11, name: 'Mercedes', country: false, isActive: false },
      { id: 20, name: 'Volvo', country: 'Sweden', isActive: true },
      { id: 21, name: 'Mercedes', country: false, isActive: false },
      { id: 30, name: 'Volvo', country: 'Sweden', isActive: true },
      { id: 31, name: 'Mercedes', country: false, isActive: false },
      { id: 30, name: 'Volvo', country: 'Sweden', isActive: true },
      { id: 31, name: 'Mercedes', country: false, isActive: false },
      { id: 40, name: 'Volvo', country: 'Sweden', isActive: true },
      { id: 41, name: 'Mercedes', country: false, isActive: false }
    ],
    currentPage: 1,
    lastPage: 1,
    from: 0,
    to: 2,
    total: 2,
    perPage: 2
  }
  yields: Yield[] = [
    {
      label: 'Name',
      property: 'name',
      secondProperty: 'country',
      type: YieldType.Text
    },
    {
      label: 'Price',
      property: 'id',
      headingClassName: 'has-text-info',
      type: YieldType.Currency
    },
    {
      label: 'On production',
      property: 'isActive',
      secondProperty: 'country',
      action: (car) => ({
        type: ActionType.Delete,
        delete: {
          itemToDelete: car,
          definition: carDefinition,
          navigateTo: '/'
        }
      }),
      type: YieldType.Switch
    }
  ]
  resolvedFilters: Filter[] = [
    {
      label: 'Projets à facturer',
      inputType: InputType.Checkbox,
      property: 'toBillOnly',
      initialValue: {
        value: 'true'
      }
    }
  ]

  definition: ResourceDefinition = carDefinition
  loading = false

  createTicketAction: Action = {
    type: ActionType.OpenCreateEditModal,
    openCreateEditModal: {
      title: 'Create a ticket',
      helpText:
        'Creating a new ticket is easy ! Just fill up that form and we will contact you soon.',
      keyPoints: [
        {
          label: 'Weight',
          value: '300kg'
        },
        {
          label: 'Location',
          value: 'Lisbon, Portugal'
        },
        {
          label: 'Estimated value',
          value: '900 M€'
        }
      ],
      definition: carDefinition,
      mode: 'create',
      fields: [
        {
          label: 'ticket name',
          property: 'name',
          className: 'is-12',
          inputType: InputType.Text,
          required: true
        },
        {
          label: 'Is this a technical ticket ?',
          property: 'isActive',
          initialValue: { value: false },
          className: 'is-12',
          inputType: InputType.Checkbox
        },
        {
          label: 'Couleur',
          property: 'color',
          className: 'is-12',
          inputType: InputType.ColorPicker,
          required: true
        }
      ]
    }
  }

  constructor() {}

  ngOnInit(): void {}

  dateChanged(event) {
    console.log(event)
  }
}
