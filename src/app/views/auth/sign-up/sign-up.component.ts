import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService, LoaderService } from 'astronautaking/services';
import { SignUp } from 'astronautaking/types';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent {
  signUpForm: FormGroup<SignUp>;

  constructor(
    public authService: AuthService,
    public loaderService: LoaderService
  ) {}

  register(event: Event) {
    event.preventDefault();

    const response = this.authService.register(event);
  } 
}
