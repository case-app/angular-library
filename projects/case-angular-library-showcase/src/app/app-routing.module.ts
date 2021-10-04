import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CreateEditComponent } from './pages/create-edit/create-edit.component'
import { ListComponent } from './pages/list/list.component'

const routes: Routes = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: 'create-edit',
    component: CreateEditComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
