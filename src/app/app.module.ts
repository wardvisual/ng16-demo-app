import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AuthComponent, NotesComponent } from '@ng16-demoapp/views';
import { SignInComponent, SignUpComponent } from '@ng16-demoapp/views/auth';

import * as NotesComponents from '@ng16-demoapp/views/notes';

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
    NotesComponent,
    AuthComponent,
    SignInComponent,
    SignUpComponent,
    ModalComponent,
    ToastComponent,
    AuthLayoutComponent,
    MainLayoutComponent,
    NotesComponents.NotestListingComponent,

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
