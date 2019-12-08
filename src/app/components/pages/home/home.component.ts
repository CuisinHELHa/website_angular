import {Component, OnInit} from '@angular/core';
import {ReviewDTO, ReviewList} from "@app/DTOs/review-dto";
import {Subscription} from "rxjs";
import {RecipeDTO} from "@app/DTOs/recipe-dto";
import {RecipeService} from "@app/services/recipe.service";
import {ReviewService} from "@app/services/review.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

// @Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {

  //recette du mois possède l'id 1
  private idRecipe:number=1;

  private _recipe: RecipeDTO;
  private _reviews: ReviewList;
  private subscriptions: Subscription[] = [];


  constructor(private recipeService: RecipeService,
              private reviewService: ReviewService,
              public route:ActivatedRoute) {
  }

  ngOnInit() {
    this.loadRecipe();
    this.loadReviews();

  }


  get recipe(): RecipeDTO {
    return this._recipe;
  }

  set recipe(value: RecipeDTO) {
    this._recipe = value;
  }


  get reviews(): ReviewDTO[] {
    return this._reviews;
  }

  set reviews(value: ReviewDTO[]) {
    this._reviews = value;
  }

  private loadRecipe() {
    const sub: Subscription = this.recipeService
      .queryId(this.idRecipe)
      .subscribe(recipes => this.recipe=recipes[0]);
    this.subscriptions.push(sub);
  }
  private loadReviews()
  {
    const sub: Subscription = this.reviewService
      .queryByRecipe(this.idRecipe)
      .subscribe(reviews => this.reviews = reviews);
    this.subscriptions.push(sub);
  }
}
