import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Pokemon, Result, SmallPokemon, Type } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private $baseURL:string = 'https://pokeapi.co/api/v2/'
  public pokemonList: SmallPokemon[] = []
  public pokemonTypes: [] = []
  public history: string[] = []
  public count: number = 1
  public currentPage: number = 1
  public offset: number = 20

  constructor( private _httpClient: HttpClient) {

    this.loadPokemonFromLocalStorage()
  }

  public getAllPokemon(offsetParam:number, limmit:number=20, page: number ):Observable<Result>{
    this.offset = offsetParam
    this.currentPage = page
    return this._httpClient.get<any>(this.$baseURL+`pokemon/?offset=${offsetParam-20}&limit=${limmit}`)
    .pipe(
      tap(pokemon => this.count = pokemon.count ),
      tap( ()=> this.pokemonList = []),
      delay(300),
    )
  }

  public getPokemonDetail(url:string):Observable<SmallPokemon>{
    return this._httpClient.get<Pokemon>(url)
    .pipe(
      map( pokemon => (
        {
          id      : pokemon.id,
          name    : pokemon.name,
          types   : pokemon.types,
          gifImage: pokemon?.sprites?.other?.showdown.front_default,
          image   : pokemon?.sprites?.other?.['official-artwork']?.front_default,
          stats   : pokemon.stats
        }
      )),
      tap( pokemon => this.pokemonList.push( pokemon ) ),
      tap( pokemon => this.pokemonList = this.pokemonList.slice(0,20) ),
      tap( () => this.savePokemonToLocalStorage() )
    )

  }

  public getPokemonById(id:Number):Observable<SmallPokemon>{
    return this._httpClient.get<Pokemon>(this.$baseURL+'pokemon/'+id)
          .pipe(
            delay(1000),
            map( pokemon => (
              {
                id      : pokemon.id,
                name    : pokemon.name,
                types   : pokemon.types,
                gifImage: pokemon?.sprites?.other?.showdown.front_default,
                image   : pokemon?.sprites?.other?.['official-artwork']?.front_default,
                stats   : pokemon.stats
              }
            ))
          )
  }

  public getDebilities(id:any):Observable<any>{
    return this._httpClient.get<any>(this.$baseURL+'type/'+id)
  }

  public getPokemonDescription(id:number):Observable<any>{
    return this._httpClient.get<any>(this.$baseURL+'pokemon-species/'+id)
           .pipe(
            catchError( ()=>{
              console.log('error al hacer peticion: '+id);
              return of(undefined)
            } )
           )
  }

  public getPokemonByName(pokemon:string):Observable<SmallPokemon>{
    // console.log(this.history)

    pokemon = pokemon.toLowerCase()
    this.organizeHistoiry( pokemon )
    return this._httpClient.get<Pokemon>('https://pokeapi.co/api/v2/pokemon/'+pokemon)
    .pipe(
      delay(1000),
      map( pokemon => (
        {
          id      : pokemon.id,
          name    : pokemon.name,
          types   : pokemon.types,
          gifImage: pokemon?.sprites?.other?.showdown.front_default,
          image   : pokemon?.sprites?.other?.['official-artwork']?.front_default,
          stats   : pokemon.stats
        }
      ))
    )
  }

  private organizeHistoiry( term:string ):void{
    term = term.toLowerCase()

    if( this.history.includes( term ) ){
      this.history = this.history.filter( oldTerm => oldTerm !== term )
    }
    this.history.unshift( term )
    this.history = this.history.splice(0, 10)
    this.savePokemonToLocalStorage()
  }

  public getPokemonType():Observable<[]>{
    return this._httpClient.get<any>('https://pokeapi.co/api/v2/type/').pipe(
      map(result => result.results),
      tap(res => this.pokemonTypes = res ),
      tap( ()=> this.savePokemonToLocalStorage() )
    )
  }

  public savePokemonToLocalStorage(){
    localStorage.setItem('pokemonItems', JSON.stringify( this.pokemonList ))
    localStorage.setItem('pokemonTypes', JSON.stringify( this.pokemonTypes ))
    localStorage.setItem('counterResult', JSON.stringify( this.count ))
    localStorage.setItem('currentPage', JSON.stringify( this.currentPage ))
    localStorage.setItem('currentOffset', JSON.stringify( this.offset ))
    localStorage.setItem('history', JSON.stringify( this.history ))
  }

  public loadPokemonFromLocalStorage(){
    const pokemon = localStorage.getItem('pokemonItems')
    const types   = localStorage.getItem('pokemonTypes')
    const counter = localStorage.getItem('counterResult')
    const offset = localStorage.getItem('currentOffset')
    const page = localStorage.getItem('currentPage')
    const history = localStorage.getItem('history')
    if( !pokemon || !types || !counter || !offset || !page  ) return

    this.pokemonList = JSON.parse( pokemon! )
    this.pokemonList = this.pokemonList.slice(0,20)
    this.pokemonTypes = JSON.parse( types! )
    this.count = JSON.parse( counter! )
    this.currentPage = JSON.parse( page! )
    this.offset = JSON.parse( offset! )
    this.history = history? JSON.parse( history! ) : []
  }
}
