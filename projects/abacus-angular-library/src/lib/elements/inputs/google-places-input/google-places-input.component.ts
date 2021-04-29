import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output
} from '@angular/core'
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms'
import { Address, AddressComponent } from 'angular-google-place'

import { AbcInput } from '../../../interfaces/abc-input.interface'
import { AddressObject } from '../../../interfaces/address-object.interface'

@Component({
  selector: 'abc-google-places-input',
  templateUrl: './google-places-input.component.html',
  styleUrls: ['./google-places-input.component.scss']
})
export class GooglePlacesInputComponent implements AbcInput, OnChanges {
  @Input() label: string
  @Input() initialValue: { value: string }
  @Input() placeholder = 'Chercher une adresse...'
  @Input() helpText: string
  @Output() valueChanged: EventEmitter<{
    value: string
  }> = new EventEmitter()

  @Input() isAddressSet = false
  @Input() showErrors = false
  @Input() validators: ValidatorFn[] = []
  @Input() uniqueId: string

  form: FormGroup
  required: boolean

  constructor(private formBuilder: FormBuilder) {}

  ngOnChanges() {
    this.form = this.formBuilder.group({
      googlePlacesInput: [this.initialValue.value, this.validators || []]
    })
    this.required = this.validators.includes(Validators.required)

    if (this.initialValue && this.initialValue.value) {
      const parsedInitialAddress: AddressObject = JSON.parse(
        this.initialValue.value
      )
      {
        this.placeholder = parsedInitialAddress.addressName
      }
    }
  }

  // Triggered on choosing Google Places address
  setAddress(address: Address): void {
    const streetNumber = address.address_components.find(
      (a: AddressComponent) => a.types.includes('street_number')
    )
    const route = address.address_components.find((a: AddressComponent) =>
      a.types.includes('route')
    )
    const locality = address.address_components.find((a: AddressComponent) =>
      a.types.includes('locality')
    )
    const postalCode = address.address_components.find((a: AddressComponent) =>
      a.types.includes('postal_code')
    )
    const country = address.address_components.find((a: AddressComponent) =>
      a.types.includes('country')
    )

    const addressObject: AddressObject = {
      addressName: address.name
    }

    if (streetNumber) {
      addressObject.streetNumber = streetNumber.long_name
    }
    if (route) {
      addressObject.route = route.long_name
    }
    if (locality) {
      addressObject.locality = locality.long_name
    }
    if (postalCode) {
      addressObject.postalCode = postalCode.long_name
    }
    if (country) {
      addressObject.country = country.long_name
    }

    this.form.get('googlePlacesInput').setValue(addressObject)
    this.valueChanged.emit({ value: JSON.stringify(addressObject) })
  }

  onKeyup(event: KeyboardEvent): void {
    // Reset the value of the form if we remove something in order to make form invalid if required.
    if (event.key === 'Backspace') {
      this.form.reset()
    }
  }
}
