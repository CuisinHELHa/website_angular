import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/pages/home';
import { RecipeSearchComponent } from './components/pages/recipe-search';
import {RecipeDetailsComponent} from "./components/pages/recipe-details";
import {UserDetailsComponent} from "./components/pages/user-details";


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'recipe-search', component: RecipeSearchComponent },
  { path: 'recipe-details/:id', component: RecipeDetailsComponent},
  { path: 'user-details', component: UserDetailsComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
