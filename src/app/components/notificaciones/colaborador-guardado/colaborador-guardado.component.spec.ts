import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColaboradorGuardadoComponent } from './colaborador-guardado.component';

describe('ColaboradorGuardadoComponent', () => {
  let component: ColaboradorGuardadoComponent;
  let fixture: ComponentFixture<ColaboradorGuardadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColaboradorGuardadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColaboradorGuardadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
