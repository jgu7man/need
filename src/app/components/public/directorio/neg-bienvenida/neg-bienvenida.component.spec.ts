import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NegBienvenidaComponent } from './neg-bienvenida.component';

describe('NegBienvenidaComponent', () => {
  let component: NegBienvenidaComponent;
  let fixture: ComponentFixture<NegBienvenidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NegBienvenidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NegBienvenidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
