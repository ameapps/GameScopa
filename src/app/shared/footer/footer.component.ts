import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  constructor(public common: CommonService, private router: Router) { }

  ngOnInit() {}

  onStoreClick() {
    console.log('Store button clicked!');
    // Aggiungi qui la logica per gestire il clic sul pulsante Store
    this.router.navigate(['/', 'store']);
  }

  onFriendsClick() {
    console.log('Friends button clicked!');
    // Aggiungi qui la logica per gestire il clic sul pulsante Friends
    this.router.navigate(['/', 'friends']);
  }

  onStreetFoodClick() {
    console.log('Street Food button clicked!');
    // Aggiungi qui la logica per gestire il clic sul pulsante Street Foods
    this.router.navigate(['/', 'street-foods']);
  }

  onHomeClick() {
    console.log('Street Food button clicked!');
    // Aggiungi qui la logica per gestire il clic sul pulsante Street Foods
    this.router.navigate(['/', 'home']);
  }

  onMiniGamesClick() {
    console.log('Mini Games button clicked!');
    // Aggiungi qui la logica per gestire il clic sul pulsante Mini Games
    this.router.navigate(['/', 'mini-games']);
  }
}
