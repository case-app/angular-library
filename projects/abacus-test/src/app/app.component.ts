import { Component, HostListener } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { User } from '../../../abacus-angular-library/src/lib/interfaces/resources/user.interface'
import {
  abcConstants,
  AuthService,
  EventService,
  MetaService,
  VersionService,
  ViewportService
} from '../../../abacus-angular-library/src/public-api'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  isLogin: boolean = true
  isTouchResolution: boolean
  isCollapsed = false
  path: string

  private currentUser: User
  private eventSubscriptions = new Subscription()
  private subscription = new Subscription()

  constructor(
    private metaService: MetaService,
    private router: Router,
    private eventService: EventService,
    private viewportService: ViewportService,
    private authService: AuthService,
    private versionService: VersionService
  ) {
    this.metaService.setTags({
      path: '/test',
      title: 'Test META title'
    })

    this.eventSubscriptions.add(
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.eventService.routeChanged.next({ url: event.url })
        }
      })
    )
  }

  // Test pipes.
  amount = 30.005
  htmlString = '<strong>should not be bold</strong>'

  ngOnInit() {
    this.authService.currentUser.subscribe((userRes: User) => {
      this.currentUser = userRes
    })

    this.viewportService.isTouchResolution.subscribe((newValue) => {
      this.isTouchResolution = newValue
    })

    this.setIsTouchResolution()

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

    this.versionService.checkForNewVersions()
  }

  @HostListener('window:resize')
  onResize() {
    this.setIsTouchResolution()
  }

  setIsTouchResolution(): void {
    this.viewportService.isTouchResolution.next(
      window.innerWidth < abcConstants.TOUCH_BREAKPOINT
    )
  }

  getCurrentUser(): void {
    this.authService.me().subscribe((userRes: User) => {
      this.authService.currentUser.next(userRes)
    })
  }
}
