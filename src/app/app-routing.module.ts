import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignInComponent, SignUpComponent } from '@ng16-demoapp/views/auth';
import { NotesComponent } from '@ng16-demoapp/views';
import {
  AuthLayoutComponent,
  MainLayoutComponent,
} from '@ng16-demoapp/layouts';
import { authGuard } from '@ng16-demoapp/guards';

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
