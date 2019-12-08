import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {IngredientDTO, IngredientList} from "../../../DTOs/ingredient-dto";
import {IngredientService} from "../../../services/ingredient.service";
import {Subscription} from "rxjs";
import {RECIPE_TYPE, RECIPE_TYPE_FILTER} from "../../../enumerations/recipe-type.enum";
import {UNIT, Unit} from "@app/enumerations/unit.enum";
import {RecipeDTO} from "@app/DTOs/recipe-dto";
import {StepDTO, StepList} from "@app/DTOs/step-dto";
import {ReviewDTO, ReviewList} from "@app/DTOs/review-dto";
import {StepService} from "@app/services/step.service";
import {RecipeService} from "@app/services/recipe.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "@app/services/authentication.service";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.css']
})
export class RecipeCreateComponent implements OnInit, OnDestroy {

  private _form: FormGroup = this.fb.group({
    nameRecipe: this.fb.control("", Validators.required),
    summary: this.fb.control("", Validators.required),
    persons: this.fb.control("", Validators.required),
    prepTime: this.fb.control("", Validators.required),
    spicesRate: this.fb.control(0, Validators.required),
    recipeType: this.fb.control("", Validators.required)
  });

  private _ingredientForm: FormGroup = this.fb.group({
    nameIngredient: this.fb.control("rien"),
    quantity: this.fb.control(0, Validators.required),
    unit: this.fb.control("g", Validators.required)
  });

  private _stepForm: FormGroup = this.fb.group({
    step: this.fb.control("", Validators.required)
  });


  private units:any[]=UNIT;
  private _filters:any[] = RECIPE_TYPE;
  private _ingredients: IngredientList;
  private  subscriptions: Subscription[] = [];
  private _recipe: RecipeDTO;
  private _stepsRecipe: StepList = [];
  private _ingredientRecipe: IngredientList = [];

  public stepCounter: number;

  constructor(public ingredientService:IngredientService,
              private stepService: StepService,
              private recipeService: RecipeService,
              private fb: FormBuilder,
              private _authService: AuthenticationService) { }


  ngOnInit() {
    this.stepCounter = 1;
    this.loadIngredients();
  }

  ngOnDestroy(): void{
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

  private loadIngredients():void{
    const sub: Subscription=this.ingredientService
      .query()
      .subscribe(ingredients => {
        this._ingredients = ingredients;
        this._ingredientForm.reset();
      });

    this.subscriptions.push(sub);
  }

  addIngredients() {
    this.ingredientRecipe.push({
      nameIngredient: this._ingredientForm.get('nameIngredient').value,
      quantity: this._ingredientForm.get('quantity').value,
      unit: this._ingredientForm.get('unit').value,
      idIngredient: this.idOfIngredient(this._ingredientForm.get('nameIngredient').value)
    });
    this._ingredientForm.reset();
  }

  idOfIngredient(name: string): number{
    for(let ingredient of this.ingredients)
    {
      if(ingredient.nameIngredient === name)
      {
        return ingredient.idIngredient;
      }
    }
  }

  removeIngredient(index: number)
  {
    this.ingredientRecipe.splice(index, 1);
  }

  addStep() {
    this.stepsRecipe.push({
      idRecipe: -1,
      stepNb: this.stepCounter++,
      step: this._stepForm.get('step').value
    });
    this._stepForm.reset();
  }

  removeStep(index: number)
  {
    this.stepsRecipe.splice(index, 1);
    this.stepCounter--;
    let i = 1;
    for(let step of this.stepsRecipe)
    {
      step.stepNb=i;
      i++;
    }
  }

  postRecipe() {
    let recipe = {
      idUser:this._authService.currentUserValue.idUser,
      nameRecipe: this._form.get("nameRecipe").value,
      postDate: formatDate(Date.now(), "dd-MM-yyyy", "fr"),
      summary: this._form.get("summary").value,
      persons: this._form.get("persons").value,
      prepTime: this._form.get("prepTime").value,
      spiceRate: this._form.get("spicesRate").value,
      recipeType: this._form.get("recipeType").value,
      idRecipe: -1
    };

    const sub = this.recipeService
        .post(recipe)
        .subscribe(recipeResult =>
        {
          recipe.idRecipe = recipeResult.idRecipe;
          this.setStepRecipeId(recipe.idRecipe);
          this.setIngredientRecipeId(recipe.idRecipe);
          this.postIngredient(0);
        });

    this.subscriptions.push(sub);

  }

  setStepRecipeId(id: number)
  {
    for(let step of this._stepsRecipe)
    {
      step.idRecipe=id;
    }
  }

  setIngredientRecipeId(id:number)
  {
    for(let ingredient of this._ingredientRecipe)
    {
      ingredient.idRecipe=id;
    }
  }

  postIngredient(index: number){
    if(index < this.ingredientRecipe.length) {
      const sub = this.ingredientService
          .postToRecipe(this.ingredientRecipe[index])
          .subscribe(result => {
            index++;
            this.postIngredient(index);
          });

      this.subscriptions.push(sub);
    }else
    {this.postStep(0);}
  }

  postStep(index: number){
    if(index < this.stepsRecipe.length) {
      const sub = this.stepService
          .post(this.stepsRecipe[index])
          .subscribe(result => {
            index++;
            this.postStep(index);
          });

      this.subscriptions.push(sub);
    }else
    {
      this._form.reset();
      this.stepsRecipe=[];
      this.ingredientRecipe=[];
    }
  }

  get ingredients(): IngredientList {
    return this._ingredients;
  }

  set ingredients(value: IngredientList) {
    this._ingredients = value;
  }


  get recipe(): RecipeDTO {
    return this._recipe;
  }

  set recipe(value: RecipeDTO) {
    this._recipe = value;
  }
  get filters(): any[] {
    return this._filters;
  }


  get form(): FormGroup {
    return this._form;
  }

  set form(value: FormGroup) {
    this._form = value;
  }

  get ingredientRecipe(): IngredientDTO[] {
    return this._ingredientRecipe;
  }

  set ingredientRecipe(value: IngredientDTO[]) {
    this._ingredientRecipe = value;
  }
  get stepsRecipe(): StepDTO[] {
    return this._stepsRecipe;
  }

  set stepsRecipe(value: StepDTO[]) {
    this._stepsRecipe = value;
  }

  get authService(): AuthenticationService {
    return this._authService;
  }

  set authService(value: AuthenticationService) {
    this._authService = value;
  }


}
