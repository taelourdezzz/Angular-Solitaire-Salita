import { TestBed } from '@angular/core/testing';

import { MoveValidationService } from './move-validation.service';

describe('MoveValidationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MoveValidationService = TestBed.get(MoveValidationService);
    expect(service).toBeTruthy();
  });
});
