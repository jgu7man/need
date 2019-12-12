import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminColaboradoresComponent } from './admin-colaboradores.component';

describe('AdminColaboradoresComponent', () => {
  let component: AdminColaboradoresComponent;
  let fixture: ComponentFixture<AdminColaboradoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminColaboradoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminColaboradoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
