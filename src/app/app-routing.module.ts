import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '@ng16-demoapp/views';

import { SignInComponent } from './views/auth/components/sign-in/sign-in.component';
import { SignUpComponent } from './views/auth/components/sign-up/sign-up.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: HomeComponent,
      },
      {
        path: 'home',
        redirectTo: '',
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
