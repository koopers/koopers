import { Category } from '@core/models/categories';
import { of, Observable } from 'rxjs';
import {categories} from '../mocks/mocks';

export class CategoriesServiceStub {

  getAll(): Observable<Category[]> {
    return of(categories);
  }

  delete() {
    return of(true);
  }
}

export class AlertsServiceStub {
  handleSuccessAlert() {}
}
