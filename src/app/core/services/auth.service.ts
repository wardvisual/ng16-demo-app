import { Injectable, signal } from '@angular/core';

import { SignIn, SignUp } from '@ng16-demoapp/types';
import {
  LocalStorageService,
  RoutingService,
  SupabaseService,
} from '@ng16-demoapp/services';
import { SupabaseResponse } from '@ng16-demoapp/types';

/**
 * This class utilizes the Supabase service but it does not use the built-in authentication for users of Supabase.
 * Instead, it implements basic custom authentication logic for demo purposes.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated = signal<boolean>(false);

  constructor(
    private supabaseService: SupabaseService,
    private localStorageService: LocalStorageService,
    private routingService: RoutingService
  ) {
    this.authenticateUser();
  }

  /**
   * Authenticates the user.
   *
   * @private
   * @return {void}
   */
  private authenticateUser(): void {
    if (!this.localStorageService.getItem('currentUser').id) {
      this.isAuthenticated.update(() => false);
      return;
    }

    this.isAuthenticated.update(() => true);
  }

  /**
   * Registers a user.
   *
   * @param {SignUp} user - The user data to be registered.
   * @returns {Promise<SupabaseResponse>} The response from the Supabase API.
   */
  public async register(user: SignUp): Promise<SupabaseResponse> {
    const userFromDb: any = await this.supabaseService.supabase
      .from('users')
      .select()
      .or(
        `username.eq.${user?.username},emailAddress.eq.${user?.username},username.eq.${user?.emailAddress},emailAddress.eq.${user?.emailAddress}`
      )
      .single();

    if (userFromDb.data) {
      return {
        isSuccess: false,
        message: `The ${user.username ? 'username' : 'email'} is already taken`,
      } satisfies SupabaseResponse;
    }

    await this.supabaseService.supabase.from('users').insert([user]);

    return {
      isSuccess: true,
      message: 'You are now registered!',
    } satisfies SupabaseResponse;
  }

  /**
   * Logs in the user.
   *
   * @param {SignIn} user - The user's sign-in information.
   * @return {Promise<SupabaseResponse>} - A promise that resolves to a SupabaseResponse.
   */
  public async login(user: SignIn): Promise<SupabaseResponse> {
    const userFromDb: any = await this.supabaseService.supabase
      .from('users')
      .select()
      .or(
        `username.eq.${user?.username},emailAddress.eq.${user?.username},username.eq.${user?.emailAddress},emailAddress.eq.${user?.emailAddress}`
      )
      .single();

    if (!userFromDb.data) {
      return {
        isSuccess: false,
        message: `Invalid username or password`,
      } satisfies SupabaseResponse;
    }

    if (userFromDb.data?.password !== user?.password) {
      return {
        isSuccess: false,
        message: `Invalid username or password`,
      } satisfies SupabaseResponse;
    }

    const { password, ...userWithoutPassword } = userFromDb.data;
    return {
      isSuccess: true,
      message: 'You are now login!',
      result: userWithoutPassword,
    } satisfies SupabaseResponse;
  }

  get user() {
    const user = this.localStorageService.getItem('currentUser');
    user.fullName = `${user.firstName} ${user.lastName}`;

    return user;
  }

  logout() {
    this.localStorageService.removeItem('currentUser');
    this.routingService.redirectTo('/signin');
  }
}
