import { Injectable, signal } from '@angular/core';

import { SignIn, SignUp } from 'astronautaking/types';
import { LocalStorageService, SupabaseService } from 'astronautaking/services';
import { ToastService } from 'astronautaking/components';
import { LoaderService } from './loader.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

/**
 * This class utilizes the Supabase service but it does not use the built-in authentication for users of Supabase.
 * Instead, it implements basic custom authentication logic for demo purposes.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  signUpForm: FormGroup<SignUp>;
  signInForm: FormGroup<SignIn>;
  isButtonDisabled: boolean;

  isAuthenticated = signal<boolean>(false);

  constructor(
    private supabaseService: SupabaseService,
    private localStorageService: LocalStorageService,
    private loaderService: LoaderService,
    private toastService: ToastService,
    private router: Router
  ) {
    this.createSignUpForm();
    this.createSignInForm();

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
   * Registers a new user.
   *
   * @param {Event} event - The event object.
   * @return {Promise<void>} A Promise that resolves when the user is registered.
   */
  async register(event: Event): Promise<void> {
    event.preventDefault();

    this.loaderService.setLoading('register', true);

    const user = this.signUpForm.value;

    const userFromDb: any = await this.supabaseService.supabase
      .from('users')
      .select()
      .or(
        `username.eq.${user?.username},emailAddress.eq.${user?.username},username.eq.${user?.username},emailAddress.eq.${user?.emailAddress}`
      )
      .single();

    if (userFromDb.data) {
      let duplicatedField: string;

      userFromDb.data.emailAddress === user.emailAddress
        ? (duplicatedField = 'Email')
        : (duplicatedField = 'Username');

      this.toastService.openToast(
        false,
        `This ${duplicatedField} is already taken`
      );
    }

    if (!userFromDb.data) {
      await this.supabaseService.supabase.from('users').insert([user]);

      this.toastService.openToast(true, 'You are now registered!');
      this.router.navigateByUrl('/signin');
    }

    this.loaderService.setLoading('register', false);
  }

  /**
   * Logs in the user.
   *
   * @param {Event} event - The event that triggered the login.
   * @return {Promise<void>} - A promise that resolves once the login is complete.
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
    this.isAuthenticated.update(() => true);

    this.toastService.openToast(true, `You are now login!`);

    this.router.navigateByUrl('/');
  }

  /**
   * Retrieves the current user from the local storage and returns it.
   *
   * @return {object} The current user object with the `fullName` property added.
   */
  get user() {
    const user = this.localStorageService.getItem('currentUser');
    user.fullName = `${user.firstName} ${user.lastName}`;

    return user;
  }

  /**
   * Logs out the current user by removing the 'currentUser' item from the local storage
   * and redirecting to the '/signin' page.
   */
  public logout(): void {
    this.localStorageService.removeItem('currentUser');
    this.router.navigateByUrl('/signin');
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
