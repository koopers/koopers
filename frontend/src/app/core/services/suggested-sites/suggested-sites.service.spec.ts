import { TestBed } from '@angular/core/testing';

import { SuggestedSitesService } from './suggested-sites.service';

describe('SuggestedSitesService', () => {
  let service: SuggestedSitesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuggestedSitesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
