import {Component, Input, OnInit} from '@angular/core';
import {RecipeDTO} from "../../DTOs/recipe-dto";

@Component({
  selector: 'app-recipe-result',
  templateUrl: './recipe-result.component.html',
  styleUrls: ['./recipe-result.component.css']
})
export class RecipeResultComponent implements OnInit {
  constructor() {
  }

  private _recipe: RecipeDTO;

  get recipe(): RecipeDTO {
    return this._recipe;
  }

  @Input()
  set recipe(value: RecipeDTO) {
    this._recipe = value;
    this.updateSpice(value.spiceRate);
  }

  private _spices: number[];

  get spices(): number[] {
    return this._spices;
  }

  set spices(value: number[]) {
    this._spices = value;
  }

  ngOnInit() {
  }

  updateSpice(nb: number) {
    this._spices = Array(nb).fill(0);
  }
}
