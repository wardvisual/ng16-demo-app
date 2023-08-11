import { FormControl } from '@angular/forms';

export interface SignUp {
  firstName: FormControl;
  lastName: FormControl;
  username: FormControl;
  emailAddress: FormControl;
  password: FormControl;
}

export interface SignIn {
  username: FormControl;
  password: FormControl;
}
