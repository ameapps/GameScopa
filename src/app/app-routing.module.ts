import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'friends',
    loadChildren: () =>
      import('./modules/friends/friends.module').then((m) => m.FriendsModule),
  },
  {
    path: 'store',
    loadChildren: () =>
      import('./modules/store/store.module').then((m) => m.StoreModule),
  },
  {
    path: 'street-foods',
    loadChildren: () =>
      import('./modules/street-foods/street-foods.module').then((m) => m.StreetFoodsModule),
  },
  {
    path: 'mini-games',
    loadChildren: () =>
      import('./modules/mini-games/mini-games.module').then((m) => m.MiniGamesModule),
  },
  {
    path: 'shared',
    loadChildren: () =>
      import('./shared/shared.module').then((m) => m.SharedModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true, preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
