import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagarPlanComponent } from './pagar-plan.component';

describe('PagarPlanComponent', () => {
  let component: PagarPlanComponent;
  let fixture: ComponentFixture<PagarPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagarPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagarPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
