import { TestBed } from '@angular/core/testing';

import { ScreenshotsService } from './screenshots.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

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
});
