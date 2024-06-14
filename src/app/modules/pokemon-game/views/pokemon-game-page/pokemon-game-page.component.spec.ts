import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonGamePageComponent } from './pokemon-game-page.component';

describe('PokemonGamePageComponent', () => {
  let component: PokemonGamePageComponent;
  let fixture: ComponentFixture<PokemonGamePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonGamePageComponent]
    });
    fixture = TestBed.createComponent(PokemonGamePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
