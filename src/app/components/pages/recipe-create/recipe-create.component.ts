import {Component, OnDestroy, OnInit} from '@angular/core';
import {IngredientDTO, IngredientList} from '../../../DTOs/ingredient-dto';
import {IngredientService} from '../../../services/ingredient.service';
import {Subscription} from 'rxjs';
import {RECIPE_TYPE} from '../../../enumerations/recipe-type.enum';
import {UNIT} from '@app/enumerations/unit.enum';
import {RecipeDTO} from '@app/DTOs/recipe-dto';
import {StepDTO, StepList} from '@app/DTOs/step-dto';
import {StepService} from '@app/services/step.service';
import {RecipeService} from '@app/services/recipe.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '@app/services/authentication.service';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.css']
})
export class RecipeCreateComponent implements OnInit, OnDestroy {

  public stepCounter: number;
  private subscriptions: Subscription[] = [];

  constructor(public ingredientService: IngredientService,
              private stepService: StepService,
              private recipeService: RecipeService,
              private fb: FormBuilder,
              private _authService: AuthenticationService) {
  }

  public _form: FormGroup = this.fb.group({
    nameRecipe: this.fb.control('', Validators.required),
    summary: this.fb.control('', Validators.required),
    persons: this.fb.control('', Validators.required),
    prepTime: this.fb.control('', Validators.required),
    spicesRate: this.fb.control(0, Validators.required),
    recipeType: this.fb.control('', Validators.required)
  });

  get form(): FormGroup {
    return this._form;
  }

  set form(value: FormGroup) {
    this._form = value;
  }

  public _ingredientForm: FormGroup = this.fb.group({
    nameIngredient: this.fb.control('rien'),
    quantity: this.fb.control(0, Validators.required),
    unit: this.fb.control('g', Validators.required)
  });

  get ingredientForm(): FormGroup {
    return this._ingredientForm;
  }

  set ingredientForm(value: FormGroup) {
    this._ingredientForm = value;
  }

  public _stepForm: FormGroup = this.fb.group({
    step: this.fb.control('', Validators.required)
  });

  get stepForm(): FormGroup {
    return this._stepForm;
  }

  set stepForm(value: FormGroup) {
    this._stepForm = value;
  }

  private _units: any[] = UNIT;

  get units(): any[] {
    return this._units;
  }

  set units(value: any[]) {
    this._units = value;
  }

  private _filters: any[] = RECIPE_TYPE;

  get filters(): any[] {
    return this._filters;
  }

  private _ingredients: IngredientList;

  get ingredients(): IngredientList {
    return this._ingredients;
  }

  set ingredients(value: IngredientList) {
    this._ingredients = value;
  }

  private _recipe: RecipeDTO;

  get recipe(): RecipeDTO {
    return this._recipe;
  }

  set recipe(value: RecipeDTO) {
    this._recipe = value;
  }

  private _stepsRecipe: StepList = [];

  get stepsRecipe(): StepDTO[] {
    return this._stepsRecipe;
  }

  set stepsRecipe(value: StepDTO[]) {
    this._stepsRecipe = value;
  }

  private _ingredientRecipe: IngredientList = [];

  get ingredientRecipe(): IngredientDTO[] {
    return this._ingredientRecipe;
  }

  set ingredientRecipe(value: IngredientDTO[]) {
    this._ingredientRecipe = value;
  }

  get authService(): AuthenticationService {
    return this._authService;
  }

  set authService(value: AuthenticationService) {
    this._authService = value;
  }

  ngOnInit() {
    this.stepCounter = 1;
    this.loadIngredients();
    this._form.get('recipeType').setValue(RECIPE_TYPE[0]);
  }

  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
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

  idOfIngredient(name: string): number {
    for (const ingredient of this.ingredients) {
      if (ingredient.nameIngredient === name) {
        return ingredient.idIngredient;
      }
    }
  }

  removeIngredient(index: number) {
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

  removeStep(index: number) {
    this.stepsRecipe.splice(index, 1);
    this.stepCounter--;
    let i = 1;
    for (const step of this.stepsRecipe) {
      step.stepNb = i;
      i++;
    }
  }

  postRecipe() {
    const recipe = {
      idUser: this._authService.currentUserValue.idUser,
      nameRecipe: this._form.get('nameRecipe').value,
      postDate: formatDate(Date.now(), 'dd-MM-yyyy', 'fr'),
      summary: this._form.get('summary').value,
      persons: this._form.get('persons').value,
      prepTime: this._form.get('prepTime').value,
      spiceRate: this._form.get('spicesRate').value,
      recipeType: this._form.get('recipeType').value,
      idRecipe: -1
    };

    const sub = this.recipeService
      .post(recipe)
      .subscribe(recipeResult => {
        recipe.idRecipe = recipeResult.idRecipe;
        this.setStepRecipeId(recipe.idRecipe);
        this.setIngredientRecipeId(recipe.idRecipe);
        this.postIngredient(0);
      });

    this.subscriptions.push(sub);

  }

  setStepRecipeId(id: number) {
    for (const step of this._stepsRecipe) {
      step.idRecipe = id;
    }
  }

  setIngredientRecipeId(id: number) {
    for (const ingredient of this._ingredientRecipe) {
      ingredient.idRecipe = id;
    }
  }

  postIngredient(index: number) {
    if (index < this.ingredientRecipe.length) {
      const sub = this.ingredientService
        .postToRecipe(this.ingredientRecipe[index])
        .subscribe(result => {
          index++;
          this.postIngredient(index);
        });

      this.subscriptions.push(sub);
    } else {
      this.postStep(0);
    }
  }

  postStep(index: number) {
    if (index < this.stepsRecipe.length) {
      const sub = this.stepService
        .post(this.stepsRecipe[index])
        .subscribe(result => {
          index++;
          this.postStep(index);
        });

      this.subscriptions.push(sub);
    } else {
      this._form.reset();
      this.stepsRecipe = [];
      this.ingredientRecipe = [];
    }
  }

  private loadIngredients(): void {
    const sub: Subscription = this.ingredientService
      .query()
      .subscribe(ingredients => {
        this._ingredients = ingredients;
        this._ingredientForm.reset();
      });

    this.subscriptions.push(sub);
  }


}
