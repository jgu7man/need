import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormExtrasNegocioComponent } from './form-extras-negocio.component';

describe('FormExtrasNegocioComponent', () => {
  let component: FormExtrasNegocioComponent;
  let fixture: ComponentFixture<FormExtrasNegocioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormExtrasNegocioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormExtrasNegocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
