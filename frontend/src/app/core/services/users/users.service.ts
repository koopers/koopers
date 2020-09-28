import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {User} from '../../models/users';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }

  getAll(): Observable<User[]> {
    return of(
      [
        {
          id: 1,
          username: 'aasdasd@gmail.com',
          is_staff: true,
          created: "2020-09-21T11:35:52.413002-05:00",
          updated: "2020-09-21T11:35:52.413002-05:00"
      },
      {
          id: 2,
          username: 'aasdasd1@gmail.com',
          is_staff: true,
          created: "2020-09-21T11:36:08.965369-05:00",
          updated: "2020-09-21T11:36:08.965369-05:00"
      },
      {
          id: 3,
          username: 'aasdasd2@gmail.com',
          is_staff: false,
          created: "2020-09-21T11:38:17.375291-05:00",
          updated: "2020-09-21T11:38:17.375291-05:00"
      }
    ]
    )
    // return this.http.get(`${environment.url_api}/api/categories`);
  }
}
