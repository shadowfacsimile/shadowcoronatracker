import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountrydeathtrendComponent } from './countrydeathtrend.component';

describe('CountrydeathtrendComponent', () => {
  let component: CountrydeathtrendComponent;
  let fixture: ComponentFixture<CountrydeathtrendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountrydeathtrendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountrydeathtrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
