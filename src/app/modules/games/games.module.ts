import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesRoutingModule } from './games-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { GamesComponent } from './games.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { GameScopaModule } from './game-scopa/game-scopa.module';


@NgModule({
  declarations: [GamesComponent],
  imports: [
    CommonModule,
    GamesRoutingModule,
    IonicModule,
    CommonModule,
    FormsModule,
    SharedModule,
    GameScopaModule
  ]
})
export class GamesModule { }
