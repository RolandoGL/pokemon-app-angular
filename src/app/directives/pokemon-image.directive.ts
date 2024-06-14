import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[pokemonDefaultImage]',
  standalone: true
})
export class PokemonImageDirective {

  @Input() set image( value: string | undefined ) {
    if( !value ){
      this.htmlElement!.nativeElement.src = "../assets/logo.webp"
    }
  }
  private  htmlElement?: ElementRef<HTMLImageElement>
  constructor( private el: ElementRef<HTMLImageElement>) {
    this.htmlElement = el
   }

}
