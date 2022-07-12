import { Component, OnInit } from '@angular/core'
import { Router, Scroll } from '@angular/router'
import { Subscription } from 'rxjs'

import { TopMenuLink } from '../../../case-angular-library/src/lib/interfaces/top-menu-link.interface'
import {
  AuthService,
  EventService,
  FlashMessageService,
  MenuItem,
  User
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
      routePath: '/create-edit',
      queryParams: { selectedTab: 'test1' },
      permission: 'addRoles'
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
      icon: 'icon-pie-chart',
      routePath: '/create-edit'
    }
  ]

  private currentUser: any
  private subscription = new Subscription()

  constructor(
    private flashMessageService: FlashMessageService,
    private eventService: EventService,
    private authService: AuthService,
    private router: Router
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof Scroll && event.anchor) {
        setTimeout(() => {
          const element = document.getElementById(event.anchor)
          if (element) {
            element.scrollIntoView()
          }
        }, 100)
      }
    })
  }

  ngOnInit() {
    this.authService.currentUser.subscribe((userRes: User) => {
      this.currentUser = userRes
    })

    this.subscription.add(
      this.eventService.routeChanged.subscribe((routeChanged) => {
        // Scroll top
        window.scrollTo(0, 0)

        this.path = routeChanged.url.includes('?')
          ? routeChanged.url.substring(0, routeChanged.url.indexOf('?'))
          : routeChanged.url
        this.isLogin =
          this.path.includes('/login') ||
          this.path.includes('forgot-password') ||
          this.path.includes('reset-password')

        if (
          !this.isLogin &&
          this.authService.isLoggedIn() &&
          !this.currentUser
        ) {
          this.getCurrentUser()
        }
      })
    )
    this.flashMessageService.info('Welcome to CASE Angular Library SHOWCASE')
  }

  getCurrentUser(): void {
    this.authService.me().subscribe((userRes: any) => {
      this.authService.currentUser.next(userRes)
    })
  }
}
