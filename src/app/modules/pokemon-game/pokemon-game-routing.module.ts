import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonGamePageComponent } from './views/pokemon-game-page/pokemon-game-page.component';

const routes: Routes = [
  {
    path:'',
    component:PokemonGamePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PokemonGameRoutingModule { }
