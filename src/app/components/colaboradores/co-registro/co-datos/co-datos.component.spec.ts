import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoDatosComponent } from './co-datos.component';

describe('CoDatosComponent', () => {
  let component: CoDatosComponent;
  let fixture: ComponentFixture<CoDatosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoDatosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
