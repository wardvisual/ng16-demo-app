import { Injectable } from '@angular/core';
import { SupabaseService } from '@ng16-demoapp/services';

import { SupabaseResponse } from '@ng16-demoapp/types';
import { Note } from './types/note.type';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  constructor(private supabaseService: SupabaseService) {}

  async createNewNote(note: Note): Promise<SupabaseResponse> {
    const response: any = await this.supabaseService.supabase
      .from('notes')
      .insert([note]);

    if (response.error) {
      return {
        iSuccess: false,
        message: response.error.message,
      } satisfies SupabaseResponse;
    }

    return {
      iSuccess: true,
      message: 'Note created!',
      result: response,
    } satisfies SupabaseResponse;
  }

  async viewSingleNote(id: string): Promise<SupabaseResponse> {
    const response = await this.supabaseService.supabase
      .from('notes')
      .select()
      .eq('id', id)
      .single();

    if (response.error) {
      return {
        iSuccess: false,
        message: response.error.message,
      } satisfies SupabaseResponse;
    }

    return {
      iSuccess: true,
      message: 'Note retrieved!',
      result: response,
    } satisfies SupabaseResponse;
  }
}
