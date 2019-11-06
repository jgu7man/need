import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoRegistroComponent } from './co-registro.component';

describe('CoRegistroComponent', () => {
  let component: CoRegistroComponent;
  let fixture: ComponentFixture<CoRegistroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoRegistroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
