import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NegocioInfoComponent } from './negocio-info.component';

describe('NegocioInfoComponent', () => {
  let component: NegocioInfoComponent;
  let fixture: ComponentFixture<NegocioInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NegocioInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NegocioInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
