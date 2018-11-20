import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganicReportsComponent } from './organic-reports.component';

describe('OrganicReportsComponent', () => {
  let component: OrganicReportsComponent;
  let fixture: ComponentFixture<OrganicReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganicReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganicReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
