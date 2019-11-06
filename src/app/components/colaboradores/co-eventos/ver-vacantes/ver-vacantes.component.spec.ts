import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerVacantesComponent } from './ver-vacantes.component';

describe('VerVacantesComponent', () => {
  let component: VerVacantesComponent;
  let fixture: ComponentFixture<VerVacantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerVacantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerVacantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
