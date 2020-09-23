import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SitesService {

  constructor(private http: HttpClient) { }

  getSites() {
    return this.http.get(`${environment.url_api}/api/sites`, {
        headers: {
          'Content-Type': 'application/json',
          mode: 'cors',
          'Access-Control-Allow-Origin': '*',
          'X-CSRFToken': 'cookie',
        },
    })
  }
}
