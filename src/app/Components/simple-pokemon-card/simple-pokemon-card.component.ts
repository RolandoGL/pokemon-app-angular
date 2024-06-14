import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Pokemon, SmallPokemon } from 'src/app/models/pokemon.model';
import { PokemonImageDirective } from 'src/app/directives/pokemon-image.directive';

@Component({
  selector: 'app-simple-pokemon-card',
  standalone: true,
  imports: [CommonModule, PokemonImageDirective],
  templateUrl: './simple-pokemon-card.component.html',
  styleUrls: ['./simple-pokemon-card.component.css']
})
export class SimplePokemonCardComponent {
  @Input() pokemon: SmallPokemon | null = null
  constructor(private router: Router) {}

  navigateTo(id:number|undefined){
    this.router.navigate(['/pokemon', id])
  }
}
