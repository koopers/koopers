import { TestBed } from '@angular/core/testing';
import { environment } from '../../../../environments/environment';
import { FiltersService } from './filters.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { cold } from 'jasmine-marbles';

describe('FiltersService', () => {
  let httpTestingController: HttpTestingController;
  let service: FiltersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FiltersService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(FiltersService);
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

  // it('should filterBySites call get', () => {
  //   const siteId = '1';
  //   service.filterBySites(siteId).subscribe();
  //   const req = httpTestingController.expectOne(`${environment.url_api}/search/?site_id=${siteId}`);
  //   expect(req.request.method).toBe('GET');
  // });

  // it('should filterBySites use the right url', () => {
  //   const siteId = '1';
  //   service.filterBySites(siteId).subscribe();
  //   const req = httpTestingController.expectOne(`${environment.url_api}/search/?site_id=${siteId}`);
  //   expect(req.request.url).toBe(`${environment.url_api}/search/?site_id=${siteId}`);
  // });

  // it('should getAll return the right data', () => {
  //   const mockData = {result: []};
  //   const siteId = '1';
  //   service.filterBySites(siteId).subscribe(data => {
  //     expect(data).toEqual(mockData.result);
  //   });
  //   const req = httpTestingController.expectOne(`${environment.url_api}/search/?site_id=${siteId}`);
  //   req.flush(mockData);
  // });

  // it('should filterByDates call get', () => {
  //   const siteId = '1';
  //   const startDate = 123123;
  //   const endDate = 123124;
  //   service.filterByDates(siteId, startDate, endDate).subscribe();
  //   const req = httpTestingController.expectOne(`${environment.url_api}/search/?site_id=${siteId}&start_date=${startDate}&end_date=${endDate}`);
  //   expect(req.request.method).toBe('GET');
  // });

  // it('should filterByDates use the right url', () => {
  //   const siteId = '1';
  //   const startDate = 123123;
  //   const endDate = 123124;
  //   service.filterByDates(siteId, startDate, endDate).subscribe();
  //   const req = httpTestingController.expectOne(`${environment.url_api}/search/?site_id=${siteId}&start_date=${startDate}&end_date=${endDate}`);
  //   expect(req.request.url).toBe(`${environment.url_api}/search/?site_id=${siteId}&start_date=${startDate}&end_date=${endDate}`);
  // });

  // it('should filterByDates return the right data', () => {
  //   const mockData = {result: []};
  //   const siteId = '1';
  //   const startDate = 123123;
  //   const endDate = 123124;
  //   service.filterByDates(siteId, startDate, endDate).subscribe(data => {
  //     expect(data).toEqual(mockData.result);
  //   });
  //   const req = httpTestingController.expectOne(`${environment.url_api}/search/?site_id=${siteId}&start_date=${startDate}&end_date=${endDate}`);
  //   req.flush(mockData);
  // });

  // it('should filterByCategories call get', () => {
  //   const siteId = '1';
  //   const categories = '';
  //   service.filterByCategories(siteId, categories).subscribe();
  //   const req = httpTestingController.expectOne(`${environment.url_api}/search/?site_id=${siteId}&category_id=${categories}`);
  //   expect(req.request.method).toBe('GET');
  // });

  // it('should filterByCategories use the right url', () => {
  //   const siteId = '1';
  //   const categories = '';
  //   service.filterByCategories(siteId, categories).subscribe();
  //   const req = httpTestingController.expectOne(`${environment.url_api}/search/?site_id=${siteId}&category_id=${categories}`);
  //   expect(req.request.url).toBe(`${environment.url_api}/search/?site_id=${siteId}&category_id=${categories}`);
  // });

  // it('should filterByCategories return the right data', () => {
  //   const mockData = {result: []};
  //   const siteId = '1';
  //   const categories = '';
  //   service.filterByCategories(siteId, categories).subscribe(data => {
  //     expect(data).toEqual(mockData.result);
  //   });
  //   const req = httpTestingController.expectOne(`${environment.url_api}/search/?site_id=${siteId}&category_id=${categories}`);
  //   req.flush(mockData);
  // });

  // it('should filterByAll call get', () => {
  //   const siteId = '1';
  //   const categories = '';
  //   const startDate = 123123;
  //   const endDate = 123124;
  //   service.filterByAll(siteId, categories, startDate, endDate).subscribe();
  //   const req = httpTestingController.expectOne(`${environment.url_api}/search/?site_id=${siteId}&category_id=${categories}&start_date=${startDate}&end_date=${endDate}`);
  //   expect(req.request.method).toBe('GET');
  // });

  // it('should filterByAll use the right url', () => {
  //   const siteId = '1';
  //   const categories = '';
  //   const startDate = 123123;
  //   const endDate = 123124;
  //   service.filterByAll(siteId, categories, startDate, endDate).subscribe();
  //   const req = httpTestingController.expectOne(`${environment.url_api}/search/?site_id=${siteId}&category_id=${categories}&start_date=${startDate}&end_date=${endDate}`);
  //   expect(req.request.url).toBe(`${environment.url_api}/search/?site_id=${siteId}&category_id=${categories}&start_date=${startDate}&end_date=${endDate}`);
  // });

  // it('should filterByAll return the right data', () => {
  //   const mockData = {result: []};
  //   const siteId = '1';
  //   const categories = '';
  //   const startDate = 123123;
  //   const endDate = 123124;
  //   service.filterByAll(siteId, categories, startDate, endDate).subscribe(data => {
  //     expect(data).toEqual(mockData.result);
  //   });
  //   const req = httpTestingController.expectOne(`${environment.url_api}/search/?site_id=${siteId}&category_id=${categories}&start_date=${startDate}&end_date=${endDate}`);
  //   req.flush(mockData);
  // });

  it('should handleError', () => {
    const mock404Error = {
      status: 404
    };
    const handleError$ = (<any>service).handleError(mock404Error);
    const expected$ = cold('#', undefined, mock404Error);
    expect(handleError$).toBeObservable(expected$);
  });
});
