import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  private formatErrors(error: any) {
    return throwError(() => error.error);
  }

  public get(
    path: string,
    params: HttpParams = new HttpParams()
  ): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/${path}`, { params })
      .pipe(catchError(this.formatErrors));
  }

  public put(path: string, body: Object = {}): Observable<any> {
    return this.http
      .put(`${environment.apiUrl}/${path}`, JSON.stringify(body))
      .pipe(catchError(this.formatErrors));
  }

  public post<T>(path: string, body: Object = {}): Observable<any> {
    return this.http
      .post<T>(`${environment.apiUrl}/${path}`, JSON.stringify(body))
      .pipe(catchError(this.formatErrors));
  }

  public delete(path: string): Observable<any> {
    return this.http
      .delete(`${environment.apiUrl}/${path}`)
      .pipe(catchError(this.formatErrors));
  }
}
