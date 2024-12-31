import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-scopa-card',
  templateUrl: './scopa-card.component.html',
  styleUrls: ['./scopa-card.component.scss'],
})
export class ScopaCardComponent  implements OnInit {

  //#region variables 
  @Input() canHover = false;

  @Input() imgPath = ''; //TODO: aggiungere no card image
  //TODO: aggiungere config carta

  // #endregion

  constructor() { }

  ngOnInit() {}

}
