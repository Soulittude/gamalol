import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueboxComponent } from './leaguebox.component';

describe('LeagueboxComponent', () => {
  let component: LeagueboxComponent;
  let fixture: ComponentFixture<LeagueboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeagueboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeagueboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
