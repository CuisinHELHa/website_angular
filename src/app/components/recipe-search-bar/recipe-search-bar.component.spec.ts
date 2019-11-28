import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeSearchBarComponent } from './recipe-search-bar.component';

describe('RecipeSearchBarComponent', () => {
  let component: RecipeSearchBarComponent;
  let fixture: ComponentFixture<RecipeSearchBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeSearchBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
