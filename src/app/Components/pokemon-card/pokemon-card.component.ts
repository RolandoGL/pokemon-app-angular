import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pokemon, SmallPokemon, Type } from 'src/app/models/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon-service.service';
import { PokemonImageDirective } from 'src/app/directives/pokemon-image.directive';
import { TypeColorSelectorDirective } from 'src/app/directives/type-color-selector.directive';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule, PokemonImageDirective, TypeColorSelectorDirective],
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent implements OnInit, OnChanges {
  @Input() id: Number = 0
  @Output() sendRelatedPokemon = new EventEmitter<SmallPokemon[]>()
  pokemon: SmallPokemon | null = null
  relatedPokemon: SmallPokemon[] = []
  debilities: any[] = []
  description: string = 'pokemon description'
  isLoading: boolean = false
  constructor(private _pokemonService: PokemonService) { }
  ngOnInit(): void {
    this.getPokemon(this.id)

  }

  ngOnChanges(changes: SimpleChanges): void {
    const {currentValue, previousValue} = changes['id']
    if(currentValue != previousValue) {
      this.sendRelatedPokemon.emit([])
      this.getPokemon(currentValue)

    }

  }
  public getPokemon(id: Number) {
    this.isLoading = true
    this._pokemonService.getPokemonById(id).subscribe(pokemon => {

      this.pokemon = pokemon
      this.getDescription(pokemon.id)
      this.getDebilities(pokemon.types)
       this.isLoading = false
    })
  }

  public getDescription(id: number) {
    this.description = ''
    this._pokemonService.getPokemonDescription(id).subscribe( pokemonDescription => this.description = this.createDescription( pokemonDescription ))
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

        for (let index = 0; index < 2; index++) {
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

  public createDescription( itemDescription: any ):string{
    if(!itemDescription) return 'Error 404: Description not found'
    return `
          ${this.pokemon!.name} has a base happiness of ${itemDescription!.base_happiness} and a capture rate of ${itemDescription!.capture_rate}%. Its
          natural habitat is in the '${itemDescription!.habitat? itemDescription!.habitat!.name: 'habitat not found'}'.
          ${itemDescription!.name} is ${itemDescription!.color.name} and jas the form ${itemDescription!.shape ? itemDescription!.shape.name : 'shape not found' }.
          Its growth rate is ${itemDescription!.growth_rate.name}. ${itemDescription!.flavor_text_entries[0].flavor_text}
        `
  }
}
