import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:"pokemon",
    loadChildren: ()=> import('./modules/pokemon/pokemon.module').then(m => m.PokemonModule)
  },
  {
    path:'pokemon-game',
    loadChildren: ()=> import('./modules/pokemon-game/pokemon-game.module').then(m => m.PokemonGameModule)
  },
  {
    path:"**",
    redirectTo:"pokemon/home",
    pathMatch:'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
