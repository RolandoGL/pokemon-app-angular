import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http' 
import { Observable, map } from 'rxjs';
import { Pokemon, Result, Type } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private $baseURL:string = 'https://pokeapi.co/api/v2/'
  constructor( private _httpClient: HttpClient) { }
  
  public getAllPokemon(offset:number=0, limmit:number=20):Observable<Result>{
    return this._httpClient.get<any>(this.$baseURL+`pokemon/?offset=${offset}&limit=${limmit}`)
  }

  public getPokemonDetail(url:string):Observable<Pokemon>{
    return this._httpClient.get<Pokemon>(url)
  }

  public getPokemonById(id:Number):Observable<Pokemon>{
    return this._httpClient.get<Pokemon>(this.$baseURL+'pokemon/'+id)
  }

  public getDebilities(id:any):Observable<any>{
    return this._httpClient.get<any>(this.$baseURL+'type/'+id)
  }

  public getPokemonDescription(id:number):Observable<any>{
    return this._httpClient.get<any>(this.$baseURL+'pokemon-species/'+id)
  }

  public getPokemonByName(pokemon:string):Observable<Pokemon>{
    let pokemonN = pokemon.toLocaleLowerCase()
    return this._httpClient.get<Pokemon>('https://pokeapi.co/api/v2/pokemon/'+pokemonN)
  }

  public getPokemonType():Observable<any[]>{
    return this._httpClient.get<any>('https://pokeapi.co/api/v2/type/').pipe(
      map(result => result.results)
    )
  }
}
