import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {HeaderComponent} from './components/header/header.component';
import {LoginFormComponent} from './components/login-form/login-form.component';
import {FormsModule} from '@angular/forms';
import { RecipeSearchBarComponent } from './components/recipe-search-bar/recipe-search-bar.component';
import { RecipeResultsListComponent } from './components/recipe-results-list/recipe-results-list.component';
import { RecipeResultComponent } from './components/recipe-result/recipe-result.component';
import { RecipePipe } from './pipes/recipe-pipe.pipe';
import { AccountModalComponent } from './components/account-modal/account-modal.component';
import { HomeComponent } from './components/pages/home/home.component';
import { RecipeSearchComponent } from './components/pages/recipe-search/recipe-search.component';
import {appRoutingModule} from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginFormComponent,
    RecipeSearchBarComponent,
    RecipeResultsListComponent,
    RecipeResultComponent,
    RecipePipe,
    AccountModalComponent,
    HomeComponent,
    RecipeSearchComponent,
  ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule,
    FormsModule,
    appRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {


}
