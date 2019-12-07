import {Component, Input, OnInit} from '@angular/core';
import {ReviewService} from "@app/services/review.service";

@Component({
  selector: 'app-recipe-avg-rate',
  templateUrl: './recipe-avg-rate.component.html',
  styleUrls: ['./recipe-avg-rate.component.css']
})
export class RecipeAvgRateComponent implements OnInit {

    avgRate: number;
    private _idRecipe: number = -1;

  constructor(private reviewService: ReviewService) { }

  ngOnInit() {
    this.loadAvgRate();
  }

  private loadAvgRate() {
    const sub  = this.reviewService
        .queryAvgByRecipe(this.idRecipe)
        .subscribe(avg =>
        this.avgRate = avg);

  }

  get idRecipe(): number {
    return this._idRecipe;
  }

  @Input()
  set idRecipe(value: number) {
    this._idRecipe = value;
  }



}
