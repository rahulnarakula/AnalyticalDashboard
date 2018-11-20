import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ChartModule }     from 'angular2-highcharts'; 
import { platformBrowserDynamic }  from '@angular/platform-browser-dynamic';

import { AppComponent } from './app.component';
import { DateComponent } from './date/date.component';
import { OverallReportsComponent } from './overall-reports/overall-reports.component';
import { OrganicReportsComponent } from './organic-reports/organic-reports.component';
import { RevenueReportsComponent } from './revenue-reports/revenue-reports.component';

declare var require:any;

@NgModule({
  declarations: [
    AppComponent,
    DateComponent,
    OverallReportsComponent,
    OrganicReportsComponent,
    RevenueReportsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ChartModule.forRoot(require('highcharts'))
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);