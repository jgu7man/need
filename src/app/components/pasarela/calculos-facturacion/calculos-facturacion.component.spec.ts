import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculosFacturacionComponent } from './calculos-facturacion.component';

describe('CalculosFacturacionComponent', () => {
  let component: CalculosFacturacionComponent;
  let fixture: ComponentFixture<CalculosFacturacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculosFacturacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculosFacturacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
