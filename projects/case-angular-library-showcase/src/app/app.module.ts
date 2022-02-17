import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'

import { CaseModule } from '../../../case-angular-library/src/public-api'
import { environment } from '../environments/environment'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { CreateEditComponent } from './pages/create-edit/create-edit.component'
import { ListComponent } from './pages/list/list.component'

@NgModule({
  declarations: [AppComponent, ListComponent, CreateEditComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CaseModule.forRoot({
      baseUrl: environment.baseUrl,
      apiBaseUrl: environment.apiBaseUrl,
      storagePath: environment.storagePath,
      appName: environment.appName,
      tokenName: environment.tokenName,
      tokenAllowedDomains: environment.tokenAllowedDomains,
      googlePlacesAPIKey: environment.googlePlacesAPIKey,
      production: environment.production
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
