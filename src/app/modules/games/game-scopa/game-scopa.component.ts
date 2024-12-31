import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { GameService } from 'src/app/shared/services/game/game.service';

@Component({
  selector: 'app-game-scopa',
  templateUrl: './game-scopa.component.html',
  styleUrls: ['./game-scopa.component.scss'],
})
export class GameScopaComponent implements OnInit {

  constructor(public game_service: GameService, public common: CommonService) { }

  ngOnInit() {
    //1. Inizializzo le carte del gioco secondo le impostazioni definite
    this.getGameCards();
  }

  private getGameCards() {
    this.game_service.startGame(this.common.currentActiveGame);
    this.game_service.tableCards = this.game_service.getTableCards(this.common.currentActiveGame);
    this.game_service.playerCards = this.game_service.getPlayerCards(this.common.currentActiveGame);
  }

  shuffleCards() {
    this.getGameCards();
  }

}
