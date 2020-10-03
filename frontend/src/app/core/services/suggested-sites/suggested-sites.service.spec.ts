import { TestBed } from '@angular/core/testing';

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
});
