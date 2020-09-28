import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { catchError } from 'rxjs/operators';
import { SuggestedSite } from '../../models/suggested-sites';

@Injectable({
  providedIn: 'root'
})
export class SuggestedSitesService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<SuggestedSite[]> {
    return this.http
      .get<SuggestedSite[]>(`${environment.url_api}/suggested-sites`)
      .pipe(catchError(this.handleError));
  }

  create(body: {title: string, url: string, categories: string[]}): Observable<SuggestedSite> {
    return this.http
    .post<SuggestedSite>(`${environment.url_api}/suggested-sites/`, body)
    .pipe(catchError(this.handleError));
  }

  getOne(id: number): Observable<SuggestedSite> {
    return this.http
    .get<SuggestedSite>(`${environment.url_api}/suggested-sites/${id}`)
    .pipe(catchError(this.handleError));
  }

  update(id: number, body: {title: string, url: string, categories: string[]}): Observable<SuggestedSite> {
    return this.http
    .put<SuggestedSite>(`${environment.url_api}/suggested-sites/${id}`, body)
    .pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<SuggestedSite> {
    return this.http
    .delete<SuggestedSite>(`${environment.url_api}/suggested-sites/${id}`)
    .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log('error', error);
    return throwError(error);
  }
}
