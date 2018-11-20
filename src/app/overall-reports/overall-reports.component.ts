import { Component, OnInit } from '@angular/core';
import { AnalyticalDataService } from '../analytical-data.service';

@Component({
  selector: 'app-overall-reports',
  templateUrl: './overall-reports.component.html',
  styleUrls: ['./overall-reports.component.css']
})
export class OverallReportsComponent implements OnInit {
    chartSessionsData = [];
    chartPageViewsData = [];
    sessions = 0;
    page_views = 0;
    session_duration = 0;
    goal_value = 0;
    goal_completions = 0;
    page_views_per_session = 0;
    avg_session_duration = 0;

data: any;
errorMessage: string;
  constructor(private analyticData: AnalyticalDataService) { }

  ngOnInit() {
    this.analyticData.getData().subscribe(
      data => {
        this.data = data;
        this.setValues();
        // console.log((this.data));
      },
      error => this.errorMessage =<any>error
    );
  }

  setValues(){
    
  }
  
}
