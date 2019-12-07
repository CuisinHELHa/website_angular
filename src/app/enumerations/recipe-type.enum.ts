
export enum RecipeType {
    ALL = "All",
    ENTREE = "Entrée",
    PLAT = "Plat",
    DESSERT = "Dessert"
}
export const RECIPE_TYPE_FILTER: any[]=[{
  id:"All",
  value: RecipeType.ALL
},
  {
    id:"Entrée",
    value: RecipeType.ENTREE
  },
  {
    id:"Plat",
    value: RecipeType.PLAT
  },
  {
    id:"Dessert",
    value: RecipeType.DESSERT
  }];
export const RECIPE_TYPE: any[]=[
  {
    id:"Entrée",
    value: RecipeType.ENTREE
  },
  {
    id:"Plat",
    value: RecipeType.PLAT
  },
  {
    id:"Dessert",
    value: RecipeType.DESSERT
  }];

