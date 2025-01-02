import { Injectable } from '@angular/core';
import { shuffleArray } from 'src/app/shared/helpers/array.helper';
import { Card } from 'src/app/shared/models/card';
import { DefaultConfigHomeGames } from 'src/app/shared/models/defaultConfig';

@Injectable({
  providedIn: 'root',
})
/**Servizio che si comporta come da BE per l'applicazione. Il suo scopo è quello
 * di poter testare l'app.
 */
export class MockCardsProviderService {
  //#region  variables
  allCards: Card[] = [];
  tableCards: Card[] = [];
  player_a_cards: Card[] = [];
  player_b_cards: Card[] = [];
  SCOPA_CARDS_NUMBER = 40;
  // #endregion

  constructor() {}

  //#region methods

  /**Metodo che inizializza il gioco, compiendo le seguenti operazioni:
   * -  creando le carte nel BE con cui sarà svolta la partita
   */
  public startGame(currentActiveGame: DefaultConfigHomeGames): Card[] {
    try {
      this.allCards = this.createAllCards(currentActiveGame);
      //TODO: shaffle the cards : gli elementi dell'array devono essere rimescolati a caso
      const shaffled = shuffleArray(this.allCards) ?? this.allCards;
      return shaffled;
      console.error('Error initialing the game creating the new cards');
    } catch (error) {
      return [];
    }
  }

  private createAllCards(currentActiveGame: DefaultConfigHomeGames) {
    const cards: Card[] = [];
    //1. costuisco le carte
    for (let index = 0; index < this.SCOPA_CARDS_NUMBER; index++) {
      const group = currentActiveGame?.card?.group ?? 'siciliane';
      const extension = currentActiveGame?.card?.extension ?? 'png';
      const type = this.getCardType(index);
      const value = (index % 10) + 1;
      cards.push({
        group: group,
        extension: 'png',
        type: type ?? 'bastoni',
        value: value,
        path: this.buildCardPath(extension, group, type, value),
      });
    }
    return cards;
  }

  private buildCardPath(
    extension: string,
    group: string,
    type: string | undefined,
    value: number
  ): string {
    try {
      const path = `assets/cards/${extension}/${group}/${type}/${value}.${extension}`;
      return path;
    } catch (error) {
      console.error('Could not build the card path');
      return 'assets/GUI/home/no-card.svg';
    }
  }

  private getCardType(
    index: number
  ): 'bastoni' | 'coppe' | 'denari' | 'spade' | undefined {
    if (index <= 9) return 'bastoni';
    if (index <= 19) return 'coppe';
    if (index <= 29) return 'denari';
    if (index <= 39) return 'spade';
    return undefined;
  }

  /**Metodo che dalle 40 carte della scopa, recupera 4 carte da mettere sul tavolo.
   */
  public getTableCards(
    currentActiveGame: DefaultConfigHomeGames,
    status?: GameStatus
  ): Card[] {
    try {
      console.log('all cards', currentActiveGame);
      //1. Estraggo 4 carte dal mazzo
      let allCards = this.getAllGameCards(currentActiveGame);
      let tableCards = (this.tableCards = this.allCards.slice(-4));
      //2. Riduco il mazzp di 4 carte
      allCards.splice(-4);

      return tableCards;
    } catch (error) {
      console.error(
        'Could not init the game cards using the specified settings'
      );
      return [];
    }
  }

  private getAllGameCards(currentActiveGame: DefaultConfigHomeGames) {
    return this.allCards.length === 40
      ? this.allCards
      : this.createAllCards(currentActiveGame);
  }

  public getPlayerCards(
    currentActiveGame: DefaultConfigHomeGames,
    status?: GameStatus
  ): Card[] {
    try {
      //1. Estraggo 4 carte dal mazzo
      let allCards = this.getAllGameCards(currentActiveGame);
      let playerCards = this.allCards.slice(-3);
      //2. Riduco il mazzo di 4 carte
      allCards.splice(-3);
      console.log('player cards', playerCards);
      //3. TODO: salvare le carte in player_a o player_b a seconda del player che sta chiedendo le carte
      this.player_a_cards = playerCards;

      return playerCards;
    } catch (error) {
      console.error('Could not get the player cards', error);
      return [];
    }
  }

  /**Metodo per aggiungere la carta specificata al tavolo */
  public addCardOnTable(card: Card | undefined): Card[] {
    try {
      if (card == null) {
        console.error('Cannot add null card on the table');
        return [];
      }
      this.tableCards.push(card);
      return this.tableCards;
    } catch (error) {
      console.error('MockBE: could not add card on the table');
      return [];
    }
  }

  /**Metodo per rimuovere una carta dal mazzo del giocatore */
  public removePlayerCard(card: Card | undefined): Card[] {
    try {
      if (card == null) {
        console.error('Cannot add null card on the table');
        return [];
      }
      this.player_a_cards = this.player_a_cards.filter(
        (row) => row !== card
      );
      return this.player_a_cards;
    } catch (error) {
      console.error('MockBE: could not add card on the table');
      return [];
    }
  }

  // #endregion
}

export class GameStatus {
  tableCards: Card[] = [];
  playerCards: Card[] = [];
}
