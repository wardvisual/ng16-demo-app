import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent, AuthComponent } from '@ng16-demoapp/views';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@ng16-demoapp/views').then((m) => m.HomeComponent),
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('@ng16-demoapp/views').then((m) => m.AuthComponent),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
