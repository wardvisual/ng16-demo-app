import { Injectable } from '@angular/core';

import { SignIn, SignUp } from './types/auth.types';
import { SupabaseService } from '@ng16-demoapp/services';
import { SupabaseResponse } from '@ng16-demoapp/types';

/**
 * This class utilizes the Supabase service but it does not use the built-in authentication for users of Supabase.
 * Instead, it implements basic custom authentication logic for demo purposes.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private supabaseService: SupabaseService) {}

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
        iSuccess: false,
        message: `The ${user.username ? 'username' : 'email'} is already taken`,
      } satisfies SupabaseResponse;
    }

    await this.supabaseService.supabase.from('users').insert([user]);

    return {
      iSuccess: true,
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
        iSuccess: false,
        message: `Invalid username or password`,
      } satisfies SupabaseResponse;
    }

    if (userFromDb.data?.password !== user?.password) {
      return {
        iSuccess: false,
        message: `Invalid username or password`,
      } satisfies SupabaseResponse;
    }

    const { password, ...userWithoutPassword } = userFromDb.data;

    return {
      iSuccess: true,
      message: 'You are now login!',
      result: userWithoutPassword,
    } satisfies SupabaseResponse;
  }
}
