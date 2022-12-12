import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChamppageComponent } from './champpage.component';

describe('ChamppageComponent', () => {
  let component: ChamppageComponent;
  let fixture: ComponentFixture<ChamppageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChamppageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChamppageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
