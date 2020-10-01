import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Category } from '../../models/categories';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Category[]> {
    return this.http
      .get<Category[]>(`${environment.url_api}/categories/`)
      .pipe(catchError(this.handleError));
  }

  create(body: {title: string}): Observable<Category> {
    return this.http
    .post<Category>(`${environment.url_api}/categories/`, body)
    .pipe(catchError(this.handleError));
  }

  getOne(id: number): Observable<Category> {
    return this.http
    .get<Category>(`${environment.url_api}/categories/${id}`)
    .pipe(catchError(this.handleError));
  }

  update(id: number, body: {title: string}): Observable<Category> {
    return this.http
    .put<Category>(`${environment.url_api}/categories/${id}`, body)
    .pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<Category> {
    return this.http
    .delete<Category>(`${environment.url_api}/categories/${id}`)
    .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error);
  }
}
