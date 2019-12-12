import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAlertaComponent } from './admin-alerta.component';

describe('AdminAlertaComponent', () => {
  let component: AdminAlertaComponent;
  let fixture: ComponentFixture<AdminAlertaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAlertaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAlertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
