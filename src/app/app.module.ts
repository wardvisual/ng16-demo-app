import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {
  NotesComponent,
  SignInComponent,
  SignUpComponent,
} from 'astronautaking/views';

import * as NotesComponents from 'astronautaking/views/notes';

import {
  ButtonComponent,
  InputComponent,
  ModalComponent,
  ToastComponent,
} from 'astronautaking/components';
import {
  AuthLayoutComponent,
  MainLayoutComponent,
} from 'astronautaking/layouts';

import { IconsModule } from './icons.module';
import { TruncatePipe } from 'astronautaking/pipes';

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    ButtonComponent,
    NotesComponent,
    SignInComponent,
    SignUpComponent,
    ModalComponent,
    ToastComponent,
    AuthLayoutComponent,
    MainLayoutComponent,
    NotesComponents.CreateNoteComponent,
    NotesComponents.NotestListingComponent,
    NotesComponents.UpdateNoteComponent,
    NotesComponents.RemoveNoteComponent,

    // Pipes
    TruncatePipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,

    IconsModule,
  ],
  providers: [],
  exports: [RouterModule],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
