import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonHomeComponent } from './view/pokemon-home/pokemon-home.component';
import { PokemonPageComponent } from './view/pokemon-page/pokemon-page.component';
import { PokemonComponent } from './view/pokemon/pokemon.component';

const routes: Routes = [
  {
    path:"",
    component: PokemonPageComponent,
    children:[
      {
        path:"home",
        component: PokemonHomeComponent
      },
      {
        path: ":id",
        component: PokemonComponent
      },
      {
        path:"**",
        redirectTo:"home",
        pathMatch:'full'
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PokemonRoutingModule { }
