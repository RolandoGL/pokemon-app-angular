import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService } from 'src/app/services/pokemon-service.service';

@Component({
  selector: 'app-history-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history-component.component.html',
  styleUrls: ['./history-component.component.css']
})
export class HistoryComponentComponent {
  // public historyItems: string[] = []
  @Output() public selectedItem = new EventEmitter<string>()


  constructor(private _pokemonService: PokemonService ){

  }
  get historyItems(): string[]{
    return this._pokemonService.history
  }
  public sendItem( item: string ){
    this.selectedItem.emit( item )
  }
}
