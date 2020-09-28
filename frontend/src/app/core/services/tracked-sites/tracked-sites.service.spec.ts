import { TestBed } from '@angular/core/testing';

import { TrackedSitesService } from './tracked-sites.service';

describe('TrackedSitesService', () => {
  let service: TrackedSitesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrackedSitesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
