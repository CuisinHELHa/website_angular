import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './components/pages/home';
import {RecipeDetailsComponent} from "./components/pages/recipe-details";
import {UserDetailsComponent} from "./components/pages/user-details";
import {RecipeSearchComponent} from "./components/pages/recipe-search";
import {RecipeCreateComponent} from "@app/components/pages/recipe-create/recipe-create.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'recipe-search', component: RecipeSearchComponent},
  { path: 'recipe-search/:text', component: RecipeSearchComponent },
  { path: 'recipe-details/:id', component: RecipeDetailsComponent},
  { path: 'user-details', component: UserDetailsComponent },
  { path: 'recipe-create', component: RecipeCreateComponent },
  // otherwise redirect to home
  {path: '**', redirectTo: ''}
];

export const appRoutingModule = RouterModule.forRoot(routes);
