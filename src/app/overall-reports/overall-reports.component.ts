import { Component, OnInit } from '@angular/core';
import { AnalyticalDataService } from '../analytical-data.service';

@Component({
  selector: 'app-overall-reports',
  templateUrl: './overall-reports.component.html',
  styleUrls: ['./overall-reports.component.css']
})
export class OverallReportsComponent implements OnInit {
data: any;
errorMessage: string;
  constructor(private analyticData: AnalyticalDataService) { }

  ngOnInit() {
    this.analyticData.getData().subscribe(
      data => {
        this.data = data;
        // console.log((this.data));
      },
      error => this.errorMessage =<any>error
    );
  }
  
}
