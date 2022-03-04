import { Component, OnInit } from '@angular/core'

import { TopMenuLink } from '../../../case-angular-library/src/lib/interfaces/top-menu-link.interface'
import {
  FlashMessageService,
  MenuItem
} from '../../../case-angular-library/src/public-api'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLogin = false
  isTouchResolution = false
  isCollapsed = false
  path: string
  menuItems: MenuItem[] = []
  topMenuLinks: TopMenuLink[] = [
    {
      label: 'Go to create-edit',
      icon: 'icon-grid',
      routePath: '/create-edit'
    },
    {
      label: 'Go to create-edit',
      icon: 'icon-user',
      routePath: '/create-edit'
    },
    {
      label: 'Go to create-edit',
      icon: 'icon-activity',
      routePath: '/create-edit'
    },
    {
      label: 'Go to create-edit',
      icon: 'icon-trash',
      routePath: '/create-edit'
    }
  ]

  constructor(private flashMessageService: FlashMessageService) {}

  ngOnInit() {
    this.flashMessageService.info('Welcome to CASE Angular Library SHOWCASE')
  }
}
