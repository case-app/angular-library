# Abacus Angular Library

Angular library version of the Abacus application for the client. Made by [Buddyweb](https://buddyweb.fr)

## Installation

NPM

```bash
npm i abacus-angular-library
```

Import module in `app.module.ts` :

```typescript
import { AbacusModule } from 'abacus-angular-library'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    AbacusModule.forRoot({
      baseUrl: environment.baseUrl,
      apiBaseUrl: environment.apiBaseUrl,
      storagePath: environment.storagePath,
      appName: environment.appName,
      tokenName: environment.tokenName,
      tokenAllowedDomains: environment.tokenAllowedDomains,
      production: environment.production,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
```

Add abacus routes in `app-routing.module.ts`

```typescript
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
]

routes.push(...(abcRoutes as Route[]))
```

Import Abacus styles in your main styles.scss file :

```scss
@import 'abacus-angular-library/styles/main';
```
