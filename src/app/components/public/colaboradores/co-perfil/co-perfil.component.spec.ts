import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoPerfilComponent } from './co-perfil.component';

describe('CoPerfilComponent', () => {
  let component: CoPerfilComponent;
  let fixture: ComponentFixture<CoPerfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoPerfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
