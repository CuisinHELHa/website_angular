import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-recipe-search-bar',
  templateUrl: './recipe-search-bar.component.html',
  styleUrls: ['./recipe-search-bar.component.css']
})
export class RecipeSearchBarComponent implements OnInit {
  constructor() {
  }

  private _userSearch: String = "";

  get userSearch(): String {
    return this._userSearch;
  }

  set userSearch(value: String) {
    this._userSearch = value;
  }

  ngOnInit() {
  }

  searchRecipe() {

  }
}
