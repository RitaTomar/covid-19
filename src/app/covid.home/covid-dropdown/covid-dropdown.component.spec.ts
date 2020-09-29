import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidDropdownComponent } from './covid-dropdown.component';

describe('CovidDropdownComponent', () => {
  let component: CovidDropdownComponent;
  let fixture: ComponentFixture<CovidDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CovidDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
