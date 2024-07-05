import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit, OnDestroy {


  pokemonName:string = ''
  private debouncer: Subject<string> = new Subject<string>()
  private debouncerSubs?: Subscription
  @Output() pokemon = new EventEmitter<string>()

  ngOnInit(): void {
    this.debouncerSubs = this.debouncer
    .pipe(
      debounceTime(500)
    )
    .subscribe( value => this.pokemon.emit( value ))
  }

  ngOnDestroy(): void {
    this.debouncerSubs?.unsubscribe()
  }

  sendPokemonName( term: string ){
    // this.pokemon.emit(this.pokemonName)
    this.debouncer.next( term )
  }
}
