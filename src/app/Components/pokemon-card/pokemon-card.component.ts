import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon-service.service';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent implements OnInit {
  @Input() id:Number = 0
  pokemon:Pokemon | null = null
  constructor(private _pokemonService: PokemonService){}
  ngOnInit(): void {
      this._pokemonService.getPokemonById(this.id).subscribe( pokemon => this.pokemon = pokemon )
  }
}
