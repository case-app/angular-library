import { Component, Input } from '@angular/core'
import * as moment from 'moment'
import { MenuItem } from '../../../interfaces/menu-item.interface'

@Component({
  selector: 'abc-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent {
  @Input() menuItems: MenuItem[]
  @Input() path: string
  @Input() isCollapsed = false

  activeAccordion: string

  defaultMonitoringParams = {
    dateFrom: moment()
      .subtract(3, 'month')
      .startOf('month')
      .format('YYYY-MM-DD'),
    dateTo: moment().format('YYYY-MM-DD')
  }

  defaultDaysOffParams = {
    year: moment().format('YYYY')
  }

  toggleAccordion(accordion: string): void {
    if (this.activeAccordion === accordion) {
      this.activeAccordion = null
    } else {
      this.activeAccordion = accordion
    }
  }

  hideCollapsedAccordion() {
    if (this.isCollapsed) {
      delete this.activeAccordion
    }
  }

  showCollapsedAccordion(accordion: string): void {
    if (this.isCollapsed) {
      this.activeAccordion = accordion
    }
  }

  openSelectedAccordion() {
    // Open correct dropdown based on current path.
    if (this.path.includes('/clients') || this.path.includes('/referents')) {
      this.toggleAccordion('customer')
    } else if (this.path.includes('/factures')) {
      this.toggleAccordion('invoice')
    } else if (
      this.path.includes('/collaborateurs') ||
      this.path.includes('/time-sheets')
    ) {
      this.toggleAccordion('user')
    } else {
      this.toggleAccordion('setting')
    }
  }
}
