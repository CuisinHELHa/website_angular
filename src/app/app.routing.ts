import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/pages/home';
import { RecipeSearchComponent } from './components/pages/recipe-search';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'recipe-search', component: RecipeSearchComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
