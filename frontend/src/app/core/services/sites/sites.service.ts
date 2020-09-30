import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Site } from '../../models/sites';

@Injectable({
  providedIn: 'root',
})
export class SitesService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Site[]> {
    return this.http
      .get<Site[]>(`${environment.url_api}/sites/`)
      .pipe(catchError(this.handleError));
  }

  create(body: {title: string, url: string, Available: boolean}): Observable<Site> {
    return this.http
    .post<Site>(`${environment.url_api}/sites/`, body)
    .pipe(catchError(this.handleError));
  }

  getOne(id: number): Observable<Site> {
    return this.http
    .get<Site>(`${environment.url_api}/sites/${id}`)
    .pipe(catchError(this.handleError));
  }

  update(id: number, body: {title: string, url: string, Available: boolean}): Observable<Site> {
    return this.http
    .put<Site>(`${environment.url_api}/sites/${id}`, body)
    .pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<Site> {
    return this.http
    .delete<Site>(`${environment.url_api}/sites/${id}`)
    .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error);
  }
}
