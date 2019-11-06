import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoAddImagenComponent } from './co-add-imagen.component';

describe('CoAddImagenComponent', () => {
  let component: CoAddImagenComponent;
  let fixture: ComponentFixture<CoAddImagenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoAddImagenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoAddImagenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
