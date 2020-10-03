import { TestBed } from '@angular/core/testing';

import { TrackedSitesService } from './tracked-sites.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('TrackedSitesService', () => {
  let httpTestingController: HttpTestingController;
  let service: TrackedSitesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrackedSitesService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(TrackedSitesService);
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
