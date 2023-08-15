import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  /**
   * Returns the current date and time.
   *
   * @return {Date} The current date and time.
   */
  getCurrentDateTime(): Date {
    return new Date();
  }
}
