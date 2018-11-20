import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueReportsComponent } from './revenue-reports.component';

describe('RevenueReportsComponent', () => {
  let component: RevenueReportsComponent;
  let fixture: ComponentFixture<RevenueReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevenueReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenueReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
