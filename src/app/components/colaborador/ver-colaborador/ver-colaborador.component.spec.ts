import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerColaboradorComponent } from './ver-colaborador.component';

describe('VerColaboradorComponent', () => {
  let component: VerColaboradorComponent;
  let fixture: ComponentFixture<VerColaboradorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerColaboradorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerColaboradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
