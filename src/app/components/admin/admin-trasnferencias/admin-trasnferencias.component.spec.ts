import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTrasnferenciasComponent } from './admin-trasnferencias.component';

describe('AdminTrasnferenciasComponent', () => {
  let component: AdminTrasnferenciasComponent;
  let fixture: ComponentFixture<AdminTrasnferenciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTrasnferenciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTrasnferenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
