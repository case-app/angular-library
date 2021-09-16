import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'case-date-yield',
  template: ` {{ date | date: 'd/MM/yy' }} `,
  styleUrls: ['./date-yield.component.scss']
})
export class DateYieldComponent {
  @Input() date: Date
}
