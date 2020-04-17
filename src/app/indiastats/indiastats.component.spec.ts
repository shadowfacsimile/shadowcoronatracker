import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndiastatsComponent } from './indiastats.component';

describe('IndiastatsComponent', () => {
  let component: IndiastatsComponent;
  let fixture: ComponentFixture<IndiastatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndiastatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndiastatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
