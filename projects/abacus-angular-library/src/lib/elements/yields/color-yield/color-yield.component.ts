import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'abc-color-yield',
  templateUrl: './color-yield.component.html',
  styleUrls: ['./color-yield.component.scss']
})
export class ColorYieldComponent {
  @Input() color: string
  @Input() text?: string
}
