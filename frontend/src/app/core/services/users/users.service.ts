import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {User} from '../../models/users';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http
      .get<User[]>(`${environment.url_api}/users/`)
      .pipe(catchError(this.handleError));
  }

  create(body: {username: string, is_staff: boolean}): Observable<User> {
    return this.http
    .post<User>(`${environment.url_api}/auth/signup/`, body)
    .pipe(catchError(this.handleError));
  }

  getOne(id: number): Observable<User> {
    return this.http
    .get<User>(`${environment.url_api}/users/${id}`)
    .pipe(catchError(this.handleError));
  }

  update(id: number, body: {username: string, is_staff: boolean}): Observable<User> {
    return this.http
    .patch<User>(`${environment.url_api}/users/${id}`, body)
    .pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<User> {
    return this.http
    .delete<User>(`${environment.url_api}/users/${id}`)
    .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log('error', error);
    return throwError(error);
  }
}
