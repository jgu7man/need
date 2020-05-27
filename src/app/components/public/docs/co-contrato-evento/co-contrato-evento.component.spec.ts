import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoContratoEventoComponent } from './co-contrato-evento.component';

describe('CoContratoEventoComponent', () => {
  let component: CoContratoEventoComponent;
  let fixture: ComponentFixture<CoContratoEventoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoContratoEventoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoContratoEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
