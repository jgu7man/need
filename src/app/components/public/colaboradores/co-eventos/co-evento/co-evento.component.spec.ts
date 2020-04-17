import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoEventoComponent } from './co-evento.component';

describe('CoEventoComponent', () => {
  let component: CoEventoComponent;
  let fixture: ComponentFixture<CoEventoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoEventoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
