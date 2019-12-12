import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoInfoComponent } from './co-info.component';

describe('CoInfoComponent', () => {
  let component: CoInfoComponent;
  let fixture: ComponentFixture<CoInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
