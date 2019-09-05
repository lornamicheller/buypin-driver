import { TestBed } from '@angular/core/testing';

import { BuypindriverService } from './buypindriver.service';

describe('BuypindriverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BuypindriverService = TestBed.get(BuypindriverService);
    expect(service).toBeTruthy();
  });
});
