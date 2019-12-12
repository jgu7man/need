import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategoriasComponent } from './admin-categorias.component';

describe('AdminCategoriasComponent', () => {
  let component: AdminCategoriasComponent;
  let fixture: ComponentFixture<AdminCategoriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCategoriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
