import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HomeComponent, AuthComponent } from '@ng16-demoapp/views';
import { SignInComponent, SignUpComponent } from '@ng16-demoapp/views/auth';
import {
  NewNoteComponent,
  NotestListingComponent,
} from '@ng16-demoapp/views/home';

import {
  ButtonComponent,
  InputComponent,
  ModalComponent,
  ToastComponent,
} from '@ng16-demoapp/components';
import {
  AuthLayoutComponent,
  MainLayoutComponent,
} from '@ng16-demoapp/layouts';

import { IconsModule } from './icons.module';
import { TruncatePipe } from '@ng16-demoapp/pipes';

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    ButtonComponent,
    HomeComponent,
    NewNoteComponent,
    NotestListingComponent,
    AuthComponent,
    SignInComponent,
    SignUpComponent,
    ModalComponent,
    ToastComponent,
    AuthLayoutComponent,
    MainLayoutComponent,

    // Pipes
    TruncatePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,

    IconsModule,
  ],
  providers: [],
  exports: [RouterModule],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
