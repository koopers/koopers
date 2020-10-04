import { TestBed } from '@angular/core/testing';
import { environment } from '../../../../environments/environment';
import { users } from '@utils/mocks/mocks';
import { cold } from 'jasmine-marbles';
import { UsersService } from './users.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

describe('UsersService', () => {
  let httpTestingController: HttpTestingController;
  let service: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(UsersService);
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
    const req = httpTestingController.expectOne(`${environment.url_api}/users/`);
    expect(req.request.method).toBe('GET');
  });

  it('should getAll use the right url', () => {
    service.getAll().subscribe();
    const req = httpTestingController.expectOne(`${environment.url_api}/users/`);
    expect(req.request.url).toBe(`${environment.url_api}/users/`);
  });

  it('should getAll return the right data', () => {
    const mockData = users;
    service.getAll().subscribe(data => {
      expect(data).toEqual(mockData);
    });
    const req = httpTestingController.expectOne(`${environment.url_api}/users/`);
    req.flush(mockData);
  });

  it('should create call post', () => {
    const body = {username: 'Test', is_staff: true};
    service.create(body).subscribe();
    const req = httpTestingController.expectOne(`${environment.url_api}/auth/signup/`);
    expect(req.request.method).toBe('POST');
  });

  it('should create use the right url', () => {
    const body = {username: 'Test', is_staff: true};
    service.create(body).subscribe();
    const req = httpTestingController.expectOne(`${environment.url_api}/auth/signup/`);
    expect(req.request.url).toBe(`${environment.url_api}/auth/signup/`);
  });

  it('should create return the right data', () => {
    const mockData = users[0];
    const body = {username: 'Test', is_staff: true};
    service.create(body).subscribe(data => {
      expect(data).toEqual(mockData);
    });
    const req = httpTestingController.expectOne(`${environment.url_api}/auth/signup/`);
    req.flush(mockData);
  });

  it('should getOne call get', () => {
    const id = 1;
    service.getOne(id).subscribe();
    const req = httpTestingController.expectOne(`${environment.url_api}/users/${id}`);
    expect(req.request.method).toBe('GET');
  });

  it('should getOne use the right url', () => {
    const id = 1;
    service.getOne(id).subscribe();
    const req = httpTestingController.expectOne(`${environment.url_api}/users/${id}`);
    expect(req.request.url).toBe(`${environment.url_api}/users/${id}`);
  });

  it('should getOne return the right data', () => {
    const mockData = users[0];
    const id = 1;
    service.getOne(id).subscribe(data => {
      expect(data).toEqual(mockData);
    });
    const req = httpTestingController.expectOne(`${environment.url_api}/users/${id}`);
    req.flush(mockData);
  });

  it('should update call patch', () => {
    const id = 1;
    const body = {username: 'Test', is_staff: true};
    service.update(id, body).subscribe();
    const req = httpTestingController.expectOne(`${environment.url_api}/users/${id}`);
    expect(req.request.method).toBe('PATCH');
  });

  it('should update use the right url', () => {
    const id = 1;
    const body = {username: 'Test', is_staff: true};
    service.update(id, body).subscribe();
    const req = httpTestingController.expectOne(`${environment.url_api}/users/${id}`);
    expect(req.request.url).toBe(`${environment.url_api}/users/${id}`);
  });

  it('should update return the right data', () => {
    const mockData = users[0];
    const id = 1;
    const body = {username: 'Test', is_staff: true};
    service.update(id, body).subscribe(data => {
      expect(data).toEqual(mockData);
    });
    const req = httpTestingController.expectOne(`${environment.url_api}/users/${id}`);
    req.flush(mockData);
  });

  it('should delete call delete', () => {
    const id = 1;
    service.delete(id).subscribe();
    const req = httpTestingController.expectOne(`${environment.url_api}/users/${id}`);
    expect(req.request.method).toBe('DELETE');
  });

  it('should delete use the right url', () => {
    const id = 1;
    service.delete(id).subscribe();
    const req = httpTestingController.expectOne(`${environment.url_api}/users/${id}`);
    expect(req.request.url).toBe(`${environment.url_api}/users/${id}`);
  });

  it('should delete return the right data', () => {
    const mockData = users[0];
    const id = 1;
    service.delete(id).subscribe(data => {
      expect(data).toEqual(mockData);
    });
    const req = httpTestingController.expectOne(`${environment.url_api}/users/${id}`);
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
