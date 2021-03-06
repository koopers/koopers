import { TestBed } from '@angular/core/testing';
import { environment } from '../../../../environments/environment';
import { suggestedSites } from '@utils/mocks/mocks';
import { cold } from 'jasmine-marbles';
import { SuggestedSitesService } from './suggested-sites.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

describe('SuggestedSitesService', () => {
  let httpTestingController: HttpTestingController;
  let service: SuggestedSitesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SuggestedSitesService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(SuggestedSitesService);
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
    const req = httpTestingController.expectOne(`${environment.url_api}/suggested-sites/`);
    expect(req.request.method).toBe('GET');
  });

  it('should getAll use the right url', () => {
    service.getAll().subscribe();
    const req = httpTestingController.expectOne(`${environment.url_api}/suggested-sites/`);
    expect(req.request.url).toBe(`${environment.url_api}/suggested-sites/`);
  });

  it('should getAll return the right data', () => {
    const mockData = suggestedSites;
    service.getAll().subscribe(data => {
      expect(data).toEqual(mockData);
    });
    const req = httpTestingController.expectOne(`${environment.url_api}/suggested-sites/`);
    req.flush(mockData);
  });

  it('should create call post', () => {
    const body = {title: 'Test', url: 'test.com', categories: []};
    service.create(body).subscribe();
    const req = httpTestingController.expectOne(`${environment.url_api}/suggested-sites/`);
    expect(req.request.method).toBe('POST');
  });

  it('should create use the right url', () => {
    const body = {title: 'Test', url: 'test.com', categories: []};
    service.create(body).subscribe();
    const req = httpTestingController.expectOne(`${environment.url_api}/suggested-sites/`);
    expect(req.request.url).toBe(`${environment.url_api}/suggested-sites/`);
  });

  it('should create return the right data', () => {
    const mockData = suggestedSites[0];
    const body = {title: 'Test', url: 'test.com', categories: []};
    service.create(body).subscribe(data => {
      expect(data).toEqual(mockData);
    });
    const req = httpTestingController.expectOne(`${environment.url_api}/suggested-sites/`);
    req.flush(mockData);
  });

  it('should getOne call get', () => {
    const id = 1;
    service.getOne(id).subscribe();
    const req = httpTestingController.expectOne(`${environment.url_api}/suggested-sites/${id}`);
    expect(req.request.method).toBe('GET');
  });

  it('should getOne use the right url', () => {
    const id = 1;
    service.getOne(id).subscribe();
    const req = httpTestingController.expectOne(`${environment.url_api}/suggested-sites/${id}`);
    expect(req.request.url).toBe(`${environment.url_api}/suggested-sites/${id}`);
  });

  it('should getOne return the right data', () => {
    const mockData = suggestedSites[0];
    const id = 1;
    service.getOne(id).subscribe(data => {
      expect(data).toEqual(mockData);
    });
    const req = httpTestingController.expectOne(`${environment.url_api}/suggested-sites/${id}`);
    req.flush(mockData);
  });

  it('should update call put', () => {
    const id = 1;
    const body = {title: 'Test', url: 'test.com', categories: []};
    service.update(id, body).subscribe();
    const req = httpTestingController.expectOne(`${environment.url_api}/suggested-sites/${id}`);
    expect(req.request.method).toBe('PUT');
  });

  it('should update use the right url', () => {
    const id = 1;
    const body = {title: 'Test', url: 'test.com', categories: []};
    service.update(id, body).subscribe();
    const req = httpTestingController.expectOne(`${environment.url_api}/suggested-sites/${id}`);
    expect(req.request.url).toBe(`${environment.url_api}/suggested-sites/${id}`);
  });

  it('should update return the right data', () => {
    const mockData = suggestedSites[0];
    const id = 1;
    const body = {title: 'Test', url: 'test.com', categories: []};
    service.update(id, body).subscribe(data => {
      expect(data).toEqual(mockData);
    });
    const req = httpTestingController.expectOne(`${environment.url_api}/suggested-sites/${id}`);
    req.flush(mockData);
  });

  it('should delete call delete', () => {
    const id = 1;
    service.delete(id).subscribe();
    const req = httpTestingController.expectOne(`${environment.url_api}/suggested-sites/${id}`);
    expect(req.request.method).toBe('DELETE');
  });

  it('should delete use the right url', () => {
    const id = 1;
    service.delete(id).subscribe();
    const req = httpTestingController.expectOne(`${environment.url_api}/suggested-sites/${id}`);
    expect(req.request.url).toBe(`${environment.url_api}/suggested-sites/${id}`);
  });

  it('should delete return the right data', () => {
    const mockData = suggestedSites[0];
    const id = 1;
    service.delete(id).subscribe(data => {
      expect(data).toEqual(mockData);
    });
    const req = httpTestingController.expectOne(`${environment.url_api}/suggested-sites/${id}`);
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
