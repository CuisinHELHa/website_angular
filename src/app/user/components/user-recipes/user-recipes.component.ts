import {Component, Input} from '@angular/core';
import {RecipeDTO} from '@app/DTOs/recipe-dto';

@Component({
  selector: 'app-user-recipes',
  templateUrl: './user-recipes.component.html',
  styleUrls: ['./user-recipes.component.css']
})
export class UserRecipesComponent {
  @Input() recipes: RecipeDTO[];

  constructor() {
  }
}
