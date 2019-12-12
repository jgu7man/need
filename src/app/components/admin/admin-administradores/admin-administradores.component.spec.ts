import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAdministradoresComponent } from './admin-administradores.component';

describe('AdminAdministradoresComponent', () => {
  let component: AdminAdministradoresComponent;
  let fixture: ComponentFixture<AdminAdministradoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAdministradoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAdministradoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
