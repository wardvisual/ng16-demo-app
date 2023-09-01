import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'astronautaking/environments';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private readonly http: HttpClient) { }

  get(path: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}${path}`).pipe(take(1));
  }

  post(path: string, data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}${path}`, data, {}).pipe(take(1));
  }

  put(path: string, data: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}${path}`, data).pipe(take(1));
  }

  delete(path: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}${path}`).pipe(take(1));
  }

  patch(path: string, data: any): Observable<any> {
    return this.http.patch(`${environment.apiUrl}${path}`, data).pipe(take(1));
  }
}
