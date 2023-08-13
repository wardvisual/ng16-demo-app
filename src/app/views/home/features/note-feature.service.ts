import { Injectable } from '@angular/core';
import { SupabaseService } from '@ng16-demoapp/services';

import { SupabaseResponse } from '@ng16-demoapp/types';
import { Note } from '../types/note.type';

@Injectable({
  providedIn: 'root',
})
export class NoteFeatureService {
  constructor(private supabaseService: SupabaseService) {}

  /**
   * Creates a new note.
   *
   * @param {Note} note - The note object to be created.
   * @return {Promise<SupabaseResponse>} A promise that resolves to a SupabaseResponse object.
   */
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

  /**
   * Retrieves a single note from the 'notes' table in the Supabase database.
   *
   * @param {string} id - The ID of the note to retrieve.
   * @return {Promise<SupabaseResponse>} - A promise that resolves to a SupabaseResponse object.
   */
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
      result: response.data,
    } satisfies SupabaseResponse;
  }

  /**
   * Retrieves all notes from the database.
   *
   * @return {Promise<SupabaseResponse>} - A promise that resolves to a SupabaseResponse object.
   */
  async getAllNotes(): Promise<SupabaseResponse> {
    const response = await this.supabaseService.supabase.from('notes').select();

    if (response.error) {
      return {
        iSuccess: false,
        message: response.error.message,
      } satisfies SupabaseResponse;
    }

    return {
      iSuccess: true,
      message: 'Notes retrieved!',
      result: response.data,
    } satisfies SupabaseResponse;
  }
}
