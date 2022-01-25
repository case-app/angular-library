import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { ValidatorFn, Validators } from '@angular/forms'
import { Feature } from 'geojson'

import { CaseInput } from '../../../interfaces/case-input.interface'
import { Address } from './adress.interface'

// ! TODO: FIXME: We should be able to select an address.
@Component({
  selector: 'case-address-input',
  templateUrl: './address-input.component.html',
  styleUrls: ['./address-input.component.scss']
})
export class AddressInputComponent implements OnInit, CaseInput {
  @Input() label: string
  @Input() initialValue: any
  @Input() showErrors: boolean
  @Input() validators: ValidatorFn[]
  @Input() placeholder?: string
  @Input() selectOptions?: any[]
  @Input() uniqueId: string
  @Input() helpText: string

  @Output() valueChanged: EventEmitter<string> = new EventEmitter()

  required: boolean

  constructor() {}
  ngOnInit(): void {
    console.log(this.validators)

    this.required = this.validators.includes(Validators.required)

    // TODO: display initial value (edit mode).
  }

  onPlaceSelected(selectedPlace: Feature): void {
    const address: Address = this.convertGEOJSONFeatureToAddress(selectedPlace)

    console.log(selectedPlace, address)

    this.valueChanged.emit(JSON.stringify(address))
  }

  private convertGEOJSONFeatureToAddress(feature: Feature): Address {
    return {
      addressName: feature.properties.formatted,
      route: feature.properties.street || feature.properties.address_line1,
      locality: feature.properties.city,
      postalCode: feature.properties.postcode,
      country: feature.properties.country
    }
  }
}
