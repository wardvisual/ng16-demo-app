import { Component } from '@angular/core';
import { AuthService, LoaderService } from '@ng16-demoapp/services';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
})
export class SignInComponent {
  constructor(
    public authService: AuthService,
    public loaderService: LoaderService
  ) {}
}
