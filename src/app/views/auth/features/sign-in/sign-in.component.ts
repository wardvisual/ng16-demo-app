import { Component } from '@angular/core';
import { AuthComponent } from 'src/app/views/auth/auth.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
})
export class SignInComponent extends AuthComponent {}
