import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TusEventosComponent } from './tus-eventos.component';

describe('TusEventosComponent', () => {
  let component: TusEventosComponent;
  let fixture: ComponentFixture<TusEventosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TusEventosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TusEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
