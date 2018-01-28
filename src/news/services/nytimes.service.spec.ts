import { inject, TestBed } from '@angular/core/testing';

import { NYTimeService } from './nytime.service';

describe('NYTimeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NYTimeService]
    });
  });

  it('should be created', inject([NYTimeService], (service: NYTimeService) => {
    expect(service).toBeTruthy();
  }));
});
