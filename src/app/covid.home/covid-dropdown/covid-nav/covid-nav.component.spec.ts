import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidNavComponent } from './covid-nav.component';

describe('CovidNavComponent', () => {
  let component: CovidNavComponent;
  let fixture: ComponentFixture<CovidNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CovidNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
