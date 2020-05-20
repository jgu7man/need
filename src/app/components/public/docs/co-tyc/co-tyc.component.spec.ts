import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoTycComponent } from './co-tyc.component';

describe('CoTycComponent', () => {
  let component: CoTycComponent;
  let fixture: ComponentFixture<CoTycComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoTycComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoTycComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
