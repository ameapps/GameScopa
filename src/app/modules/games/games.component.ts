import { Component, OnInit } from '@angular/core';
import { DefaultConfigHomeGames } from 'src/app/shared/models/defaultConfig';
import { CommonService } from 'src/app/shared/services/common/common.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent implements OnInit {

  //#region variables

  public get games(): DefaultConfigHomeGames[] {
    return this.common.appConfig.games ?? [];
  }

  //#endregion

  constructor(public common: CommonService) { }

  ngOnInit() {
    console.log(this.games)
  }

  public onClickedGame(game: DefaultConfigHomeGames, index: number) {
    this.common.currentActiveGame = game;
  }

}
