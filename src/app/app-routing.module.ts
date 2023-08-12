import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignInComponent, SignUpComponent } from '@ng16-demoapp/views/auth';
import { HomeComponent } from '@ng16-demoapp/views';
import {
  AuthLayoutComponent,
  MainLayoutComponent,
} from '@ng16-demoapp/layouts';

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
        children: [
          {
            path: '',
            component: HomeComponent,
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
