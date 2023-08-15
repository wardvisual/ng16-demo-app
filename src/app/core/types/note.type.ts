import { FormControl } from '@angular/forms';

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  userId: string;
}

export interface CreateNote {
  title: FormControl;
  content: FormControl;
  createdAt: FormControl;
  userId: FormControl;
}

export interface UpdateNote {
  id?: FormControl;
  title: FormControl;
  content: FormControl;
}
