import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchcontComponent } from './matchcont.component';

describe('MatchcontComponent', () => {
  let component: MatchcontComponent;
  let fixture: ComponentFixture<MatchcontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchcontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchcontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
