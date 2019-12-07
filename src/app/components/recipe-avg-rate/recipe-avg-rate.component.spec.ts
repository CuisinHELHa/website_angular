import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeAvgRateComponent } from './recipe-avg-rate.component';

describe('RecipeAvgRateComponent', () => {
  let component: RecipeAvgRateComponent;
  let fixture: ComponentFixture<RecipeAvgRateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeAvgRateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeAvgRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
