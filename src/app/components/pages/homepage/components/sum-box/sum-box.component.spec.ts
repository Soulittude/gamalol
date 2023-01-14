import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SumBoxComponent } from './sum-box.component';

describe('SumBoxComponent', () => {
  let component: SumBoxComponent;
  let fixture: ComponentFixture<SumBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SumBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SumBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
