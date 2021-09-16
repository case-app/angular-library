import { Component, Input } from '@angular/core'

@Component({
  selector: 'abc-currency-yield',
  template: `{{ amount | euros }}`,
  styleUrls: ['./currency-yield.component.scss'],
})
export class CurrencyYieldComponent {
  @Input() amount: number
}
