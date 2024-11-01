import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common/common.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  constructor(public common: CommonService) { }

  ngOnInit() {}

  onStoreClick() {
    console.log('Store button clicked!');
    // Aggiungi qui la logica per gestire il clic sul pulsante Store
  }

  onFriendsClick() {
    console.log('Friends button clicked!');
    // Aggiungi qui la logica per gestire il clic sul pulsante Friends
  }

  onStreetFoodClick() {
    console.log('Street Food button clicked!');
    // Aggiungi qui la logica per gestire il clic sul pulsante Street Foods
  }

  onMiniGamesClick() {
    console.log('Mini Games button clicked!');
    // Aggiungi qui la logica per gestire il clic sul pulsante Mini Games
  }
}
