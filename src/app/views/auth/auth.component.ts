import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';

import { AuthService } from './auth.service';
import { SignUp, SignIn } from './types/auth.types';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  signupForm: FormGroup;
  signinForm: FormGroup;
  currentRoute: string;

  constructor(private router: Router, private authService: AuthService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });

    this.createSignupForm();
    this.createSigninForm();
  }

  openPage(url: string): void {
    this.router.navigateByUrl(`/${url}`);
  }

  createSignupForm() {
    this.signupForm = new FormGroup<SignUp>({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      emailAddress: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  createSigninForm() {
    this.signinForm = new FormGroup<SignIn>({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  onSignup(event: Event): void {
    event.preventDefault();
    console.log({ n: this.signupForm.value });
  }

  onSignin(event: Event): void {
    event.preventDefault();
    console.log({ n: this.signinForm.value });
  }
}
