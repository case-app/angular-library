import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  Renderer2,
  HostListener
} from '@angular/core'
import { Router } from '@angular/router'

import { FlashMessageService } from '../../../services/flash-message.service'
import { ResourceService } from '../../../services/resource.service'

@Component({
  selector: 'case-confirm-delete-modal',
  templateUrl: './confirm-delete-modal.component.html',
  styleUrls: ['./confirm-delete-modal.component.scss']
})
export class ConfirmDeleteModalComponent implements OnChanges {
  @Input() resourceToDelete: any
  @Input() resourceName: string
  @Input() navigateTo: string
  @Input() emitConfirmation = false

  @Output() deleteCanceled: EventEmitter<void> = new EventEmitter()
  @Output() deleteConfirmed: EventEmitter<void> = new EventEmitter()

  showModal: boolean

  constructor(
    private resourceService: ResourceService,
    private flashMessageService: FlashMessageService,
    private renderer: Renderer2,
    private router: Router
  ) {}

  ngOnChanges() {
    this.showModal = true
    this.renderer.addClass(document.querySelector('html'), 'is-clipped')
  }

  confirmDelete() {
    // If we choose to emit confirmation, we emit confirmation make any HTTP request.
    if (this.emitConfirmation) {
      this.close()
      this.deleteConfirmed.emit()
    } else {
      this.resourceService
        .delete(this.resourceName, this.resourceToDelete.id)
        .subscribe(
          (res) => {
            this.close()
            // Change query params to force reload on lists.
            this.router.navigate(
              [
                this.navigateTo
                  ? this.navigateTo
                  : this.router.url.includes('?')
                  ? this.router.url.substring(0, this.router.url.indexOf('?'))
                  : this.router.url
              ],
              {
                queryParams: {
                  reload: new Date().toISOString()
                },
                queryParamsHandling: 'merge'
              }
            )
            this.flashMessageService.success(
              `La ressource a bien été supprimée`
            )
          },
          (err) => {
            this.close()
            this.flashMessageService.error(
              `Une erreur à lieu et l'élément n'a pas pu être effacé. Veuillez contacter votre administrateur si le problème persiste.`
            )
          }
        )
    }
  }

  close() {
    this.showModal = false
    this.renderer.removeClass(document.querySelector('html'), 'is-clipped')
  }

  cancel() {
    this.deleteCanceled.emit()
    this.close()
  }

  // Click outside closes modal
  @HostListener('document:click', ['$event.target'])
  clickOut(eventTarget) {
    if (eventTarget.className.includes('modal-background')) {
      this.deleteCanceled.emit()
    }
  }

  @HostListener('document:keydown.escape') onEnterKeydown() {
    this.close()
  }
}
