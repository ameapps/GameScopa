import { Component, Input, OnInit } from '@angular/core';
import { PlayerObtainableCards } from 'src/app/shared/models/playerObtainableCards';

@Component({
  selector: 'app-card-choose',
  templateUrl: './card-choose.component.html',
  styleUrls: ['./card-choose.component.scss'],
})
export class CardChooseComponent  implements OnInit {

  //#region variables 

  @Input() obtainableCards?: PlayerObtainableCards;

  //#endregion

  constructor() { }

  ngOnInit() {}

}
