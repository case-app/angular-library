import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'

import { HttpErrorResponse } from '@angular/common/http'
import { AuthService } from '../../../services/auth.service'
import { FlashMessageService } from '../../../services/flash-message.service'

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required]
  })

  redirectTo: string

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private flashMessageService: FlashMessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.redirectTo =
      this.activatedRoute.snapshot.queryParams &&
      this.activatedRoute.snapshot.queryParams.redirectTo
  }

  submitForm(loginForm: FormGroup) {
    this.authService
      .login(loginForm.value.email, loginForm.value.password)
      .subscribe(
        () => {
          return this.router.navigate([
            this.redirectTo || '/collaborateurs/myself'
          ])
        },
        (err: HttpErrorResponse) => {
          this.flashMessageService.error(
            err.status === 401
              ? `Erreur : Identifiant et/ou mot de passe invalide : Veuillez vérifier vos identifiants de connexion.`
              : err.error.message
          )
          this.loginForm.reset()
        }
      )
  }

  // Fix error on console with LastPass Chrome extension : https://github.com/KillerCodeMonkey/ngx-quill/issues/351.
  textareaEnterPressed($event: KeyboardEvent) {
    $event.preventDefault()
    $event.stopPropagation()
    this.submitForm(this.loginForm)
  }
}
