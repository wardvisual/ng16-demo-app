import { Injectable } from '@angular/core';

import { SignIn, SignUp } from './types/auth.types';
import { SupabaseService } from '@ng16-demoapp/services';
import { SupabaseResponse } from '@ng16-demoapp/types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private supabaseService: SupabaseService) {}

  public async register(user: SignUp): Promise<SupabaseResponse> {
    const userFromDb: any = await this.supabaseService.supabase
      .from('users')
      .select()
      .or(
        `username.eq.${user?.username},emailAddress.eq.${user?.username},username.eq.${user?.emailAddress},emailAddress.eq.${user?.emailAddress}`
      )
      .single(); /* Checks if a registered user already exists with the provided email or username. */

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

  public async login(user: SignIn): Promise<SupabaseResponse> {
    const userFromDb: any = await this.supabaseService.supabase
      .from('users')
      .select()
      .or(
        `username.eq.${user?.username},emailAddress.eq.${user?.username},username.eq.${user?.emailAddress},emailAddress.eq.${user?.emailAddress}`
      )
      .single(); /* Checks if a registered user already exists with the provided email or username. */

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

    return {
      iSuccess: true,
      message: 'You are now login!',
    } satisfies SupabaseResponse;
  }
}
