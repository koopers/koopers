import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '@environments/environment';
import { customSites, sites } from '@utils/mocks/mocks';
import { cold } from 'jasmine-marbles';
import { SitesService } from './sites.service';

describe('SitesService', () => {
  let httpTestingController: HttpTestingController;
  let service: SitesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SitesService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(SitesService);
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
    const req = httpTestingController.expectOne(`${environment.url_api}/sites/`);
    expect(req.request.method).toBe('GET');
  });

  it('should getAll use the right url', () => {
    service.getAll().subscribe();
    const req = httpTestingController.expectOne(`${environment.url_api}/sites/`);
    expect(req.request.url).toBe(`${environment.url_api}/sites/`);
  });

  it('should getAll return the right data', () => {
    const mockData = sites;
    service.getAll().subscribe(data => {
      expect(data).toEqual(mockData);
    });
    const req = httpTestingController.expectOne(`${environment.url_api}/sites/`);
    req.flush(mockData);
  });

  it('should getCustomSites call get', () => {
    service.getCustomSites().subscribe();
    const req = httpTestingController.expectOne(`${environment.url_api}/custom-sites/`);
    expect(req.request.method).toBe('GET');
  });

  it('should getCustomSites use the right url', () => {
    service.getCustomSites().subscribe();
    const req = httpTestingController.expectOne(`${environment.url_api}/custom-sites/`);
    expect(req.request.url).toBe(`${environment.url_api}/custom-sites/`);
  });

  it('should getCustomSites return the right data', () => {
    const mockData = customSites;
    service.getCustomSites().subscribe(data => {
      expect(data).toEqual(mockData);
    });
    const req = httpTestingController.expectOne(`${environment.url_api}/custom-sites/`);
    req.flush(mockData);
  });

  it('should getOneWithDetails return the right data', () => {
    const id = 1;
    service.getOneWithDetails(id).subscribe();
    const req = httpTestingController.expectOne(`${environment.url_api}/site-details/${id}`);
    expect(req.request.method).toBe(`GET`);
  });

  it('should getOneWithDetails use the right url', () => {
    const id = 1;
    service.getOneWithDetails(id).subscribe();
    const req = httpTestingController.expectOne(`${environment.url_api}/site-details/${id}`);
    expect(req.request.url).toBe(`${environment.url_api}/site-details/${id}`);
  });

  it('should create call post', () => {
    const body = {title: 'Test', url: 'test.com', Available: true};
    service.create(body).subscribe();
    const req = httpTestingController.expectOne(`${environment.url_api}/sites/`);
    expect(req.request.method).toBe('POST');
  });

  it('should create use the right url', () => {
    const body = {title: 'Test', url: 'test.com', Available: true};
    service.create(body).subscribe();
    const req = httpTestingController.expectOne(`${environment.url_api}/sites/`);
    expect(req.request.url).toBe(`${environment.url_api}/sites/`);
  });

  it('should create return the right data', () => {
    const mockData = sites[0];
    const body = {title: 'Test', url: 'test.com', Available: true};
    service.create(body).subscribe(data => {
      expect(data).toEqual(mockData);
    });
    const req = httpTestingController.expectOne(`${environment.url_api}/sites/`);
    req.flush(mockData);
  });

  it('should getOne call get', () => {
    const id = 1;
    service.getOne(id).subscribe();
    const req = httpTestingController.expectOne(`${environment.url_api}/sites/${id}`);
    expect(req.request.method).toBe('GET');
  });

  it('should getOne use the right url', () => {
    const id = 1;
    service.getOne(id).subscribe();
    const req = httpTestingController.expectOne(`${environment.url_api}/sites/${id}`);
    expect(req.request.url).toBe(`${environment.url_api}/sites/${id}`);
  });

  it('should getOne return the right data', () => {
    const mockData = sites[0];
    const id = 1;
    service.getOne(id).subscribe(data => {
      expect(data).toEqual(mockData);
    });
    const req = httpTestingController.expectOne(`${environment.url_api}/sites/${id}`);
    req.flush(mockData);
  });

  it('should update call put', () => {
    const id = 1;
    const body = {title: 'Test', url: 'test.com', Available: true};
    service.update(id, body).subscribe();
    const req = httpTestingController.expectOne(`${environment.url_api}/sites/${id}`);
    expect(req.request.method).toBe('PUT');
  });

  it('should update use the right url', () => {
    const id = 1;
    const body = {title: 'Test', url: 'test.com', Available: true};
    service.update(id, body).subscribe();
    const req = httpTestingController.expectOne(`${environment.url_api}/sites/${id}`);
    expect(req.request.url).toBe(`${environment.url_api}/sites/${id}`);
  });

  it('should update return the right data', () => {
    const mockData = sites[0];
    const id = 1;
    const body = {title: 'Test', url: 'test.com', Available: true};
    service.update(id, body).subscribe(data => {
      expect(data).toEqual(mockData);
    });
    const req = httpTestingController.expectOne(`${environment.url_api}/sites/${id}`);
    req.flush(mockData);
  });

  it('should delete call delete', () => {
    const id = 1;
    service.delete(id).subscribe();
    const req = httpTestingController.expectOne(`${environment.url_api}/sites/${id}`);
    expect(req.request.method).toBe('DELETE');
  });

  it('should delete use the right url', () => {
    const id = 1;
    service.delete(id).subscribe();
    const req = httpTestingController.expectOne(`${environment.url_api}/sites/${id}`);
    expect(req.request.url).toBe(`${environment.url_api}/sites/${id}`);
  });

  it('should delete return the right data', () => {
    const mockData = sites[0];
    const id = 1;
    service.delete(id).subscribe(data => {
      expect(data).toEqual(mockData);
    });
    const req = httpTestingController.expectOne(`${environment.url_api}/sites/${id}`);
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
