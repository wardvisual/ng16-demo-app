import { FormControl } from '@angular/forms';

export interface Note {
  title: FormControl;
  content: FormControl;
  createdAt: FormControl;
  userId: FormControl;
}
