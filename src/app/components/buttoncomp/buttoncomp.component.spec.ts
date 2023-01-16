import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtoncompComponent } from './buttoncomp.component';

describe('ButtoncompComponent', () => {
  let component: ButtoncompComponent;
  let fixture: ComponentFixture<ButtoncompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtoncompComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtoncompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
