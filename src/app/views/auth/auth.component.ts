import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';

import { SignUp, SignIn } from '@ng16-demoapp/types';
import {
  AuthService,
  LoaderService,
  LocalStorageService,
  RoutingService,
} from '@ng16-demoapp/services';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit {
  signUpForm: FormGroup;
  signInForm: FormGroup;
  currentRoute: string;
  isDisabled: boolean;

  constructor(
    private authService: AuthService,
    public loaderService: LoaderService,
    public localStorageService: LocalStorageService,
    public routingService: RoutingService
  ) {}

  ngOnInit(): void {
    this.createSignUpForm();
    this.createSignInForm();

    this.isDisabled = true;
  }

  onValidationStatusChange(status: boolean) {
    this.isDisabled = !status;
  }

  /**
   * Creates a signup form.
   *
   * @return {void}
   */
  createSignUpForm(): void {
    this.signUpForm = new FormGroup<SignUp>({
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
        Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  /**
   * Creates the signin form.
   *
   * @returns {void} - No return value.
   */
  createSignInForm(): void {
    this.signInForm = new FormGroup<SignIn>({
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

  /**
   * Handles the sign up event.
   *
   * @param {Event} event - The sign up event.
   * @return {Promise<void>} - A promise that resolves when the sign up process is complete.
   */
  async onSignUp(event: Event): Promise<void> {
    event.preventDefault();

    this.loaderService.setLoading(this, true);

    const response = await this.authService.register(this.signUpForm.value);

    this.loaderService.setLoading(this, false);

    if (response.isSuccess) {
      this.routingService.redirectTo('/signin');
    }
  }

  /**
   * Handles the sign-in event.
   *
   * @param {Event} event - The sign-in event.
   * @return {Promise<void>} A promise that resolves when the sign-in process is complete.
   */
  async onSignIn(event: Event): Promise<void> {
    event.preventDefault();

    this.loaderService.setLoading(this, true);

    const response = await this.authService.login(this.signInForm.value);

    this.loaderService.setLoading(this, false);

    if (response.isSuccess) {
      this.localStorageService.setItem('currentUser', response.result);

      this.routingService.redirectTo('/');
    }
  }
}
