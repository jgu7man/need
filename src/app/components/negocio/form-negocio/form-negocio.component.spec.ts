import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNegocioComponent } from './form-negocio.component';

describe('FormNegocioComponent', () => {
  let component: FormNegocioComponent;
  let fixture: ComponentFixture<FormNegocioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormNegocioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormNegocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
