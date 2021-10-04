import { Component, HostListener, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import {
  caseConstants,
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

  constructor(private flashMessageService: FlashMessageService) {}

  ngOnInit() {
    this.flashMessageService.info('Welcome to CASE Angular Library SHOWCASE')
  }
}
