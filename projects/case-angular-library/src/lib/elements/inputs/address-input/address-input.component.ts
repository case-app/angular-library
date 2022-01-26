import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output
} from '@angular/core'
import { ValidatorFn, Validators } from '@angular/forms'
import { Feature } from 'geojson'

import { CaseInput } from '../../../interfaces/case-input.interface'
import { Address } from './adress.interface'

@Component({
  selector: 'case-address-input',
  templateUrl: './address-input.component.html',
  styleUrls: ['./address-input.component.scss']
})
export class AddressInputComponent implements OnChanges, CaseInput {
  @Input() label: string
  @Input() initialValue: any
  @Input() showErrors: boolean
  @Input() validators: ValidatorFn[]
  @Input() placeholder?: string
  @Input() selectOptions?: any[]
  @Input() uniqueId: string
  @Input() helpText: string

  @Output() valueChanged: EventEmitter<string> = new EventEmitter()

  addressName: string
  address: Address
  required: boolean

  ngOnChanges(): void {
    this.required = this.validators.includes(Validators.required)

    this.addressName =
      this.initialValue &&
      this.initialValue.value &&
      this.initialValue.value.addressName
  }

  onPlaceSelected(selectedPlace: Feature): void {
    this.address = this.convertGEOJSONFeatureToAddress(selectedPlace)

    this.valueChanged.emit(JSON.stringify(this.address))
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
