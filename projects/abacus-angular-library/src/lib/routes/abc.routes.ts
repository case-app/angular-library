import { Route } from '@angular/router'

import { AuthGuard } from '../guards/auth.guard'
import { PermissionGuard } from '../guards/permission.guard'
import { ForgotPasswordComponent } from '../pages/auth/forgot-password/forgot-password.component'
import { LoginComponent } from '../pages/auth/login/login.component'
import { LogoutComponent } from '../pages/auth/logout/logout.component'
import { ResetPasswordComponent } from '../pages/auth/reset-password/reset-password.component'
import { Error404Component } from '../pages/error404/error404.component'
import { HomeComponent } from '../pages/home/home.component'
import { RoleCreateEditComponent } from '../resources/role/role-create-edit/role-create-edit.component'
import { RoleListComponent } from '../resources/role/role-list/role-list.component'
import { UserCreateEditComponent } from '../resources/user/user-create-edit.component'
import { UserListComponent } from '../resources/user/user-list.component'

export const abcRoutes: Route[] = [
  // Auth.
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent
  },

  // Pages.
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },

  // Users.
  {
    path: 'users',
    component: UserListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users/create',
    component: UserCreateEditComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      permission: 'addUsers',
      mode: 'create'
    }
  },
  {
    path: 'users/myself/edit',
    component: UserCreateEditComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      mode: 'edit',
      permission: 'readOwnUsers',
      editMyself: true
    }
  },
  {
    path: 'users/:id/edit',
    component: UserCreateEditComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      mode: 'edit',
      permission: 'editUsers'
    }
  },

  // Roles.
  {
    path: 'roles',
    component: RoleListComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      permission: 'browseRoles'
    }
  },
  {
    path: 'roles/create',
    component: RoleCreateEditComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      permission: 'addRoles',
      mode: 'create'
    }
  },
  {
    path: 'roles/:id/edit',
    component: RoleCreateEditComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      permission: 'editRoles',
      mode: 'edit'
    }
  },

  // 404.
  {
    path: '404',
    component: Error404Component,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '/404'
  }
]
