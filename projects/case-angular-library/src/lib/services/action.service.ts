import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { ReplaySubject } from 'rxjs'

import { ActionType } from '../enums/action-type.enum'
import { Action } from '../interfaces/actions/action.interface'
import { DeleteActionConfig } from '../interfaces/actions/delete-action-config.interface'
import { OpenCreateEditModalActionConfig } from '../interfaces/actions/open-create-edit-modal-action-config.interface'
import { FlashMessageService } from './flash-message.service'
import { ResourceService } from './resource.service'

@Injectable({
  providedIn: 'root'
})
export class ActionService {
  public deleteAction = new ReplaySubject<DeleteActionConfig>()
  public openCreateEditModalAction =
    new ReplaySubject<OpenCreateEditModalActionConfig>()

  constructor(
    private router: Router,
    private resourceService: ResourceService,
    private flashMessageService: FlashMessageService
  ) {}

  triggerAction(action: Action) {
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
    this.router.navigate([action.link.path], {
      queryParams: action.link.queryParams || {}
    })
  }

  private triggerPatch(action: Action): void {
    this.resourceService
      .patch(action.patch.resourceName, action.patch.id, action.patch.suffix)
      .subscribe(
        (res) => {
          this.flashMessageService.success(action.patch.successMessage)
          this.reload()
        },
        (err) => {
          this.flashMessageService.error(action.patch.errorMessage)
        }
      )
  }

  private triggerDelete(action: Action): void {
    this.deleteAction.next(action.delete)
  }

  private triggerOpenCreateEditModal(action: Action): void {
    this.openCreateEditModalAction.next(action.openCreateEditModal)
  }

  private reload() {
    this.router.navigate([this.router.url], {
      queryParams: {
        reload: new Date().toISOString()
      },
      queryParamsHandling: 'merge'
    })
  }
}
