import { Directive, ElementRef, Input } from '@angular/core';
import { Pokemon, Type } from '../models/pokemon.model';
import { PokemonType } from '../models/pokemonType.model';

@Directive({
  selector: '[typeColorSelector]',
  standalone: true
})
export class TypeColorSelectorDirective {

  @Input() set typeColor( value:Type[] | undefined ){

  for (let index = 0; index < value!.length; index++) {
        const element: any = value![index];
        if( Object.values(PokemonType).includes(element.type.name) ){
          this.htmlElement!.nativeElement.classList.add(element.type.name)
          break
        }
      }

  }
  private htmlElement?: ElementRef<HTMLElement>
  constructor( el: ElementRef<HTMLElement>) {
    this.htmlElement = el

  }

}
