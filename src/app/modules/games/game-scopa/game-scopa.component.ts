import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/shared/services/game/game.service';

@Component({
  selector: 'app-game-scopa',
  templateUrl: './game-scopa.component.html',
  styleUrls: ['./game-scopa.component.scss'],
})
export class GameScopaComponent  implements OnInit {

  constructor(private game_service: GameService) { }

  ngOnInit() {}

}
