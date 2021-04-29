import { Inject, Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Router } from '@angular/router'
import { Observable } from 'rxjs'
import { AbacusConfig } from '../interfaces/abacus-config.interface'

import { FlashMessageService } from '../services/flash-message.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(
    private router: Router,
    private flashMessageService: FlashMessageService,
    @Inject('ABACUS_CONFIG_TOKEN') private config: AbacusConfig
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem(this.config.tokenName)) {
      return true
    }

    this.router.navigate(['/login'], {
      queryParams:
        next.url && next.url.length ? { redirectTo: next.url[0].path } : {}
    })

    this.flashMessageService.info(
      `Veuillez vous connecter pour accéder à l'application.`
    )
    return false
  }
}
