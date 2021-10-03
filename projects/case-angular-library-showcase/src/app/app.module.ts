import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { CaseModule } from '../../../case-angular-library/src/public-api'
import { environment } from '../environments/environment'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component';
import { ListComponent } from './pages/list/list.component';
import { CreateEditComponent } from './pages/create-edit/create-edit.component'

@NgModule({
  declarations: [AppComponent, ListComponent, CreateEditComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CaseModule.forRoot({
      baseUrl: environment.baseUrl,
      apiBaseUrl: environment.apiBaseUrl,
      storagePath: environment.storagePath,
      appName: environment.appName,
      tokenName: environment.tokenName,
      tokenAllowedDomains: environment.tokenAllowedDomains,
      production: environment.production
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
