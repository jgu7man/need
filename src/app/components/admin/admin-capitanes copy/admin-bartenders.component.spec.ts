import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBartendersComponent } from './admin-bartenders.component';

describe('AdminBartendersComponent', () => {
  let component: AdminBartendersComponent;
  let fixture: ComponentFixture<AdminBartendersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBartendersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBartendersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
