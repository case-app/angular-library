import { Component, Input } from '@angular/core'

@Component({
  selector: 'abc-image-yield',
  templateUrl: './image-yield.component.html',
  styleUrls: ['./image-yield.component.scss']
})
export class ImageYieldComponent {
  @Input() imageObjects: {
    image: string
    label?: string
    secondLabel?: string
    link?: string
  }[]
  @Input() defaultImage = '/assets/images/avatar.svg'
  @Input() label: string

  maxLength = 4
}
