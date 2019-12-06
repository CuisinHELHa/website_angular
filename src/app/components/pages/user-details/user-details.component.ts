import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserDTO} from "@app/DTOs/user-dto";
import {RecipeDTO, RecipeList} from "@app/DTOs/recipe-dto";
import {ReviewDTO, ReviewList} from "@app/DTOs/review-dto";
import {RecipeService} from "@app/services/recipe.service";
import {ReviewService} from "@app/services/review.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit, OnDestroy {


  private user: UserDTO ={
    idUser: 5,
    firstName:"Robin",
    lastName:"Roekens",
    pseudo: "RobinR",
    userType: true,
    mail:"robin.roekens@outlook.com",
    token:"////kfkhjkmdshfm"
  }

  private _recipes: RecipeList;
  private _reviews: ReviewList;

  private subscriptions: Subscription[]=[];

  private passwordPlaceHolder = "********";

  constructor(private recipeService: RecipeService,
              private reviewService: ReviewService) {
  }

  ngOnInit() {
    this.loadRecipe();
    this.loadReview();
  }

  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

  loadRecipe()
  {
    const sub = this.recipeService
        .queryUser(this.user.idUser)
        .subscribe(recipes => this.recipes=recipes);
    this.subscriptions.push(sub);
  }

  loadReview()
  {
    const sub = this.reviewService
        .queryUser(this.user.idUser)
        .subscribe(reviews => this.reviews=reviews);
    this.subscriptions.push(sub);
  }

  get reviews(): ReviewDTO[] {
    return this._reviews;
  }

  set reviews(value: ReviewDTO[]) {
    this._reviews = value;
  }
  get recipes(): RecipeDTO[] {
    return this._recipes;
  }

  set recipes(value: RecipeDTO[]) {
    this._recipes = value;
  }
}
