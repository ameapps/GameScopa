import { Component, Input, OnInit } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common/common.service';

@Component({
  selector: 'app-scopa-card',
  templateUrl: './scopa-card.component.html',
  styleUrls: ['./scopa-card.component.scss'],
})
export class ScopaCardComponent  implements OnInit {

  //#region variables 
  @Input() canHover = false;

  public get can_show_drag_and_drop_tooltip(): boolean {
    return this.common.appConfig.game_settings.can_show_drag_and_drop_tooltip;
  }

  @Input() imgPath = ''; //TODO: aggiungere no card image
  //TODO: aggiungere config carta

  // #endregion

  constructor(private common: CommonService) { }

  ngOnInit() {}

}
