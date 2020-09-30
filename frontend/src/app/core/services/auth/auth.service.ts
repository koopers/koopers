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

  getUser(): Observable<any> {
    return this.http
      .get(`${environment.url_api}/auth/user/`)
      .pipe(catchError(this.handleError));
  }

  register(user): Observable<any> {
    return this.http
      .post(`${environment.url_api}/auth/signup/`, user)
      .pipe(catchError(this.handleError));
  }

  login(user): Observable<any> {
    return this.http.post(`${environment.url_api}/auth/signin/`, user).pipe(
      catchError(this.handleError),
      tap((data: { access: string; refresh: string }) => {
        this.tokenService.saveToken(data.access);
        this.tokenService.saveRefreshToken(data.refresh);
      })
    );
  }

  logout(): void {
    return this.tokenService.deleteTokens();
  }

  refreshToken(): Observable<any> {
    return this.http
      .post(`${environment.url_api}/auth/signin/refresh/`, {
        refresh: this.tokenService.getRefreshToken(),
      })
      .pipe(
        catchError(this.handleError),
        tap((data: { access: string }) => {
          this.tokenService.saveToken(data.access);
        })
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error);
  }
}
