import { TestBed } from '@angular/core/testing';

import { MoveLogsService } from './move-logs.service';

describe('MoveLogsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MoveLogsService = TestBed.get(MoveLogsService);
    expect(service).toBeTruthy();
  });
});
