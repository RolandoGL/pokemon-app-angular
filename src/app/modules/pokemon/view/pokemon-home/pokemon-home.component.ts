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
  isLoading: boolean = false
  currentPage: number = 1
  resultsCount: number = 20
  offset:number = 20
  limit:number = 20
  count:number = 0
  pokemonList: SmallPokemon[] = []
  pokemonListTemp: SmallPokemon[] = []
  types: any[] = []
  history: string[] = []
  constructor(private _pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.pokemonList = this._pokemonService.pokemonList
    this.types = this._pokemonService.pokemonTypes
    this.count = this._pokemonService.count
    this.currentPage =  this._pokemonService.currentPage
    this.offset = this._pokemonService.offset
    this.history = this._pokemonService.history

    if( this.pokemonList.length === 0 || this.types.length === 0 ){
      this.getPokemonList()
      this.getAllTypes()
    }

  }

  public getPokemonList(){
    this.isLoading = true
    // this.currentPage = this.currentPage + 1
    // console.log(this.offset)
    const res = this._pokemonService.getAllPokemon(this.offset, this.limit, this.currentPage ).subscribe(res => {
      this.result = res
      const { count } = res
      this.count = count
      this.pokemonList = []
      this.result.results.forEach( (item, index) => {
        this._pokemonService.getPokemonDetail(item.url).subscribe(pokemon =>{
          this.pokemonList.push(pokemon)
        })
      });
      this.isLoading = false
    })
  }

  public getNextPage(){

    this.offset = this.offset + 20
    this.currentPage++
    this.getPokemonList()
    // this.resultsCount += this.offset
  }

  public getPreviousPage(){
    this.offset = (this.offset <= 0 )? 0 : this.offset - 20
    this.currentPage--
    this.getPokemonList()
    // this.resultsCount -= 20
  }

  public recibePokemonName($event:string):string{
    if( $event.trim() === "" ) {
      this.pokemonList = this._pokemonService.pokemonList
      return ''
    }
    this.resultSearch = false
    this.pokemonList = []
    this._pokemonService.getPokemonByName($event)
    .subscribe({
      next: pokemon =>{
        this.pokemonList.push(pokemon)
        this.resultSearch = true
      },
      error:(error:any)=>{
        this.resultSearch = false
        this.pokemonList = this._pokemonService.pokemonList
        setTimeout( () => this.resultSearch = true, 1000);
      }
    })
    return ''
  }

  public reciveItem(term: string ):void{
    this.pokemonList = []
    this.isLoading = true
    this._pokemonService.getPokemonByName(term)
    .subscribe({
      next: pokemon =>{
        this.pokemonList.push(pokemon)
        this.isLoading = false
      },
      error:(error:any)=> {
        this.resultSearch = false
        this.isLoading = false
        this.pokemonList = this._pokemonService.pokemonList
        setTimeout( () => this.resultSearch = true, 1000);
      }
    })
  }

  public getAllTypes(){
  this._pokemonService.getPokemonType().subscribe(type => this.types = type)
  }


}
