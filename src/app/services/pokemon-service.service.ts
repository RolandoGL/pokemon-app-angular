import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http' 
import { Observable } from 'rxjs';
import { Pokemon, Result } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private $baseURL:string = 'https://pokeapi.co/api/v2/'
  constructor( private _httpClient: HttpClient) { }
  
  public getAllPokemon():Observable<Result>{
    return this._httpClient.get<any>(this.$baseURL+'pokemon')
  }

  public getPokemonDetail(url:string):Observable<Pokemon>{
    return this._httpClient.get<Pokemon>(url)
  }

  public getPokemonById(id:Number):Observable<Pokemon>{
    return this._httpClient.get<Pokemon>(this.$baseURL+'pokemon/'+id)
  }
}
