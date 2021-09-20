import { Component, Input, OnInit } from '@angular/core'
import { AddressObject } from '../../../interfaces/address-object.interface'

@Component({
  selector: 'case-address-yield',
  templateUrl: './address-yield.component.html',
  styleUrls: ['./address-yield.component.scss']
})
export class AddressYieldComponent implements OnInit {
  @Input() address: string
  @Input() openOnGoogleMapsLink = true

  parsedAddress: AddressObject

  ngOnInit() {
    this.parsedAddress = JSON.parse(this.address)
  }
}
