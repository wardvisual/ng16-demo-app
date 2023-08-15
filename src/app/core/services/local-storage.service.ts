import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  /**
   * Sets an item in the local storage.
   *
   * @param {string} key - The key of the item to be set.
   * @param {any} value - The value to be stored.
   * @return {void} This function does not return anything.
   */
  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Retrieves the value associated with the specified key from local storage.
   *
   * @param {string} key - The key of the item to retrieve.
   * @return {any} The value associated with the specified key, or null if the key does not exist.
   */
  getItem(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  /**
   * Removes an item from the local storage.
   *
   * @param {string} key - the key of the item to be removed
   * @return {void}
   */
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * Clears the local storage.
   *
   * @return {void} No return value.
   */
  clear(): void {
    localStorage.clear();
  }
}
