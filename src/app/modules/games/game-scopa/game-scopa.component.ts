import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/shared/models/card';
import { CardsCombinationService } from 'src/app/shared/services/combinations/cards-combination.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { GameService } from 'src/app/shared/services/game/game.service';

@Component({
  selector: 'app-game-scopa',
  templateUrl: './game-scopa.component.html',
  styleUrls: ['./game-scopa.component.scss'],
})
export class GameScopaComponent implements OnInit {
  constructor(
    public game_service: GameService,
    private cards_comb: CardsCombinationService,
    public common: CommonService
  ) {}

  ngOnInit() {
    //1. Inizializzo le carte del gioco secondo le impostazioni definite
    this.getGameCards();
  }

  /**Metodo che consente di inizializzare il gioco, assegnando carte sia al giocatore che al tavolo */
  private getGameCards(): void {
    this.game_service.startGame(this.common.currentActiveGame);
    this.game_service.tableCards = this.game_service.getTableCards(
      this.common.currentActiveGame
    );
    this.game_service.playerCards = this.game_service.getPlayerCards(
      this.common.currentActiveGame
    );
  }

  /**Metodo per mischiare le carte */
  shuffleCards(): void {
    this.getGameCards();
  }

  // #region drag and drop
  onDragStart(event: DragEvent, cardIndex: number): void {
    // Salviamo l'indice della carta trascinata nei dati del drag event
    event.dataTransfer?.setData('text/plain', cardIndex.toString());
  }

  allowDrop(event: DragEvent): void {
    // Previene il comportamento predefinito per abilitare il drop
    event.preventDefault();
  }

  onDrop(event: DragEvent): void {
    // Recuperiamo l'indice testuale della carta trascinata
    event.preventDefault();
    const sPlayerCardIndex = event.dataTransfer?.getData('text/plain');
    if (sPlayerCardIndex !== null) {
      // Convertiamo l'indice in numero
      const playerCardIndex = parseInt(sPlayerCardIndex ?? '-1', 10);
      if (this.canGetTableCards(playerCardIndex))
        this.addCardOnTable(playerCardIndex);
    }
  }

  /**Metodo che calcola se, dopo che il giocatore ha messo
   * una carta sul tavolo, può prendere carte o no */
  canGetTableCards(playerCardIndex: number): boolean {
    try {
      const playerCard = this.getCardByIndex(playerCardIndex);
      //1. Cerco se nel tavolo ci sono carte aventi lo stesso valore di quella buttata dal giocatore
      const sameValueCardFound = this.game_service.tableCards.filter(
        (row) => row.value === playerCard?.value
      );
      console.log('same cards values', sameValueCardFound);
      if (sameValueCardFound.length > 0) return true;
      //2. Cerco esiste una combinazione di carte la cui somma dia il valore della carta dell'utente
      const combinations = this.cards_comb.getCombinations(
        this.game_service.tableCards,
        playerCard?.value ?? -1
      );
      console.log('cards combinations', combinations);
      return false;
    } catch (error) {
      console.error(
        'Could not decide if it is possible or not to get card from the table'
      );
      return false;
    }
  }

  /**Metodo che recupera la carta usando il suo indice */
  getCardByIndex(cardIndex: number): Card | undefined {
    if (cardIndex < 0) {
      console.error('Cannot get card when its index is < 0');
      return undefined;
    }
    if (cardIndex > 40) {
      console.error('Cannot get card when its index is > 40');
      return undefined;
    }
    if (cardIndex == null) {
      console.error('Cannot get card when its index is null');
      return undefined;
    }
    return this.game_service.playerCards[cardIndex];
  }

  /**Metodo che permette di aggiungere la carta del giocatore sul tavolo,
   * il cui indice è passato come parametro  */
  private addCardOnTable(cardIndex: number): void {
    try {
      const card = this.game_service.playerCards.splice(cardIndex, 1)[0];
      // Aggiungiamo la carta all'array delle carte sul tavolo
      this.game_service.tableCards.push(card);
    } catch (error) {
      console.error('Could not add the card on the table');
    }
  }
  //#endregion
}
