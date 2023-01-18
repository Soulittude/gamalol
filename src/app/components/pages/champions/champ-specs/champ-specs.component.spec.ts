import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampSpecsComponent } from './champ-specs.component';

describe('ChampSpecsComponent', () => {
  let component: ChampSpecsComponent;
  let fixture: ComponentFixture<ChampSpecsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChampSpecsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChampSpecsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
