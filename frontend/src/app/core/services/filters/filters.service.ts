import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {

  constructor(private http: HttpClient) { }

  filterBySites(siteId: string): Observable<{}> {
    return this.http.get(`${environment.url_api}/search/?site_id=${siteId}`).pipe(
      catchError(this.handleError),
      map((data: any) => data.result)
    );
  }

  filterByDates(siteId: string, startDate: number, endDate: number): Observable<{}> {
    return this.http.get(`${environment.url_api}/search/?site_id=${siteId}&start_date=${startDate}&end_date=${endDate}`).pipe(
      catchError(this.handleError),
      map((data: any) => data.result)
    );
  }

  filterByCategories(siteId: string, categories: string): Observable<{}> {
    return this.http.get(`${environment.url_api}/search/?site_id=${siteId}&category_id=${categories}`).pipe(
      catchError(this.handleError),
      map((data: any) => data.result)
    );
  }

  filterByAll(siteId: string, categories: string, startDate: number, endDate: number): Observable<{}> {
    return this.http.get(`${environment.url_api}/search/?site_id=${siteId}&category_id=${categories}&start_date=${startDate}&end_date=${endDate}`).pipe(
      catchError(this.handleError),
      map((data: any) => data.result)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error);
  }
}
