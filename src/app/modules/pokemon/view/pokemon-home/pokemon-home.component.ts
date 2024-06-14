import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs';
import { Pokemon, Result, SmallPokemon, Type } from 'src/app/models/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon-service.service';
@Component({
  selector: 'app-pokemon-home',
  templateUrl: './pokemon-home.component.html',
  styleUrls: ['./pokemon-home.component.css']
})
export class PokemonHomeComponent implements OnInit {
  result?: Result
  resultSearch: boolean = true
  currentPage: number = 1
  resultsCount: number = 20
  offset:number = 0
  limit:number = 20
  count:number = 0
  pokemonList: SmallPokemon[] = []
  pokemonListTemp: SmallPokemon[] = []
  types: any[] = []
  constructor(private _pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.pokemonList = this._pokemonService.pokemonList
    this.types = this._pokemonService.pokemonTypes
    this.count = this._pokemonService.count
    if( this.pokemonList.length === 0 || this.types.length === 0 ){
      this.getPokemonList()
      this.getAllTypes()
    }

  }

  public getPokemonList(){
    const res = this._pokemonService.getAllPokemon(this.offset, this.limit).subscribe(res => {
      this.result = res
      const { count } = res
      this.count = count
      this.pokemonList = []
      this.result.results.forEach( (item, index) => {
        this._pokemonService.getPokemonDetail(item.url).subscribe(pokemon =>{
          this.pokemonList.push(pokemon)
        })
      });
    })
  }

  public getNextPage(){

    this.offset = this.offset + 20
    this.currentPage++
    this.getPokemonList()
    this.resultsCount += 20
  }

  public getPreviousPage(){
    this.offset = (this.offset <= 0 )? 0 : this.offset - 20
    this.currentPage--
    this.getPokemonList()
    this.resultsCount -= 20
  }

  public recibePokemonName($event:string):string{
    if($event.length < 3 || $event === ''){
      this.resultSearch = true
      this.pokemonList = this.pokemonListTemp
      return ''
    }
    if($event.length >= 3){
      this.pokemonList = []
      this._pokemonService.getPokemonByName($event)
      .subscribe({
        next: pokemon =>{
          // this.pokemonList.push(pokemon)
          this.resultSearch = true
        },
        error:(error:any)=> this.resultSearch = false
      })
      return ''
    }
    return ''
  }

  public getAllTypes(){
  this._pokemonService.getPokemonType().subscribe(type => this.types = type)
  }
}
