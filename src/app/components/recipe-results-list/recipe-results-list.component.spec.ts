import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RecipeResultsListComponent} from './recipe-results-list.component';

describe('RecipeResultsListComponent', () => {
  let component: RecipeResultsListComponent;
  let fixture: ComponentFixture<RecipeResultsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeResultsListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeResultsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
