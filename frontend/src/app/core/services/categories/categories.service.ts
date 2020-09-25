import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {Category} from '../../models/categories'
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return of(
      [
        {
          id: 1,
          title: "Portada",
          slug: "portada",
          created: "2020-09-21T11:35:52.413002-05:00",
          updated: "2020-09-21T11:35:52.413002-05:00"
      },
      {
          id: 2,
          title: "Internacional",
          slug: "internacional",
          created: "2020-09-21T11:36:08.965369-05:00",
          updated: "2020-09-21T11:36:08.965369-05:00"
      },
      {
          id: 3,
          title: "Nacional",
          slug: "nacional",
          created: "2020-09-21T11:38:17.375291-05:00",
          updated: "2020-09-21T11:38:17.375291-05:00"
      }
    ]
    )
    // return this.http.get(`${environment.url_api}/api/categories`);
  }
}
