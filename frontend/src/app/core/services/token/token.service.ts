import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}
  saveToken(name: string, token: string): void {
    sessionStorage.setItem(name, token);
  }

  getToken(name: string): string {
    return sessionStorage.getItem(name);
  }
}
