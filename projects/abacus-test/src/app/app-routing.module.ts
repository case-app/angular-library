import { NgModule } from '@angular/core'
import { Route, RouterModule } from '@angular/router'
import { abcRoutes } from '../../../abacus-angular-library/src/lib/routes/abc.routes'
import { AuthGuard } from '../../../abacus-angular-library/src/lib/guards/auth.guard'
import { ExpenseCreateEditComponent } from './resources/expense/expense-create-edit/expense-create-edit.component'
import { CustomHomeComponent } from './pages/custom-home/custom-home.component'

const routes: Route[] = [
  {
    path: '',
    component: CustomHomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'expenses/create',
    component: ExpenseCreateEditComponent,
    canActivate: [AuthGuard]
  }
]

routes.push(...(abcRoutes as Route[]))

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
