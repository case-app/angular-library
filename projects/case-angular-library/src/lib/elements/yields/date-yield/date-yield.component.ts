import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'abc-date-yield',
  template: `
    {{ date | date: 'd/MM/yy' }}
  `,
  styleUrls: ['./date-yield.component.scss']
})
export class DateYieldComponent {
  @Input() date: Date
}
