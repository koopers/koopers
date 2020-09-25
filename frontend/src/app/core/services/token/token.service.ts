import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}
  saveToken(token: string): void {
    sessionStorage.setItem('token', token);
  }

  saveRefreshToken(tokenRefresh: string): void {
    sessionStorage.setItem('token-refresh', tokenRefresh);
  }

  getToken(): string {
    return sessionStorage.getItem('token');
  }

  getRefreshToken(): string {
    return sessionStorage.getItem('refresh-token');
  }

  deleteTokens(): void {
    return sessionStorage.clear();
  }
}
