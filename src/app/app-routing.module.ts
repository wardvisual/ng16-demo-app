import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  NotesComponent,
  SignInComponent,
  SignUpComponent,
} from 'astronautaking/views';
import {
  AuthLayoutComponent,
  MainLayoutComponent,
} from 'astronautaking/layouts';
import { authGuard } from 'astronautaking/guards';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'home',
        redirectTo: '',
      },
      {
        path: '',
        pathMatch: 'full',
        component: MainLayoutComponent,
        canActivate: [authGuard],
        children: [
          {
            path: '',
            component: NotesComponent,
          },
        ],
      },
      {
        path: '',
        component: AuthLayoutComponent,
        children: [
          {
            path: 'signin',
            component: SignInComponent,
          },
          {
            path: 'signup',
            component: SignUpComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
