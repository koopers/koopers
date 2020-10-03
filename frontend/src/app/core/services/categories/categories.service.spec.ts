import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { CategoriesService } from './categories.service';
import { environment } from '../../../../environments/environment';
import { categories } from '@utils/mocks/mocks';
import { cold } from 'jasmine-marbles';

describe('CategoriesService', () => {
  let httpTestingController: HttpTestingController;
  let service: CategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoriesService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CategoriesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  afterAll(() => {
    service = null;
    httpTestingController = null;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getAll call get', () => {
    service.getAll().subscribe();
    const req = httpTestingController.expectOne(`${environment.url_api}/categories/`);
    expect(req.request.method).toBe('GET');
  });

  it('should getAll use the right url', () => {
    service.getAll().subscribe();
    const req = httpTestingController.expectOne(`${environment.url_api}/categories/`);
    expect(req.request.url).toBe(`${environment.url_api}/categories/`);
  });

  it('should getAll return the right data', () => {
    const mockData = categories;
    service.getAll().subscribe(data => {
      expect(data).toEqual(mockData);
    });
    const req = httpTestingController.expectOne(`${environment.url_api}/categories/`);
    req.flush(mockData);
  });

  it('should create call post', () => {
    const body = {title: 'Test'};
    service.create(body).subscribe();
    const req = httpTestingController.expectOne(`${environment.url_api}/categories/`);
    expect(req.request.method).toBe('POST');
  });

  it('should create use the right url', () => {
    const body = {title: 'Test'};
    service.create(body).subscribe();
    const req = httpTestingController.expectOne(`${environment.url_api}/categories/`);
    expect(req.request.url).toBe(`${environment.url_api}/categories/`);
  });

  it('should create return the right data', () => {
    const mockData = categories[0];
    const body = {title: 'Test'};
    service.create(body).subscribe(data => {
      expect(data).toEqual(mockData);
    });
    const req = httpTestingController.expectOne(`${environment.url_api}/categories/`);
    req.flush(mockData);
  });

  it('should getOne call get', () => {
    const id = 1;
    service.getOne(id).subscribe();
    const req = httpTestingController.expectOne(`${environment.url_api}/categories/${id}`);
    expect(req.request.method).toBe('GET');
  });

  it('should getOne use the right url', () => {
    const id = 1;
    service.getOne(id).subscribe();
    const req = httpTestingController.expectOne(`${environment.url_api}/categories/${id}`);
    expect(req.request.url).toBe(`${environment.url_api}/categories/${id}`);
  });

  it('should getOne return the right data', () => {
    const mockData = categories[0];
    const id = 1;
    service.getOne(id).subscribe(data => {
      expect(data).toEqual(mockData);
    });
    const req = httpTestingController.expectOne(`${environment.url_api}/categories/${id}`);
    req.flush(mockData);
  });

  it('should update call put', () => {
    const id = 1;
    const body = {title: 'Test'};
    service.update(id, body).subscribe();
    const req = httpTestingController.expectOne(`${environment.url_api}/categories/${id}`);
    expect(req.request.method).toBe('PUT');
  });

  it('should update use the right url', () => {
    const id = 1;
    const body = {title: 'Test'};
    service.update(id, body).subscribe();
    const req = httpTestingController.expectOne(`${environment.url_api}/categories/${id}`);
    expect(req.request.url).toBe(`${environment.url_api}/categories/${id}`);
  });

  it('should update return the right data', () => {
    const mockData = categories[0];
    const id = 1;
    const body = {title: 'Test'};
    service.update(id, body).subscribe(data => {
      expect(data).toEqual(mockData);
    });
    const req = httpTestingController.expectOne(`${environment.url_api}/categories/${id}`);
    req.flush(mockData);
  });

  it('should delete call delete', () => {
    const id = 1;
    service.delete(id).subscribe();
    const req = httpTestingController.expectOne(`${environment.url_api}/categories/${id}`);
    expect(req.request.method).toBe('DELETE');
  });

  it('should delete use the right url', () => {
    const id = 1;
    service.delete(id).subscribe();
    const req = httpTestingController.expectOne(`${environment.url_api}/categories/${id}`);
    expect(req.request.url).toBe(`${environment.url_api}/categories/${id}`);
  });

  it('should delete return the right data', () => {
    const mockData = categories[0];
    const id = 1;
    service.delete(id).subscribe(data => {
      expect(data).toEqual(mockData);
    });
    const req = httpTestingController.expectOne(`${environment.url_api}/categories/${id}`);
    req.flush(mockData);
  });

  it('should handleError', () => {
    const mock404Error = {
      status: 404
    };
    const handleError$ = (<any>service).handleError(mock404Error);
    const expected$ = cold('#', undefined, mock404Error);
    expect(handleError$).toBeObservable(expected$);
  });
});
