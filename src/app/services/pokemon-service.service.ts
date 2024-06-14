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
  public count: number = 0
  public currentPage: number = 0
  public offset: number = 0

  constructor( private _httpClient: HttpClient) {
    this.loadPokemonFromLocalStorage()
  }

  public getAllPokemon(offset:number=0, limmit:number=20):Observable<Result>{
    return this._httpClient.get<any>(this.$baseURL+`pokemon/?offset=${offset}&limit=${limmit}`)
    .pipe(
      tap(pokemon => this.count = pokemon.count ),
      tap( ()=> this.pokemonList = []),
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

  public getPokemonByName(pokemon:string):Observable<Pokemon>{
    let pokemonN = pokemon.toLocaleLowerCase()
    return this._httpClient.get<Pokemon>('https://pokeapi.co/api/v2/pokemon/'+pokemonN)
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
  }

  public loadPokemonFromLocalStorage(){
    const pokemon = localStorage.getItem('pokemonItems')
    const types   = localStorage.getItem('pokemonTypes')
    const counter = localStorage.getItem('counterResult')
    if( !pokemon || !types  ) return

    this.pokemonList = JSON.parse( pokemon! )
    this.pokemonTypes = JSON.parse( types! )
    this.count = JSON.parse( counter! )
  }
}
