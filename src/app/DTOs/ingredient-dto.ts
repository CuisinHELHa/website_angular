export declare type IngredientList = IngredientDTO[];

export interface IngredientDTO {
    idIngredient?: number;
    idRecipe?: number;
    quantity?: number;
    unit?: string;
    nameIngredient: string;
}
