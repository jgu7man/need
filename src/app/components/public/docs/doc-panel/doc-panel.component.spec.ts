import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocPanelComponent } from './doc-panel.component';

describe('DocPanelComponent', () => {
  let component: DocPanelComponent;
  let fixture: ComponentFixture<DocPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
