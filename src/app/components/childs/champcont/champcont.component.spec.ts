import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampcontComponent } from './champcont.component';

describe('ChampcontComponent', () => {
  let component: ChampcontComponent;
  let fixture: ComponentFixture<ChampcontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChampcontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChampcontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
