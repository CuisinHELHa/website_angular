import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-recipe-search-bar',
  templateUrl: './recipe-search-bar.component.html',
  styleUrls: ['./recipe-search-bar.component.css']
})
export class RecipeSearchBarComponent implements OnInit {
  constructor(private router: Router) {
  }

  private _mouseIn: boolean;

  get mouseIn(): boolean {
    return this._mouseIn;
  }

  private _userSearch: string = '';

  get userSearch(): string {
    return this._userSearch;
  }

  set userSearch(value: string) {
    this._userSearch = value;
  }

  @HostListener('mouseenter')
  public mouseEnter(): void {
    this._mouseIn = true;
  }

  @HostListener('mouseleave')
  public mouseLeave(): void {
    this._mouseIn = false;
  }

  ngOnInit() {
  }

  searchRecipe() {
    this.router.navigateByUrl('/recipe-search/' + this.userSearch);
  }
}
