import { Component, Input, OnInit } from '@angular/core';
import { Combination } from 'src/app/shared/models/Combination';
import { PlayerObtainableCards } from 'src/app/shared/models/playerObtainableCards';
import { CommonService } from 'src/app/shared/services/common/common.service';

@Component({
  selector: 'app-card-choose',
  templateUrl: './card-choose.component.html',
  styleUrls: ['./card-choose.component.scss'],
})
export class CardChooseComponent implements OnInit {
  //#region variables

  @Input() obtainableCards?: PlayerObtainableCards;

  //#endregion

  constructor(private common: CommonService) {}

  //#region

  ngOnInit() {
    console.log('combinazioni possibli', this.obtainableCards?.combinations);
  }

  public onCombinationClick(choseonCombination: Combination): void {
    try {
      this.common.cardChooseEvent.emit(choseonCombination?.addends);
    } catch (error) {
      console.error('Could not process the chosen combination');
    }
  }

  //#endregion
}
