import { Component, Input } from '@angular/core'

@Component({
  selector: 'abc-number-yield',
  template: `{{ value | number }}`
})
export class NumberYieldComponent {
  @Input() value: number
}
