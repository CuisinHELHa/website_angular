import {Component, Input, OnInit} from '@angular/core';
import {RecipeDTO} from "../../DTOs/recipe-dto";

@Component({
  selector: 'app-recipe-result',
  templateUrl: './recipe-result.component.html',
  styleUrls: ['./recipe-result.component.css']
})
export class RecipeResultComponent implements OnInit {
  private _recipe:RecipeDTO;
  private _spices:number[];

  constructor() { }

  ngOnInit() {
  }

  get recipe(): RecipeDTO {
    return this._recipe;
  }

  @Input()
  set recipe(value: RecipeDTO) {
    this._recipe = value;
    this.updateSpice(value.spiceRate);
  }

  get spices(): number[] {
    return this._spices;
  }

  set spices(value: number[]) {
    this._spices = value;
  }

  updateSpice(nb:number){
    this._spices = Array(nb).fill(0);
  }
}
