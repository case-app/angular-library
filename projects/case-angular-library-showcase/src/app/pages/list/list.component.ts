import { Component, OnInit } from '@angular/core'
import { Validators } from '@angular/forms'

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
    data: [{ name: 'Volvo' }, { name: 'Mercedes' }],
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

  constructor() {}

  ngOnInit(): void {}
}
