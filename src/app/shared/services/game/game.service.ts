import { Injectable, OnInit, OnDestroy } from '@angular/core';
import {
  DefaultCardConfig,
  DefaultConfig,
  DefaultConfigHomeGames,
} from '../../models/defaultConfig';
import { Person } from '../../models/person';
import { Card } from '../../models/card';
import { MockCardsProviderService } from '../provider/mock-cards-provider/mock-cards-provider.service';
import { CommonService } from '../common/common.service';

@Injectable({
  providedIn: 'root',
})
export class GameService implements OnDestroy {
  // #region variables

  tableCards: Card[] = [];
  playerCards: Card[] = [];
  
  // #endregion

  constructor(
    private common: CommonService,
    private mock_cards_provider: MockCardsProviderService
  ) {}

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  initPlayerCards(currentActiveGame: DefaultConfigHomeGames): Card[] {
    try {
      let cards: Card[] = [];
      console.log('currentActiveGame', currentActiveGame);
      if (this.common.canUseMockData)
        cards = this.mock_cards_provider.initPlayerCards(currentActiveGame, {
          tableCards: this.tableCards,
          playerCards: this.playerCards,
        });

      return cards;
    } catch (error) {
      console.error(
        'Could not init the PLAYER game cards using the specified settings'
      );
      return [];
    }
  }

  /**
   * Metodo che recupera dal BE o dal provider dei dati mock le carte 
   * da visualizzare sul tavolo 
   * @param currentActiveGame impostazione del gioco corrente (json)
   * @returns 
   */
  initTableCards(currentActiveGame: DefaultConfigHomeGames): Card[] {
    try {
      let cards: Card[] = [];
      console.log('currentActiveGame', currentActiveGame);
      if (this.common.canUseMockData)
        cards = this.mock_cards_provider.getTableCards(currentActiveGame, {
          tableCards: this.tableCards,
          playerCards: this.playerCards,
        });

      return cards;
    } catch (error) {
      console.error(
        'Could not init the TABLE game cards using the specified settings'
      );
      return [];
    }
  }
}
