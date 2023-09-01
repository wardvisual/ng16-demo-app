import { Injectable, signal } from '@angular/core';

import { APIResponse, SignIn, SignUp } from 'astronautaking/types';
import { HttpService, LocalStorageService } from 'astronautaking/services';
import { ToastService } from 'astronautaking/components';
import { LoaderService } from './loader.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  signUpForm: FormGroup<SignUp>;
  signInForm: FormGroup<SignIn>;
  isButtonDisabled: boolean;

  isAuthenticated$ = new BehaviorSubject<boolean>(false);

  constructor(
    private localStorageService: LocalStorageService,
    private loaderService: LoaderService,
    private toastService: ToastService,
    private router: Router,
    private httpService: HttpService
  ) {
    this.createSignUpForm();
    this.createSignInForm();
    this.isButtonDisabled = true;

    if (!this.localStorageService.getItem('currentUser')) {
      this.isAuthenticated$.next(false);
      return;
    }

    this.isAuthenticated$.next(true);
  }

  onValidationStatusChange(status: boolean) {
    this.isButtonDisabled = !status;
  }

  register(event: Event) {
    event.preventDefault();

    this.loaderService.setLoading('register', true);

    const user = this.signUpForm.value;

    this.httpService.post('/users/register', user).subscribe((res: any) => {
      this.toastService.openToast(res.isSuccess, res.message);

      if (res.isSuccess) this.router.navigateByUrl('/signin');
    });

    this.loaderService.setLoading('register', false);
  }

  public async login(event: Event) {
    event.preventDefault();

    this.loaderService.setLoading('login', true);

    const user = this.signInForm.value;

    this.httpService.post('/users/login', user).subscribe((res: any) => {
      this.toastService.openToast(res.isSuccess, res.message);

      this.localStorageService.setItem('currentUser', res.data.user);

      this.isAuthenticated$.next(true);

      if (res.isSuccess) this.router.navigateByUrl('/');
    });

    this.loaderService.setLoading('login', false);
  }


  get user(): any {
    const user = this.localStorageService.getItem('currentUser');
    user.fullName = `${user.firstName} ${user.lastName}`;

    return user;
  }

  public logout(): void {
    this.localStorageService.removeItem('currentUser');
    this.router.navigateByUrl('/signin');
  }

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
