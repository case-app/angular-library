import { Directive, HostListener, Input } from '@angular/core'
import { Action } from '../interfaces/action.interface'
import { ActionService } from '../services/action.service'

@Directive({
  selector: '[caseAction]'
})
export class ActionDirective {
  @Input() caseAction: Action

  constructor(private actionService: ActionService) {}

  @HostListener('click', ['$event'])
  click() {
    this.actionService.triggerAction(this.caseAction)
  }
}
