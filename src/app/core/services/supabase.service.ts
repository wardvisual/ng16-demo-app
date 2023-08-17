import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';

import { environment } from 'astronautaking/environments';

/**
 * Service for interacting with the Supabase API.
 */
@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  public supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseAnonKey
    );
  }
}
