import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteEventoComponent } from './delete-evento.component';

describe('DeleteEventoComponent', () => {
  let component: DeleteEventoComponent;
  let fixture: ComponentFixture<DeleteEventoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteEventoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
