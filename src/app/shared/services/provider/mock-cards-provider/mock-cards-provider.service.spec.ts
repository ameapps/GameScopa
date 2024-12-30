import { TestBed } from '@angular/core/testing';

import { MockCardsProviderService } from './mock-cards-provider.service';

describe('MockCardsProviderService', () => {
  let service: MockCardsProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockCardsProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
