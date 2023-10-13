import { TestBed } from '@angular/core/testing';

import { ScanbotService } from './scanbot.service';

describe('ScanbotService', () => {
  let service: ScanbotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScanbotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
