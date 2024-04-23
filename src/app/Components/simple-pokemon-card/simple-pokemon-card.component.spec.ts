import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimplePokemonCardComponent } from './simple-pokemon-card.component';

describe('SimplePokemonCardComponent', () => {
  let component: SimplePokemonCardComponent;
  let fixture: ComponentFixture<SimplePokemonCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SimplePokemonCardComponent]
    });
    fixture = TestBed.createComponent(SimplePokemonCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
