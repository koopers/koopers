import { TestBed } from '@angular/core/testing';

import { ScreenshotsService } from './screenshots.service';

describe('ScreenshotsService', () => {
  let service: ScreenshotsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScreenshotsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
