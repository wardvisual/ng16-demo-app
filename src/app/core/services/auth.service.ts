import { Injectable, computed, signal } from '@angular/core';

import { SignIn, SignUp } from '@ng16-demoapp/types';
import {
  LocalStorageService,
  RoutingService,
  SupabaseService,
} from '@ng16-demoapp/services';
import { ToastService } from '@ng16-demoapp/components';
import { LoaderService } from './loader.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

/**
 * This class utilizes the Supabase service but it does not use the built-in authentication for users of Supabase.
 * Instead, it implements basic custom authentication logic for demo purposes.
 */
@Injectable({
  providedIn: 'any',
})
export class AuthService {
  signUpForm: FormGroup<SignUp>;
  signInForm: FormGroup<SignIn>;
  isButtonDisabled: boolean;

  isAuthenticated = signal<boolean>(false);

  constructor(
    private supabaseService: SupabaseService,
    private localStorageService: LocalStorageService,
    private routingService: RoutingService,
    private loaderService: LoaderService,
    private toastService: ToastService
  ) {
    this.createSignUpForm();
    this.createSignInForm();

    console.log({ auth1: this.isAuthenticated() });

    this.isAuthenticated.update(() => {
      if (!this.localStorageService.getItem('currentUser')) {
        return false;
      }

      return true;
    });
  }

  onValidationStatusChange(status: boolean) {
    this.isButtonDisabled = !status;
  }

  /**
   * Registers a user.
   *
   * @param {SignUp} user - The user data to be registered.
   * @returns {Promise<SupabaseResponse>} The response from the Supabase API.
   */
  public async register(event: Event): Promise<void> {
    event.preventDefault();

    this.loaderService.setLoading('register', true);

    const user = this.signUpForm.value;

    const userFromDb: any = await this.supabaseService.supabase
      .from('users')
      .select()
      .or(
        `username.eq.${user.username},emailAddress.eq.${user.username},username.eq.${user.username},emailAddress.eq.${user.emailAddress}`
      )
      .single();

    if (userFromDb.error) {
      this.toastService.openToast(false, "Can't register");
      return;
    }

    if (userFromDb.data) {
      this.toastService.openToast(
        false,
        `The ${user.username ? 'username' : 'email'} is already taken`
      );

      return;
    }

    await this.supabaseService.supabase.from('users').insert([user]);

    this.toastService.openToast(true, 'You are now registered!');
    this.loaderService.setLoading('register', false);
  }

  /**
   * Logs in the user.
   *
   * @param {SignIn} user - The user's sign-in information.
   * @return {Promise<SupabaseResponse>} - A promise that resolves to a SupabaseResponse.
   */
  public async login(event: Event): Promise<void> {
    event.preventDefault();

    this.loaderService.setLoading('login', true);

    const user = this.signInForm.value;

    const userFromDb: any = await this.supabaseService.supabase
      .from('users')
      .select()
      .or(
        `username.eq.${user?.username},emailAddress.eq.${user?.username},username.eq.${user?.emailAddress},emailAddress.eq.${user?.emailAddress}`
      )
      .single();

    if (!userFromDb.data) {
      this.toastService.openToast(false, `Account doesn't exists`);
      this.loaderService.setLoading('login', false);
      return;
    }

    if (userFromDb.data?.password !== user?.password) {
      this.toastService.openToast(false, `Invalid password`);
      this.loaderService.setLoading('login', false);
      return;
    }

    const { password, ...userWithoutPassword } = userFromDb.data;

    this.loaderService.setLoading('login', false);

    this.localStorageService.setItem('currentUser', userWithoutPassword);

    this.toastService.openToast(true, `You are now login!`);

    this.routingService.redirectTo('/');
  }

  get user() {
    const user = this.localStorageService.getItem('currentUser');
    user.fullName = `${user.firstName} ${user.lastName}`;

    return user;
  }

  public logout() {
    this.localStorageService.removeItem('currentUser');
    this.routingService.redirectTo('/signin');
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
}
