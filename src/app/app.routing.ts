import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './components/pages/home';
import {RecipeSearchComponent} from './components/pages/recipe-search';
import {RecipeDetailsComponent} from "./components/pages/recipe-details";
import {UserDetailsComponent} from "./components/pages/user-details";
import {RecipeCreateComponent} from "./components/pages/recipe-create/recipe-create.component";
import {AuthGuard} from "@app/helpers";


const routes: Routes = [
  {path: 'home', component: HomeComponent, pathMatch:'full'},
  {path: 'recipe-search', component: RecipeSearchComponent},
  {path: 'recipe-details/:id', component: RecipeDetailsComponent},

  {path: 'recipe-create', component: RecipeCreateComponent, canActivate:[AuthGuard]},
  {path: 'user-details', component: UserDetailsComponent, canActivate:[AuthGuard]},

  // If not a valid url -> redirect to home
  {path: '**', redirectTo: 'home'}
];

export const appRoutingModule = RouterModule.forRoot(routes);
