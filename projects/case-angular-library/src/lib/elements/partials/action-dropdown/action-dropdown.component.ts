import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output
} from '@angular/core'
import { Action } from '../../../interfaces/action.interface'

import { DropdownLink } from '../../../interfaces/dropdown-link.interface'
import { ResourceDefinition } from '../../../interfaces/resource-definition.interface'
import { ActionService } from '../../../services/action.service'
import { AuthService } from '../../../services/auth.service'

@Component({
  selector: 'case-action-dropdown',
  templateUrl: './action-dropdown.component.html',
  styleUrls: ['./action-dropdown.component.scss']
})
export class ActionDropdownComponent implements OnInit {
  @Input() definition: ResourceDefinition
  @Input() item: any
  @Input() preventDeleteMessage: string

  @Output() itemDeleted: EventEmitter<number> = new EventEmitter()

  links: DropdownLink[]
  isActive: boolean
  permissions: string[]

  constructor(
    private authService: AuthService,
    private actionService: ActionService,
    private elementRef: ElementRef
  ) {}

  async ngOnInit() {
    // this.permissions = await this.authService.getPermissions()

    this.links = this.definition.dropdownLinks.filter(
      (link: DropdownLink) =>
        (!link.permission || this.permissions.includes(link.permission)) &&
        (!link.condition || link.condition(this.item))
    )
  }

  // TODO: place this code in a directive to use that in all circunstances.
  triggerAction(action: () => Action): void {
    this.actionService.triggerAction(action())
    this.isActive = false
  }

  // Track outside clicks to close dropdown.
  @HostListener('document:click', ['$event.target'])
  onClick(target) {
    if (this.isActive) {
      const dropDowns: NodeList =
        this.elementRef.nativeElement.querySelectorAll('.dropdown')
      let clickedOut = true
      dropDowns.forEach((d: Node) => {
        if (d.contains(target)) {
          clickedOut = false
        }
      })
      if (clickedOut) {
        this.isActive = false
      }
    }
  }
}
