import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScreenshotsService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<{}> {
    return this.http
      .get<{}>(`${environment.url_api}/screenshots/`)
      .pipe(catchError(this.handleError));
  }

  getOne(id: number): Observable<{}> {
    return this.http
      .get<{}>(`${environment.url_api}/screenshots/${id}`)
      .pipe(catchError(this.handleError));
  }


  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error);
  }
}
