import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerEquipoComponent } from './ver-equipo.component';

describe('VerEquipoComponent', () => {
  let component: VerEquipoComponent;
  let fixture: ComponentFixture<VerEquipoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerEquipoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
