import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticatedInterfaceComponent } from './authenticated-interface.component';

describe('AuthenticatedInterfaceComponent', () => {
  let component: AuthenticatedInterfaceComponent;
  let fixture: ComponentFixture<AuthenticatedInterfaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthenticatedInterfaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticatedInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
