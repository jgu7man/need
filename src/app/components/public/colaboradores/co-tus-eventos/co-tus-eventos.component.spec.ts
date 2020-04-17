import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoTusEventosComponent } from './co-tus-eventos.component';

describe('CoTusEventosComponent', () => {
  let component: CoTusEventosComponent;
  let fixture: ComponentFixture<CoTusEventosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoTusEventosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoTusEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
