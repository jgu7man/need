import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoExpLugaresComponent } from './co-exp-lugares.component';

describe('CoExpLugaresComponent', () => {
  let component: CoExpLugaresComponent;
  let fixture: ComponentFixture<CoExpLugaresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoExpLugaresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoExpLugaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
