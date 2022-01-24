import { Component, EventEmitter, Input, OnInit } from '@angular/core'
import { ValidatorFn } from '@angular/forms'
import { GeoapifyGeocoderAutocompleteModule } from '@geoapify/angular-geocoder-autocomplete'
import { CaseInput } from '../../../interfaces/case-input.interface'

@Component({
  selector: 'case-address-input',
  templateUrl: './address-input.component.html',
  styleUrls: ['./address-input.component.css']
})
export class AddressInputComponent implements OnInit, CaseInput {
  constructor() {}
  @Input() label: string
  @Input() initialValue: any
  @Input() valueChanged: EventEmitter<any>
  @Input() showErrors: boolean
  @Input() validators: ValidatorFn[]
  @Input() placeholder?: string
  @Input() selectOptions?: any[]
  @Input() uniqueId: string

  ngOnInit(): void {}
}
