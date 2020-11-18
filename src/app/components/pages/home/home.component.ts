import {Component, OnInit} from '@angular/core';
import {RecipeDTO} from '@app/DTOs/recipe-dto';
import {RecipeService} from '@app/services/recipe.service';
import {ActivatedRoute} from '@angular/router';
import {Observable, Subject} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  private readonly idFrontRecipe = 160;
  private frontRecipeSubject = new Subject<RecipeDTO>();

  constructor(private recipeService: RecipeService,
              public route: ActivatedRoute) {
  }

  private _frontRecipeObs = this.frontRecipeSubject.asObservable();

  get frontRecipeObs(): Observable<RecipeDTO> {
    return this._frontRecipeObs;
  }

  ngOnInit() {
    this.loadRecipe();
  }

  private loadRecipe() {
    this.recipeService
      .queryId(this.idFrontRecipe)
      .subscribe(recipes => this.frontRecipeSubject.next(recipes[0]));
  }
}
