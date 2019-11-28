import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import { HeaderComponent } from './components/header/header.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import {FormsModule} from '@angular/forms';
import { RecipeSearchBarComponent } from './components/recipe-search-bar/recipe-search-bar.component';
import { RecipeResultsListComponent } from './components/recipe-results-list/recipe-results-list.component';
import { RecipeResultComponent } from './components/recipe-result/recipe-result.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginFormComponent,
    RecipeSearchBarComponent,
    RecipeResultsListComponent,
    RecipeResultComponent
  ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
