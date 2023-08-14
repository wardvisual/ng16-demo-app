import { Component } from '@angular/core';
import { AuthComponent } from 'src/app/views/auth/auth.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent extends AuthComponent {}
