import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CumbaButtonComponent } from './cumba-button.component';

describe('CumbaButtonComponent', () => {
  let component: CumbaButtonComponent;
  let fixture: ComponentFixture<CumbaButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CumbaButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CumbaButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
