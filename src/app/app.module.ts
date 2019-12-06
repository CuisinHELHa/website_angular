import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {HeaderComponent} from './components/header/header.component';
import {LoginFormComponent} from './components/login-form/login-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RecipeSearchBarComponent} from './components/recipe-search-bar/recipe-search-bar.component';
import {RecipeResultsListComponent} from './components/recipe-results-list/recipe-results-list.component';
import {RecipeResultComponent} from './components/recipe-result/recipe-result.component';
import {RecipePipe} from './pipes/recipe-pipe.pipe';
import {RecipeDetailsComponent} from './components/pages/recipe-details/recipe-details.component';
import {AccountModalComponent} from './components/account-modal/account-modal.component';
import {HomeComponent} from './components/pages/home/home.component';
import {RecipeSearchComponent} from './components/pages/recipe-search/recipe-search.component';
import {appRoutingModule} from './app.routing';
import {UserDetailsComponent} from './components/pages/user-details/user-details.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RecipeCreateComponent} from "./components/pages/recipe-create/recipe-create.component";
import {JwtInterceptor} from "@app/helpers/jwt-interceptor";
import {ErrorInterceptor} from "@app/helpers/error-interceptor";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginFormComponent,
    RecipeSearchBarComponent,
    RecipeResultsListComponent,
    RecipeResultComponent,
    RecipePipe,
    RecipeDetailsComponent,
    AccountModalComponent,
    HomeComponent,
    RecipeSearchComponent,
    UserDetailsComponent,
    RecipeCreateComponent
  ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule,
    FormsModule,
    appRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
