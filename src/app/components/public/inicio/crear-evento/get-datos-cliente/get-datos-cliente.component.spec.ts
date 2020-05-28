import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetDatosClienteComponent } from './get-datos-cliente.component';

describe('GetDatosClienteComponent', () => {
  let component: GetDatosClienteComponent;
  let fixture: ComponentFixture<GetDatosClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetDatosClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetDatosClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
