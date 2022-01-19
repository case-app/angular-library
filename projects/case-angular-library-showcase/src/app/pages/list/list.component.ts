import { Component, OnInit } from '@angular/core'
import { Validators } from '@angular/forms'
import { Filter } from '../../../../../../dist/case-angular-library/public-api'
import {
  Gender,
  InputType,
  LinkType,
  Paginator,
  ResourceDefinition,
  Yield
} from '../../../../../case-angular-library/src/public-api'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  requiredValidator = [Validators.required]

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

  definition: ResourceDefinition = {
    title: 'Cars',
    nameSingular: 'car',
    namePlural: 'cars',
    gender: Gender.Feminine,
    slug: 'cars',
    buttons: [],
    defaultLink: LinkType.CREATE,
    mainIdentifier: 'id',
    dropdownLinks: []
  }
  loading = false

  constructor() {}

  ngOnInit(): void {}
}
