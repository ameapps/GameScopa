import { TestBed } from '@angular/core/testing';

import { CardsCombinationService } from './cards-combination.service';

describe('CardsCombinationService', () => {
  let service: CardsCombinationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardsCombinationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
