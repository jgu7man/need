import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoExpLaboralComponent } from './co-exp-laboral.component';

describe('CoExpLaboralComponent', () => {
  let component: CoExpLaboralComponent;
  let fixture: ComponentFixture<CoExpLaboralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoExpLaboralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoExpLaboralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
