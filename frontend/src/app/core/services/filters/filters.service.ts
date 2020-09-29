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

  filterByDates(startDate: number, endDate: number): Observable<{}> {
    return this.http.get(`${environment.url_api}/search/?start_date=${startDate}&end_date=${endDate}`).pipe(
      catchError(this.handleError),
      map((data: any) => data.result)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error);
  }
}
