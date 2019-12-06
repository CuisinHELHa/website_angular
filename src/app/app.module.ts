import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {JwtInterceptor} from "@app/helpers/jwt-interceptor";
import {ErrorInterceptor} from "@app/helpers/error-interceptor";
import {ReviewFormComponent} from './components/review-form/review-form.component';
import {AppComponent} from "@app/app.component";
import {HeaderComponent} from "@app/components/header/header.component";
import {LoginFormComponent} from "@app/components/login-form/login-form.component";
import {RecipeSearchBarComponent} from "@app/components/recipe-search-bar/recipe-search-bar.component";
import {RecipeSearchComponent} from "@app/components/pages/recipe-search";
import {RecipeResultComponent} from "@app/components/recipe-result/recipe-result.component";
import {AccountModalComponent} from "@app/components/account-modal/account-modal.component";
import {RecipePipe} from "@app/pipes/recipe-pipe.pipe";
import {RecipeDetailsComponent} from "@app/components/pages/recipe-details";
import {HomeComponent} from "@app/components/pages/home";
import {UserDetailsComponent} from "@app/components/pages/user-details";
import {RecipeCreateComponent} from "@app/components/pages/recipe-create/recipe-create.component";
import {appRoutingModule} from "@app/app.routing";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginFormComponent,
    RecipeSearchBarComponent,
    RecipeSearchComponent,
    RecipeResultComponent,
    RecipePipe,
    RecipeDetailsComponent,
    AccountModalComponent,
    HomeComponent,
    UserDetailsComponent,
    RecipeCreateComponent,
    ReviewFormComponent
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
