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

  public getPlayerCards(currentActiveGame: DefaultConfigHomeGames): Card[] {
    try {
      let cards: Card[] = [];
      console.log('currentActiveGame', currentActiveGame);
      if (this.common.canUseMockData) {
        //1. Assegnamento carte mock al giocatore 1
        cards = this.mock_cards_provider.player_a_hand_cards =
          this.mock_cards_provider.getPlayerCards(currentActiveGame, {
            tableCards: this.tableCards,
            playerCards: this.playerCards,
          });
        //2. Assegnamento carte mock al giocatore 2
        this.mock_cards_provider.player_b_hand_cards =
          this.mock_cards_provider.getPlayerCards(currentActiveGame, {
            tableCards: this.tableCards,
            playerCards: this.playerCards,
          });
      }

      return cards;
    } catch (error) {
      console.error(
        'Could not init the PLAYER game cards using the specified settings'
      );
      return [];
    }
  }

  public startGame(currentActiveGame: DefaultConfigHomeGames) {
    try {
      let cards: Card[] = [];
      console.log('currentActiveGame', currentActiveGame);
      if (this.common.canUseMockData)
        this.mock_cards_provider.allCards =
          this.mock_cards_provider.startGame(currentActiveGame);
      //TODO: sviluppare la parte filebase
      return [];
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
  public getTableCards(currentActiveGame: DefaultConfigHomeGames): Card[] {
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

  /**Metodo che richiede al BE di aggiungere una carta al tavolo  */
  public addCardsOnTable(cards: Card | undefined) {
    if (cards == null) {
      console.error('Cannot add null card on table');
      return;
    }
    this.tableCards = this.mock_cards_provider.addCardOnTable([cards]);
  }

  /**Metodo che richiede al BE di rimuovere una carta dal tavolo */
  public removePlayerCard(card: Card | undefined) {
    if (card == null) {
      console.error('Cannot add null card on table');
      return;
    }
    this.playerCards = this.mock_cards_provider.removePlayerCard([card]);
  }

  public removeCardsFromTable(cards: Card[]) {
    if (cards == null) {
      console.error('Cannot remove null cards from table');
      return;
    }
    this.tableCards = this.mock_cards_provider.removeCardsFromTable(cards);
  }

  /**Metodo per aggiornare sul BE le carte che l'utente ha recuperato dal tavolo in totale */
  public updateUserWonCards(playerWonCards: Card[]): void {
    try {
      this.mock_cards_provider.updatePlayerWonCards(playerWonCards);
    } catch (error) {
      console.error('Could not update the user cards');
    }
  }
}
