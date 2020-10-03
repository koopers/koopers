import { TestBed } from '@angular/core/testing';
import { environment } from '@environments/environment';
import { ScreenshotsService } from './screenshots.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { screenshots } from '@utils/mocks/mocks';
import { cold } from 'jasmine-marbles';

describe('ScreenshotsService', () => {
  let httpTestingController: HttpTestingController;
  let service: ScreenshotsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScreenshotsService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ScreenshotsService);
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
    const req = httpTestingController.expectOne(`${environment.url_api}/screenshots/`);
    expect(req.request.method).toBe('GET');
  });

  it('should getAll use the right url', () => {
    service.getAll().subscribe();
    const req = httpTestingController.expectOne(`${environment.url_api}/screenshots/`);
    expect(req.request.url).toBe(`${environment.url_api}/screenshots/`);
  });

  it('should getAll return the right data', () => {
    const mockData = screenshots;
    service.getAll().subscribe(data => {
      expect(data).toEqual(mockData);
    });
    const req = httpTestingController.expectOne(`${environment.url_api}/screenshots/`);
    req.flush(mockData);
  });

  it('should getOne call get', () => {
    const id = 1;
    service.getOne(id).subscribe();
    const req = httpTestingController.expectOne(`${environment.url_api}/screenshots/${id}`);
    expect(req.request.method).toBe('GET');
  });

  it('should getOne use the right url', () => {
    const id = 1;
    service.getOne(id).subscribe();
    const req = httpTestingController.expectOne(`${environment.url_api}/screenshots/${id}`);
    expect(req.request.url).toBe(`${environment.url_api}/screenshots/${id}`);
  });

  it('should getOne return the right data', () => {
    const mockData = screenshots[0];
    const id = 1;
    service.getOne(id).subscribe(data => {
      expect(data).toEqual(mockData);
    });
    const req = httpTestingController.expectOne(`${environment.url_api}/screenshots/${id}`);
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
