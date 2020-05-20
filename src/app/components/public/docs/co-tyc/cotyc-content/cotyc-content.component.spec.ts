import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CotycContentComponent } from './cotyc-content.component';

describe('CotycContentComponent', () => {
  let component: CotycContentComponent;
  let fixture: ComponentFixture<CotycContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CotycContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CotycContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
