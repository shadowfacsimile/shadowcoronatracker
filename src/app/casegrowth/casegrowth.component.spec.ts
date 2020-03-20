import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasegrowthComponent } from './casegrowth.component';

describe('CasegrowthComponent', () => {
  let component: CasegrowthComponent;
  let fixture: ComponentFixture<CasegrowthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CasegrowthComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasegrowthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
