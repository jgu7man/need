import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoEventosComponent } from './co-eventos.component';

describe('CoEventosComponent', () => {
  let component: CoEventosComponent;
  let fixture: ComponentFixture<CoEventosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoEventosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
