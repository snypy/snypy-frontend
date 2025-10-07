import { TestBed } from '@angular/core/testing';

import { LoadingScreenService } from './loading-screen.service';

describe('LoadingScreenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoadingScreenService = TestBed.inject(LoadingScreenService);
    expect(service).toBeTruthy();
  });
});
