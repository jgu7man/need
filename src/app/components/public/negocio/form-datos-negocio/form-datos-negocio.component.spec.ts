import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDatosNegocioComponent } from './form-datos-negocio.component';

describe('FormDatosNegocioComponent', () => {
  let component: FormDatosNegocioComponent;
  let fixture: ComponentFixture<FormDatosNegocioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDatosNegocioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDatosNegocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
