import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pokemon, Type } from 'src/app/models/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon-service.service';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent implements OnInit, OnChanges {
  @Input() id: Number = 0
  @Output() sendRelatedPokemon = new EventEmitter<Pokemon[]>()
  pokemon: Pokemon | null = null
  relatedPokemon: Pokemon[] = []
  debilities: any[] = []
  description: string = 'pokemon description'
  isLoading: boolean = false
  constructor(private _pokemonService: PokemonService) { }
  ngOnInit(): void {
    this.getPokemon(this.id)

  }

  ngOnChanges(changes: SimpleChanges): void {
    const {currentValue, previousValue} = changes['id']
    if(currentValue != previousValue) this.getPokemon(currentValue)
    
  }
  public getPokemon(id: Number) {
    this._pokemonService.getPokemonById(id).subscribe(pokemon => {
      this.isLoading = true
      this.pokemon = pokemon
      this.getDescription(pokemon.id)
      this.getDebilities(pokemon.types)
      this.isLoading = false
    })
  }

  public getDescription(id: number) {
    this.description = ''
    this._pokemonService.getPokemonDescription(id).subscribe({
      next: description1 => {
        this.description = `
                        ${this.pokemon?.name} has a base happiness of ${description1?.base_happiness} and a capture rate of ${description1?.capture_rate}%. Its
                        natural habitat is in the '${description1?.habitat?.name? description1?.habitat?.name: 'habitat not found'}'. ${description1?.name} is ${description1?.color.name} and jas the form ${description1?.shape.name}.
                        Its growth rate is ${description1?.growth_rate.name}. ${description1?.flavor_text_entries[0].flavor_text}
                          `
      },
      error: ()=> this.description = 'Description not found :('
    })
  }
  public getDebilities(types: Type[]) {
    
    let URLID: string = ''
    let randomIndex: number = 0
    types.forEach(type => {
      URLID = this.getTypeID(type)
      this._pokemonService.getDebilities(URLID).subscribe(debility => {
        this.debilities = []
        const { damage_relations, pokemon } = debility
        damage_relations.double_damage_from.forEach((damage: any) => this.debilities.push(damage))

        for (let index = 0; index < 3; index++) {
          randomIndex = Math.floor(Math.random() * pokemon.length)
          this.getRelatedPokemon(pokemon[randomIndex].pokemon.url)
        }
        this.sendRelatedPokemon.emit(this.relatedPokemon)
      })
    });
  }

  public getRelatedPokemon(url: string) {
    this.relatedPokemon = []
    this._pokemonService.getPokemonDetail(url).subscribe(pokemon => {
      this.relatedPokemon.push(pokemon)
    })
  }

  public getTypeID(type:Type){
    let splitURL = type.type.url.endsWith('/') ? type.type.url.slice(0, -1).split('/') : type.type.url
    let URLID = splitURL[splitURL.length - 1]
    return URLID
  }
}
