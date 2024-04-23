import { Component, OnInit } from '@angular/core';
import { Pokemon, Result } from 'src/app/models/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon-service.service';
@Component({
  selector: 'app-pokemon-home',
  templateUrl: './pokemon-home.component.html',
  styleUrls: ['./pokemon-home.component.css']
})
export class PokemonHomeComponent implements OnInit {
  result?: Result
  pokemonList: Pokemon[] = []
  constructor(private _pokemonService: PokemonService) { }

  ngOnInit(): void {
    const res = this._pokemonService.getAllPokemon().subscribe(res => {
      this.result = res

      this.result.results.forEach( (item, index) => {
        this._pokemonService.getPokemonDetail(item.url).subscribe(pokemon => this.pokemonList.push(pokemon))
      }
      );

    })
  }
}
