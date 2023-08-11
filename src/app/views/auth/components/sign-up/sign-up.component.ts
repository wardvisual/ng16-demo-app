import { Component } from '@angular/core';
import { AuthComponent } from 'src/app/views/auth/auth.component';
import { ApiService } from '@ng16-demoapp/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent extends AuthComponent {
  constructor(router: Router, authService: AuthService) {
    super(router, authService);
  }
}
