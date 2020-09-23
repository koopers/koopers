import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  getCookie(cname) {
    const name = cname + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    let c;
    for (let i = 0; i < ca.length; i++) {
      c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return c;
  }

  login(email, password) {
    const cookie = this.getCookie('csrftoken');
    console.log('AuthService -> login -> cookie', cookie);
    return this.http.post(
      `${environment.url_api}/auth/signin/`,
      {
        username: email,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          mode: 'cors',
          'Access-Control-Allow-Origin': '*',
          'X-CSRFToken': cookie,
        },
      }
    );
  }

  getUser(): Observable<any> {
    return this.http.get('/auth/user/');
  }
}
