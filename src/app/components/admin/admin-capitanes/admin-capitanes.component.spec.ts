import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCapitanesComponent } from './admin-capitanes.component';

describe('AdminCapitanesComponent', () => {
  let component: AdminCapitanesComponent;
  let fixture: ComponentFixture<AdminCapitanesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCapitanesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCapitanesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
