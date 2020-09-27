import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { catchError } from 'rxjs/operators';
import { Site } from '../../models/sites';

@Injectable({
  providedIn: 'root',
})
export class SitesService {
  constructor(private http: HttpClient) {}

  getSites(): Observable<Site[]> {
    return this.http
      .get<Site[]>(`${environment.url_api}/sites`)
      .pipe(catchError(this.handleError));
  }

  createSite(body: {title: string, url: string, Available: boolean}): Observable<Site> {
    return this.http
    .post<Site>(`${environment.url_api}/sites/`, body)
    .pipe(catchError(this.handleError));
  }

  getSite(id: number): Observable<Site> {
    return this.http
    .get<Site>(`${environment.url_api}/sites/${id}`)
    .pipe(catchError(this.handleError));
  }

  updateSite(id: number, body: {title: string, url: string, Available: boolean}): Observable<Site> {
    return this.http
    .put<Site>(`${environment.url_api}/sites/${id}`, body)
    .pipe(catchError(this.handleError));
  }

  deleteSite(id: number): Observable<Site> {
    return this.http
    .delete<Site>(`${environment.url_api}/sites/${id}`)
    .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log('error', error);
    return throwError(error);
  }
}
