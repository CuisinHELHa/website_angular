import {Pipe, PipeTransform} from '@angular/core';
import {RecipeList} from '../DTOs/recipe-dto';
import {RecipeType} from '../enumerations/recipe-type.enum';

@Pipe({
  name: 'Recipe'
})
export class RecipePipe implements PipeTransform {

  transform(recipes: RecipeList, recipeType: RecipeType): RecipeList {
    switch (recipeType) {
      case RecipeType.ENTREE:
        return recipes.filter(recipe => recipe.recipeType === 'Starter');
      case RecipeType.PLAT:
        return recipes.filter(recipe => recipe.recipeType === 'Main course');
      case RecipeType.DESSERT:
        return recipes.filter(recipe => recipe.recipeType === 'Dessert');
      default:
        return recipes;
    }
  }
}
