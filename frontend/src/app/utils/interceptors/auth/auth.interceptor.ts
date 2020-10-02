import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { TokenService } from 'src/app/core/services/token/token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.url.includes('refresh-token')) {
      return next.handle(this.addRefreshToken(request));
    }
    request = this.addToken(request);

    return next.handle(request).pipe(
      catchError((response) => {
        if (response.status === 401) {
          return this.authService.refreshToken().pipe(
            switchMap(() => next.handle(this.addToken(request))),
            catchError((msg) => {
              const route = this.router.routerState.snapshot.url;
              if (
                msg.error.refresh[0] === 'This field may not be null.' &&
                route === '/admin/sites'
              ) {
                this.authService.logout();
                this.router.navigate(['/auth/login']);
              }
              return throwError(msg);
            })
          );
        }
        return throwError(response);
      })
    );
  }


  addRefreshToken(request: HttpRequest<any>): HttpRequest<any> {
    const token = this.tokenService.getRefreshToken();
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return request;
  }

  addToken(request: HttpRequest<any>): HttpRequest<any> {
    const token = this.tokenService.getToken();
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return request;
  }
}
