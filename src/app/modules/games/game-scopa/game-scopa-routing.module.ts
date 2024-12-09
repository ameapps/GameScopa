import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameScopaComponent } from './game-scopa.component';
import { GamesComponent } from '../games.component';

const routes: Routes = [
  { path: 'scopa', component: GameScopaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameScopaRoutingModule {}
