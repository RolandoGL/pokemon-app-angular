import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonRoutingModule } from './pokemon-routing.module';
import { PokemonHomeComponent } from './view/pokemon-home/pokemon-home.component';
import { SimplePokemonCardComponent } from 'src/app/Components/simple-pokemon-card/simple-pokemon-card.component';
import { PokemonCardComponent } from 'src/app/Components/pokemon-card/pokemon-card.component';
import { PokemonPageComponent } from './view/pokemon-page/pokemon-page.component';
import { PokemonComponent } from './view/pokemon/pokemon.component';
import { SearchBarComponent } from 'src/app/Components/search-bar/search-bar.component';
import { SelectComponent } from 'src/app/Components/select/select.component';


@NgModule({
  declarations: [
    PokemonHomeComponent,
    PokemonPageComponent,
    PokemonComponent
  ],
  imports: [
    CommonModule,
    PokemonRoutingModule,
    SimplePokemonCardComponent,
    PokemonCardComponent,
    SearchBarComponent,
    SelectComponent,
  ]
})
export class PokemonModule { }
