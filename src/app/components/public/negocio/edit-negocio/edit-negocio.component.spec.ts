import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNegocioComponent } from './edit-negocio.component';

describe('EditNegocioComponent', () => {
  let component: EditNegocioComponent;
  let fixture: ComponentFixture<EditNegocioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditNegocioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNegocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
