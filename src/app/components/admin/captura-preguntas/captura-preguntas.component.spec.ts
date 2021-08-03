import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturaPreguntasComponent } from './captura-preguntas.component';

describe('CapturaPreguntasComponent', () => {
  let component: CapturaPreguntasComponent;
  let fixture: ComponentFixture<CapturaPreguntasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapturaPreguntasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturaPreguntasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
