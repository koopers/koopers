import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  register(user): Observable<any> {
    console.log('AuthService -> constructor -> user', user);
    return this.http
      .post(`${environment.url_api}/auth/signup/`, user)
      .pipe(catchError(this.handleError));
  }

  login(user): Observable<any> {
    return this.http.post(`${environment.url_api}/auth/signin/`, user).pipe(
      catchError(this.handleError),
      tap((data: { access: string; refresh: string }) => {
        console.log('data', data);
        const token = data.access;
        const tokenRefresh = data.refresh;
        this.tokenService.saveToken('token', token);
        this.tokenService.saveToken('token_refresh', tokenRefresh);
      })
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log('error', error);
    return throwError(error);
  }
}
