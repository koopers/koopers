import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Category } from '../../models/categories';
import { environment } from '../../../../environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http
      .get<Category[]>(`${environment.url_api}/categories`)
      .pipe(catchError(this.handleError));
  }

  createCategory(body: {title: string}): Observable<Category> {
    return this.http
    .post<Category>(`${environment.url_api}/categories/`, body)
    .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log('error', error);
    return throwError(error);
  }
}
