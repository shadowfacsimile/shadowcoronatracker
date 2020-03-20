import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountrytrendComponent } from './countrytrend.component';

describe('CountrytrendComponent', () => {
  let component: CountrytrendComponent;
  let fixture: ComponentFixture<CountrytrendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountrytrendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountrytrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
