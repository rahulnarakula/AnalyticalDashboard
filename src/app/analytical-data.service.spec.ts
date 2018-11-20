import { TestBed } from '@angular/core/testing';

import { AnalyticalDataService } from './analytical-data.service';

describe('AnalyticalDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnalyticalDataService = TestBed.get(AnalyticalDataService);
    expect(service).toBeTruthy();
  });
});
