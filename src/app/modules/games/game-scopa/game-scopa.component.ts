import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { GameService } from 'src/app/shared/services/game/game.service';

@Component({
  selector: 'app-game-scopa',
  templateUrl: './game-scopa.component.html',
  styleUrls: ['./game-scopa.component.scss'],
})
export class GameScopaComponent implements OnInit {
  constructor(public game_service: GameService, public common: CommonService) {}

  ngOnInit() {
    //1. Inizializzo le carte del gioco secondo le impostazioni definite
    this.getGameCards();
  }

  private getGameCards() {
    this.game_service.startGame(this.common.currentActiveGame);
    this.game_service.tableCards = this.game_service.getTableCards(
      this.common.currentActiveGame
    );
    this.game_service.playerCards = this.game_service.getPlayerCards(
      this.common.currentActiveGame
    );
  }

  shuffleCards() {
    this.getGameCards();
  }

  // #region drag and drop
  onDragStart(event: DragEvent, cardIndex: number) {
    // Salviamo l'indice della carta trascinata nei dati del drag event
    event.dataTransfer?.setData('text/plain', cardIndex.toString());
  }

  allowDrop(event: DragEvent) {
    // Previene il comportamento predefinito per abilitare il drop
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    // Recuperiamo l'indice della carta trascinata
    event.preventDefault();
    const cardIndex = event.dataTransfer?.getData('text/plain');
    if (cardIndex !== null) {
      // Convertiamo l'indice in numero
      const index = parseInt(cardIndex ?? '-1', 10);
      // Rimuoviamo la carta dall'array delle carte del giocatore
      const card = this.game_service.playerCards.splice(index, 1)[0];
      // Aggiungiamo la carta all'array delle carte sul tavolo
      this.game_service.tableCards.push(card);
    }
  }

  //#endregion
}
