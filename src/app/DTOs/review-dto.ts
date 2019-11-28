export declare type ReviewList = ReviewDTO[];

export interface ReviewDTO {
    idUser: number;
    idRecipe: number;
    rate: number;
    reviewMessage: string;
}
