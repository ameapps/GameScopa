import { Injectable } from '@angular/core';
import { MockCardsProviderService } from '../provider/mock-cards-provider/mock-cards-provider.service';

@Injectable({
  providedIn: 'root',
})
export class TestsService {
  constructor(private mock_cards_provider: MockCardsProviderService) {}

  //#region methods

  /**Metodo di test per ottenere carte fissate in modo da poter eseguire test sulle combinazioni */
  public getGameCardsWithCombinations(): any {
    try {
      const combinations =
        this.mock_cards_provider.getGameCardsWithCombinations();

      return combinations;
    } catch (error) {
      console.error('Could not get cards with combination for test purposes');
    }
  }

  // #endregion
}
