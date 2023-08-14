import { Injectable } from '@angular/core';
import { SupabaseService } from '@ng16-demoapp/services';

import { Note, SupabaseResponse } from '@ng16-demoapp/types';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
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
      .insert([note])
      .select('*')
      .single();

    if (response.error) {
      return {
        isSuccess: false,
        message: 'Adding note failed',
      } satisfies SupabaseResponse;
    }

    return {
      isSuccess: true,
      message: 'Note successfully created!',
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
        isSuccess: false,
        message: "Can't find note",
      } satisfies SupabaseResponse;
    }

    return {
      isSuccess: true,
      message: 'Notes successfully retrieved!',
      result: response.data,
    } satisfies SupabaseResponse;
  }

  /**
   * Retrieves all notes from the database.
   *
   * @return {Promise<SupabaseResponse>} - A promise that resolves to a SupabaseResponse object.
   */
  async getAllNotes(userId: string): Promise<SupabaseResponse> {
    const response = await this.supabaseService.supabase
      .from('notes')
      .select()
      .eq('userId', userId);

    if (response.error) {
      return {
        isSuccess: false,
        message: "Can't find notes",
      } satisfies SupabaseResponse;
    }

    return {
      isSuccess: true,
      message: 'Notes successfully retrieved!',
      result: response.data,
    } satisfies SupabaseResponse;
  }

  async updateNote(
    note: Partial<Note> & { id: string }
  ): Promise<SupabaseResponse> {
    const response = await this.supabaseService.supabase
      .from('notes')
      .update(note)
      .eq('id', note.id)
      .select();

    if (response.error) {
      return {
        isSuccess: false,
        message: "Can't find note",
      } satisfies SupabaseResponse;
    }

    return {
      isSuccess: true,
      message: 'Note successfully updated!',
      result: response.data,
    } satisfies SupabaseResponse;
  }

  async removeNote(id: string): Promise<SupabaseResponse> {
    const response = await this.supabaseService.supabase
      .from('notes')
      .delete()
      .eq('id', id);

    if (response.error) {
      return {
        isSuccess: false,
        message: "Can't delete note",
      } satisfies SupabaseResponse;
    }

    return {
      isSuccess: true,
      message: 'Note successfully deleted!',
      result: response.data,
    } satisfies SupabaseResponse;
  }
}
