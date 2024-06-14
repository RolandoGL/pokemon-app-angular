import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderAppComponent } from './Components/header-app/header-app.component';
import { SearchBarComponent } from './Components/search-bar/search-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PokemonImageDirective } from './directives/pokemon-image.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderAppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SearchBarComponent,
    HttpClientModule,
    FormsModule,
    PokemonImageDirective,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
