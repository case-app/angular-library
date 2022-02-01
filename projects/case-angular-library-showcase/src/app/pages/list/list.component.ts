import { Component, OnInit } from '@angular/core'
import { Validators } from '@angular/forms'
import { ActionType } from '../../../../../case-angular-library/src/lib/enums/action-type.enum'
import { Action } from '../../../../../case-angular-library/src/lib/interfaces/action.interface'
import {
  Filter,
  InputType,
  Paginator,
  ResourceDefinition,
  Yield
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
      { id: 1, name: 'Volvo' },
      { id: 2, name: 'Mercedes' }
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
      property: 'name'
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
      definition: carDefinition,
      mode: 'create',
      fields: [
        {
          label: 'ticket name',
          property: 'name',
          className: 'is-3',
          inputType: InputType.Text,
          required: true
        },
        {
          label: 'Is this a technical ticket ?',
          property: 'isActive',
          initialValue: { value: false },
          className: 'is-3',
          inputType: InputType.Checkbox
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
