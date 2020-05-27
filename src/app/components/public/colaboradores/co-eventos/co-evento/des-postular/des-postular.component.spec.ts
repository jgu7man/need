import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesPostularComponent } from './des-postular.component';

describe('DesPostularComponent', () => {
  let component: DesPostularComponent;
  let fixture: ComponentFixture<DesPostularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesPostularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesPostularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
