import {TestBed} from '@angular/core/testing';

import {SubgenreValidatorService} from './subgenre-validator.service';

describe('SubgenreValidatorService', () => {
  let service: SubgenreValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubgenreValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
