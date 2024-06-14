import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonGameRoutingModule } from './pokemon-game-routing.module';
import { PokemonGamePageComponent } from './views/pokemon-game-page/pokemon-game-page.component';


@NgModule({
  declarations: [
    PokemonGamePageComponent
  ],
  imports: [
    CommonModule,
    PokemonGameRoutingModule
  ]
})
export class PokemonGameModule { }
