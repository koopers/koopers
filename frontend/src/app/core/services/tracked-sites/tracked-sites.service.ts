import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { TrackedSite } from '../../models/tracked-sites';
import { environment } from '../../../../environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TrackedSitesService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<TrackedSite[]> {
    return this.http
      .get<TrackedSite[]>(`${environment.url_api}/tracked-sites/`)
      .pipe(catchError(this.handleError));
  }

  create(body: {site_id: number, category_id: number, path_url: string}): Observable<TrackedSite> {
    return this.http
    .post<TrackedSite>(`${environment.url_api}/tracked-sites/add/`, body)
    .pipe(catchError(this.handleError));
  }

  getOne(id: number): Observable<TrackedSite> {
    return this.http
    .get<TrackedSite>(`${environment.url_api}/tracked-sites/${id}`)
    .pipe(catchError(this.handleError));
  }

  update(id: number, body: {site_id: number, category_id: number, path_url: string}): Observable<TrackedSite> {
    return this.http
    .put<TrackedSite>(`${environment.url_api}/tracked-sites/${id}`, body)
    .pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<TrackedSite> {
    return this.http
    .delete<TrackedSite>(`${environment.url_api}/tracked-sites/${id}`)
    .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log('error', error);
    return throwError(error);
  }
}
