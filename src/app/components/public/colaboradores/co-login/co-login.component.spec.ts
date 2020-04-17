import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoLoginComponent } from './co-login.component';

describe('CoLoginComponent', () => {
  let component: CoLoginComponent;
  let fixture: ComponentFixture<CoLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
