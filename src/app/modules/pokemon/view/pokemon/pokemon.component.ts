import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pokemon, SmallPokemon } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
  id:Number = 0
  relatedPokemonList: SmallPokemon[] = []
  constructor( private _route: ActivatedRoute){}

  ngOnInit(): void {
      this._route.params.subscribe( params => this.id = Number(params['id']))
  }

  public reciveRelatedPokemon($event:SmallPokemon[]){
    this.relatedPokemonList = $event
  }
}
