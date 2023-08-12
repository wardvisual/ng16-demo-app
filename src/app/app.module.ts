import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HomeComponent, AuthComponent } from '@ng16-demoapp/views';
import { SignInComponent, SignUpComponent } from '@ng16-demoapp/views/auth';
import { ButtonComponent, InputComponent } from '@ng16-demoapp/components';
import {
  AuthLayoutComponent,
  MainLayoutComponent,
} from '@ng16-demoapp/layouts';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthComponent,
    SignInComponent,
    SignUpComponent,
    AuthLayoutComponent,
    MainLayoutComponent,
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
