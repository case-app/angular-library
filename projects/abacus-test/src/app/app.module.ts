import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { AbacusModule } from '../../../abacus-angular-library/src/public-api'
import { environment } from '../environments/environment'
import { CommonModule } from '@angular/common'
import { ExpenseCreateEditComponent } from './resources/expense/expense-create-edit/expense-create-edit.component'
import { ReactiveFormsModule } from '@angular/forms'
import { CustomHomeComponent } from './pages/custom-home/custom-home.component'

@NgModule({
  declarations: [AppComponent, ExpenseCreateEditComponent, CustomHomeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AbacusModule.forRoot({
      baseUrl: environment.baseUrl,
      apiBaseUrl: environment.apiBaseUrl,
      storagePath: environment.storagePath,
      appName: environment.appName,
      tokenName: environment.tokenName,
      tokenAllowedDomains: environment.tokenAllowedDomains,
      production: environment.production
    }),
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
