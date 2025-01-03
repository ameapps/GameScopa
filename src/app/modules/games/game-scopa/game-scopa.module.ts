import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameScopaRoutingModule } from './game-scopa-routing.module';
import { GameScopaComponent } from './game-scopa.component';
import { ScopaCardComponent } from './scopa-card/scopa-card.component';
import { CardChooseComponent } from 'src/app/shared/components/dialogs/card-choice/card-choose/card-choose.component';


@NgModule({
  declarations: [GameScopaComponent, ScopaCardComponent, CardChooseComponent],
  imports: [
    CommonModule,
    GameScopaRoutingModule
  ]
})
export class GameScopaModule { }
