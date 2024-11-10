import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SteeetfoodsComponent } from './steeetfoods.component';

const routes: Routes = [
  {
    path: '',
    component: SteeetfoodsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StreetFoodsRoutingModule {}
