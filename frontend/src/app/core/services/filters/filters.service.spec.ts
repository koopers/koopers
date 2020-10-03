import { TestBed } from '@angular/core/testing';

import { FiltersService } from './filters.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

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
});
