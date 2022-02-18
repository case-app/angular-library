import { Component, Input } from '@angular/core'

import { Action } from '../../../interfaces/actions/action.interface'
import { ActionService } from '../../../services/action.service'

@Component({
  selector: 'case-switch-yield',
  templateUrl: './switch-yield.component.html',
  styleUrls: ['./switch-yield.component.scss']
})
export class SwitchYieldComponent {
  @Input() value: any
  @Input() displayValue: string
  @Input() action: Action

  constructor(private actionService: ActionService) {}

  // Generate a unique id to make "label -> input" link.
  uniqueId: string = Math.floor(Math.random() * 10000).toString()

  // Execute CASE Action.
  async doAction(event: Event) {
    event.preventDefault()
    this.actionService
      .triggerAction(this.action)
      .then((res) => {
        this.value = !this.value
      })
      .catch((err) => {})
  }
}
