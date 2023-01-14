import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchBoxComponent } from './match-box.component';

describe('MatchBoxComponent', () => {
  let component: MatchBoxComponent;
  let fixture: ComponentFixture<MatchBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
