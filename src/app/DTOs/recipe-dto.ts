export declare type RecipeList = RecipeDTO[];

export interface RecipeDTO {
    idRecipe?: number;
    idUser: number;
    nameRecipe: string;
    postDate: string;
    summary: string;
    persons: number;
    prepTime: number;
    spiceRate: number;
    recipeType: string;
    pseudo?: string;
}
