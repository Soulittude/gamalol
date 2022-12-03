import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampstatsboxComponent } from './champstatsbox.component';

describe('ChampstatsboxComponent', () => {
  let component: ChampstatsboxComponent;
  let fixture: ComponentFixture<ChampstatsboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChampstatsboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChampstatsboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
