import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

describe('UsersService', () => {
  let httpTestingController: HttpTestingController;
  let service: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(UsersService);
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
