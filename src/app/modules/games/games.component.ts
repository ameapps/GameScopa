import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DefaultConfigHomeGames } from 'src/app/shared/models/defaultConfig';
import { CommonService } from 'src/app/shared/services/common/common.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent implements OnInit {

  //#region variables

  public get canShowGamesSelector(): boolean {
    return this.common.currentActiveGame == null;
  }

  public get games(): DefaultConfigHomeGames[] {
    return this.common.appConfig.games ?? [];
  }

  //#endregion

  constructor(public common: CommonService, private router: Router) { }

  ngOnInit() {
    console.log(this.games)
  }

  public onClickedGame(game: DefaultConfigHomeGames, index: number) {
    this.common.currentActiveGame = game;
    this.router.navigate(['/', 'scopa']);
  }

}
