import { Component } from '@angular/core';
import { AuthService, LoaderService } from '@ng16-demoapp/services';

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
