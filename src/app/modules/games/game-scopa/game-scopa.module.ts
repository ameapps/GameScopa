import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameScopaRoutingModule } from './game-scopa-routing.module';
import { GameScopaComponent } from './game-scopa.component';
import { ScopaCardComponent } from './scopa-card/scopa-card.component';


@NgModule({
  declarations: [GameScopaComponent, ScopaCardComponent],
  imports: [
    CommonModule,
    GameScopaRoutingModule
  ]
})
export class GameScopaModule { }
