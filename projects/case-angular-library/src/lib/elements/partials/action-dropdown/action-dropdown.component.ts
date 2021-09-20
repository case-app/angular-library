import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output
} from '@angular/core'
import { Router } from '@angular/router'

import { LinkType } from '../../../enums/link-type.enum'
import { DropdownLink } from '../../../interfaces/dropdown-link.interface'
import { ResourceDefinition } from '../../../interfaces/resource-definition.interface'
import { AuthService } from '../../../services/auth.service'
import { FlashMessageService } from '../../../services/flash-message.service'
import { ResourceService } from '../../../services/resource.service'

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
  @Output() customActionEvent: EventEmitter<{
    link: DropdownLink
    item: any
  }> = new EventEmitter()

  links: {
    label: string
    title: string
    action: () => void
    className?: string
  }[] = []
  isActive: boolean
  permissions: string[]

  constructor(
    private authService: AuthService,
    private resourceService: ResourceService,
    private flashMessageService: FlashMessageService,
    private router: Router,
    private elementRef: ElementRef
  ) {}

  async ngOnInit() {
    this.permissions = await this.authService.getPermissions()

    this.definition.dropdownLinks.forEach((dropdownLink: DropdownLink) => {
      if (
        this.permissions.includes(dropdownLink.permission) &&
        (!dropdownLink.condition || dropdownLink.condition(this.item))
      ) {
        this.links.push(this.getLinkElement(dropdownLink))
      }
    })
  }

  getLinkElement(dropdownLink: DropdownLink): {
    label: string
    title: string
    action: () => void
    className?: string
  } {
    if (dropdownLink.type === LinkType.EDIT) {
      return {
        label: 'Modifier',
        title: `Modifier l'élément`,
        action: () =>
          this.router.navigate([
            `/${this.definition.path || this.definition.slug}/${
              this.item.id
            }/edit`
          ])
      }
    } else if (dropdownLink.type === LinkType.DETAIL) {
      return {
        label: 'Voir',
        title: `Afficher l'élément`,
        action: () =>
          this.router.navigate([
            `/${this.definition.path || this.definition.slug}/${this.item.id}`
          ])
      }
    } else if (dropdownLink.type === LinkType.DUPLICATE) {
      return {
        label: 'Dupliquer',
        title: `Créer une copie de l'élément.`,
        action: () =>
          this.resourceService
            .duplicate(this.definition.slug, this.item.id)
            .subscribe(
              (createdItem: { id: number }) => {
                this.flashMessageService.success(
                  `L'élément a été dupliqué avec succès. Veuillez éditer les champs pour le personnaliser.`
                )
                this.router.navigate([
                  `/${this.definition.path || this.definition.slug}/${
                    createdItem.id
                  }/edit`
                ])
              },
              (err) =>
                this.flashMessageService.error(
                  `Une erreur est survenue. Impossible de dupliquer l'élément.`
                )
            )
      }
    } else if (dropdownLink.type === LinkType.DELETE) {
      if (this.preventDeleteMessage) {
        return {
          label: 'Supprimer',
          title:
            `Impossible de supprimer l'élément : ` + this.preventDeleteMessage,
          className: 'is-disabled',
          action: () => null
        }
      } else {
        return {
          label: 'Supprimer',
          title: `Supprimer l'élément`,
          action: () => this.itemDeleted.emit(this.item.id)
        }
      }
    } else if (dropdownLink.type === LinkType.CUSTOM) {
      return {
        label: dropdownLink.label,
        title: dropdownLink.label,
        action: () =>
          this.customActionEvent.emit({ link: dropdownLink, item: this.item })
      }
    }
  }

  // Track outside clicks to close dropdown.
  @HostListener('document:click', ['$event.target'])
  onClick(target) {
    if (this.isActive) {
      const dropdowns: NodeList =
        this.elementRef.nativeElement.querySelectorAll('.dropdown')
      let clickedOut = true
      dropdowns.forEach((d: Node) => {
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
