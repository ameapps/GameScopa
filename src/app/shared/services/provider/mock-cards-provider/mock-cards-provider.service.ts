import { Injectable } from '@angular/core';
import { Card } from 'src/app/shared/models/card';
import { DefaultConfigHomeGames } from 'src/app/shared/models/defaultConfig';

@Injectable({
  providedIn: 'root',
})
export class MockCardsProviderService {
  
  //#region  variables
  SCOPA_CARDS_NUMBER = 40;
  // #endregion

  constructor() {}

  //#region methods

  public initGameCards(
    currentActiveGame: DefaultConfigHomeGames,
    status?: GameStatus
  ): Card[] {
    try {
      //1. Se l'utente non ha carte, le creo tutte (la partita è appena iniziata)
      const cards: Card[] = this.createAllCards(currentActiveGame);
      console.log('all cards', currentActiveGame);

      return cards;
    } catch (error) {
      console.error(
        'Could not init the game cards using the specified settings'
      );
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

  public initTableCards(
    currentActiveGame: DefaultConfigHomeGames,
    status?: GameStatus
  ): Card[] {
    throw new Error('Method not implemented.');
  }

  public initPlayerCards(
    currentActiveGame: DefaultConfigHomeGames,
    status?: GameStatus
  ): Card[] {
    throw new Error('Method not implemented.');
  }

  // #endregion
}

export class GameStatus {
  cards: Card[] = [];
  tableCards: Card[] = [];
  playerCards: Card[] = [];
}
