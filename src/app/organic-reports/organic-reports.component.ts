import { Component, OnInit } from '@angular/core';
import { AnalyticalDataService } from '../analytical-data.service';

@Component({
  selector: 'app-organic-reports',
  templateUrl: './organic-reports.component.html',
  styleUrls: ['./organic-reports.component.css']
})
export class OrganicReportsComponent implements OnInit {

  organic_sessions = 0;
  organic_page_views = 0;
  organic_session_duration = 0;
  organic_goal_value = 0;
  organic_goal_completions = 0;
  organic_pages_per_session:any = 0;
  organic_avg_session_duration:any = 0;
  data: any;
  errorMessage: any;  
  landingPageTableHtml = '';
  
  constructor(private analyticData: AnalyticalDataService) { }

  ngOnInit() {
    this.analyticData.getData().subscribe(
      data => {
        this.data = data;
        this.setValues();
      },
      error => this.errorMessage =<any>error
    );
  }

  setValues() {
    for (let index in this.data['MEDIUM']) {
      let value = this.data['MEDIUM'][index];
        if (value.MEDIUM == "organic" || value.MEDIUM == "Organic Search") {
            this.organic_sessions = parseInt(value.sessions);
            this.organic_page_views = parseInt(value.page_views);
            this.organic_session_duration = parseFloat(value.session_duration);
            this.organic_goal_value = parseFloat(value.goal_value);
            this.organic_goal_completions = parseFloat(value.goal_completions);
        }
    };
    this.organic_pages_per_session = (this.organic_sessions != 0) ? (this.organic_page_views / this.organic_sessions).toFixed(2) : "0.00";
    this.organic_avg_session_duration = (this.organic_sessions != 0) ? this.getAverageDuration(this.organic_session_duration, this.organic_sessions) : "0:00";    

    var sessions = 0;
    for (let index in this.data['Site Sessions']) {
      let value = this.data['Site Sessions'][index];
        sessions = sessions + parseInt(value.sessions);
    }
    for (let index in this.data['LANDING_PAGE']) {
      let value = this.data['LANDING_PAGE'][index];
        var sessionPercentage = (parseInt(value.sessions) / sessions) + ". " + (parseInt(value.sessions) % sessions);
        sessionPercentage = (parseFloat(sessionPercentage) * 100).toFixed(2);
        this.landingPageTableHtml += '<tr><td>' + value.LANDING_PAGE + '</td><td>' + this.commaSeparateNumber(value.sessions) + '  (' + sessionPercentage + '%)</td></tr>';

    }
  }

  commaSeparateNumber(val): any{
    while (/(\d+)(\d{3})/.test(val.toString())){
      val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
    }
    return val;
  }

  getAverageDuration(session_duration, sessions) {
    var avg_session_duration = (session_duration / (sessions * 60)) + "." + (session_duration % (sessions * 60));
    var minutes_value = avg_session_duration.substr(avg_session_duration.indexOf(".") + 1);
    var hours = avg_session_duration.substr(0, avg_session_duration.indexOf("."));
    var minutes = parseFloat(minutes_value) * 60 / 100;
    var minutesText = minutes.toString();
    minutesText = minutesText.substr(0, 2);  
    var duration = hours + ":" + minutesText;
  
    return duration;
  }

}
