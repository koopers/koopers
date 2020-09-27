import { TestBed } from '@angular/core/testing';

import { ManteinerGuard } from './manteiner.guard';

describe('ManteinerGuard', () => {
  let guard: ManteinerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ManteinerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
