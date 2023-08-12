import { FormControl } from '@angular/forms';

export interface SupabaseResponse {
  iSuccess: boolean;
  message: string;
  result?: any;
}
