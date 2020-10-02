import { Category } from '@core/models/categories';
import { of, Observable } from 'rxjs';
import {categories} from '../mocks/mocks';

export class CategoriesServiceStub {

  getAll(): Observable<Category[]> {
    return of(categories);
  }

  delete(): Observable<Category> {
    return of(categories[0]);
  }

  create(body: {title: string}): Observable<Category> {
    return of(categories[0]);
  }

  getOne(id: number): Observable<Category> {
    return of(categories[0]);
  }

  update(id: number, body: {title: string}): Observable<Category> {
    return of(categories[0]);
  }
}

export class LocationStub {
  back(): void {}
}


export class AlertsServiceStub {
  handleSuccessAlert() {}
}
