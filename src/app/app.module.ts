import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HomeComponent, AuthComponent } from '@ng16-demoapp/views';
import { ButtonComponent, InputComponent } from '@ng16-demoapp/components';
import { ReactiveFormsModule } from '@angular/forms';
import { SignInComponent } from './views/auth/components/sign-in/sign-in.component';
import { SignUpComponent } from './views/auth/components/sign-up/sign-up.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthComponent,
    SignInComponent,
    SignUpComponent,
    AuthLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    /* Components */
    InputComponent,
    ReactiveFormsModule,
    ButtonComponent,
  ],
  providers: [],
  exports: [RouterModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
