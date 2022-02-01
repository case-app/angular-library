import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { ActionType } from '../enums/action-type.enum'
import { Action } from '../interfaces/action.interface'

@Injectable({
  providedIn: 'root'
})
export class ActionService {
  constructor(private router: Router) {}

  triggerAction(action: Action) {
    console.log('TRIGGER ACTION ::')

    switch (action.type) {
      case ActionType.Link:
        this.triggerLink(action)
        break
      case ActionType.Patch:
        this.triggerPatch(action)
        break
      case ActionType.Delete:
        this.triggerDelete(action)
        break
      case ActionType.OpenCreateEditModal:
        this.triggerOpenCreateEditModal(action)
        break
    }
  }

  private triggerLink(action: Action): void {
    console.log('LINK ACTION ::')
    this.router.navigate([action.link.path], {
      queryParams: action.link.queryParams || {}
    })
  }

  private triggerPatch(action: Action): void {
    // TODO
  }

  private triggerDelete(action: Action): void {
    // TODO
  }

  private triggerOpenCreateEditModal(action: Action): void {
    // TODO: Modal is in footer.
  }

  // triggerCustomAction(
  //   actionButton: ActionButton | DropdownLink,
  //   item: any
  // ): void {
  //   const linkAction = actionButton.linkAction && actionButton.linkAction(item)
  //   const patchAction =
  //     actionButton.patchAction && actionButton.patchAction(item)

  //   if (linkAction) {
  //     this.router.navigate([linkAction.path], {
  //       queryParams: linkAction.queryParams || {}
  //     })
  //   } else if (patchAction) {
  //     this.resourceService
  //       .patch(patchAction.resourceName, patchAction.id, patchAction.suffix)
  //       .subscribe(
  //         (res) => {
  //           this.flashMessageService.success(patchAction.successMessage)
  //           this.reloadPrompted.emit()
  //         },
  //         (err) => {
  //           this.flashMessageService.error(patchAction.errorMessage)
  //         }
  //       )
  //   }
  // }
}
