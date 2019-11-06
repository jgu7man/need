import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoExpLugaresDisplayComponent } from './co-exp-lugares-display.component';

describe('CoExpLugaresDisplayComponent', () => {
  let component: CoExpLugaresDisplayComponent;
  let fixture: ComponentFixture<CoExpLugaresDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoExpLugaresDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoExpLugaresDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
