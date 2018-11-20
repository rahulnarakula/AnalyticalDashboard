import { Component, OnInit } from '@angular/core';

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
  organic_pages_per_session = 0;
  organic_avg_session_duration = 0;
  
  constructor() { }

  ngOnInit() {
  }

}
