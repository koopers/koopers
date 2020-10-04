import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Screenshot } from '@core/models/screenshots';
import { environment } from '@environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FiltersService {
  constructor(private http: HttpClient) {}

  filterOptions(
    siteId?: string,
    categories?: string,
    startDate?: number,
    endDate?: number
  ): Observable<{}> {
    let params = '';

    if (siteId) {
      params += `&site_id=${siteId}`;
    }
    if (categories) {
      params += `&category_id=${categories}`;
    }
    if (startDate && endDate) {
      params += `&start_date=${startDate}&end_date=${endDate}`;
    }
    if (startDate) {
      params += `&start_date=${startDate}`;
    }

    if (endDate) {
      params += `&end_date=${endDate}`;
    }

    return this.http.get(`${environment.url_api}/search/?${params}`).pipe(
      catchError(this.handleError),
      map((data: { result: Screenshot }) => data.result)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error);
  }
}
