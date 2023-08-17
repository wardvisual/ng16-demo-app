import { Component } from '@angular/core';
import { AuthService, LoaderService } from 'astronautaking/services';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent {
  constructor(
    public authService: AuthService,
    public loaderService: LoaderService
  ) {}
}
