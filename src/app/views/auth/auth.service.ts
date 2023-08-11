import { Injectable } from '@angular/core';
import { ApiService } from '@ng16-demoapp/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private apiService: ApiService) {}

  public getDataFromApi(): any {
    this.apiService.get('').subscribe();
  }
}
