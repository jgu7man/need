import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNegociosComponent } from './admin-negocios.component';

describe('AdminNegociosComponent', () => {
  let component: AdminNegociosComponent;
  let fixture: ComponentFixture<AdminNegociosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminNegociosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNegociosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
