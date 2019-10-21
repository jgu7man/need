import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarTarjetaComponent } from './agregar-tarjeta.component';

describe('AgregarTarjetaComponent', () => {
  let component: AgregarTarjetaComponent;
  let fixture: ComponentFixture<AgregarTarjetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarTarjetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarTarjetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
