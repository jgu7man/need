import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostulacionExitosaComponent } from './postulacion-exitosa.component';

describe('PostulacionExitosaComponent', () => {
  let component: PostulacionExitosaComponent;
  let fixture: ComponentFixture<PostulacionExitosaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostulacionExitosaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostulacionExitosaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
