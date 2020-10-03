import { TestBed } from '@angular/core/testing';

import { SitesService } from './sites.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

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
});
