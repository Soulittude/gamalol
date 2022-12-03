import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanestatsboxComponent } from './lanestatsbox.component';

describe('LanestatsboxComponent', () => {
  let component: LanestatsboxComponent;
  let fixture: ComponentFixture<LanestatsboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LanestatsboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanestatsboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
