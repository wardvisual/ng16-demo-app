import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';

import { AuthService } from './auth.service';
import { SignUp, SignIn } from './types/auth.types';
import { SupabaseResponse } from '@ng16-demoapp/types';

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
    private routerService: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.createSignUpForm();
    this.createSignInForm();
    this.subscribeToRouterEvents();

    this.isDisabled = true;
  }

  /**
   * Subscribes to router events and updates the current route.
   *
   * @private
   * @return {void}
   */
  private subscribeToRouterEvents(): void {
    this.routerService.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }

  /**
   * Opens a page by navigating to the specified URL.
   *
   * @param {string} url - The URL of the page to open.
   * @return {void} This function does not return a value.
   */
  openPage(url: string): void {
    this.routerService.navigateByUrl(`/${url}`);
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
   * Asynchronously handles the signup event.
   *
   * @param {Event} event - The signup event.
   * @return {Promise<SupabaseResponse>} - A promise that resolves to a SupabaseResponse.
   */
  async onSignUp(event: Event): Promise<SupabaseResponse> {
    event.preventDefault();

    const response = await this.authService.register(this.signUpForm.value);
    return response;
  }

  /**
   * Asynchronously handles the signin event.
   *
   * @param {Event} event - The event triggering the signin.
   * @return {Promise<SupabaseResponse>} A promise that resolves to a SupabaseResponse.
   */
  async onSignIn(event: Event): Promise<SupabaseResponse> {
    event.preventDefault();

    const response = await this.authService.login(this.signInForm.value);
    return response;
  }
}
