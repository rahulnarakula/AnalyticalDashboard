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
line_chart_options: Object;
pie_devices_options: Object;
pie_sources_options: Object;

sessions = 0;
page_views = 0;
session_duration = 0;
goal_value = 0;
goal_completions = 0;
page_views_per_session:any = 0;
avg_session_duration:any = 0;

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

  setValues(){
  var chartSessionsData = [];
  var chartPageViewsData = [];
    for (let index in this.data['Site Sessions']) {
      let value = this.data['Site Sessions'][index];

        chartSessionsData.push({
            x: new Date(parseInt(value.DAY_WID.toString().slice(0, 4),10), parseInt(value.DAY_WID.toString().slice(4, 6),10) - 1, parseInt(value.DAY_WID.toString().slice(6, 8),10)),
            y: parseInt(value.sessions)
        });
        chartPageViewsData.push({
            x: new Date(parseInt(value.DAY_WID.toString().slice(0, 4),10), parseInt(value.DAY_WID.toString().slice(4, 6),10) - 1, parseInt(value.DAY_WID.toString().slice(6, 8),10)),
            y: parseInt(value.page_views)
        });

        this.sessions = this.sessions + parseInt(value.sessions);
        this.page_views = this.page_views + parseInt(value.page_views);
        this.session_duration = this.session_duration + parseInt(value.session_duration);
        this.goal_value = this.goal_value + parseInt(value.goal_value);
        this.goal_completions = this.goal_completions + parseInt(value.goal_completions);
        this.page_views_per_session = (this.sessions != 0) ? (this.page_views / this.sessions).toFixed(2) : 0;
        this.avg_session_duration = (this.sessions != 0) ? this.getAverageDuration(this.session_duration, this.sessions) : "0:00";
    }

  this.createAnalyticsChart(chartSessionsData, chartPageViewsData);

  var arrDevices = [];
  for (let index in this.data['DEVICE_CATEGORY']) {
    let value = this.data['DEVICE_CATEGORY'][index];
        arrDevices.push({
            y: parseInt(value.sessions),
            name: value.DEVICE_CATEGORY
        });
    }

    this.pie_devices_options = this.createPieChart('Sessions', arrDevices);
    // $(".highcharts-background").attr("fill", "#081f32");
    // $("#pieChartContainer1 svg").css("height", "250px");

    var arrMediums = [];
    for (let index in this.data['MEDIUM']) {
      let value = this.data['MEDIUM'][index];
        arrMediums.push({
            y: parseInt(value.sessions),
            name: value.MEDIUM
        });
    }

    this.pie_sources_options = this.createPieChart('Sessions', arrMediums);
  
}
  createAnalyticsChart(chartSessionsData: any[], chartPageViewsData: any[]) {
    this.line_chart_options = {
      
      title : { text : 'Angular 2 high charts example with selection event ' },
    
          chart: {
            backgroundColor: "#081f32",
            type: 'line'
        },
        legend: {
          layout: 'vertical',
          align: 'left',
          verticalAlign: 'top',
          x: 150,
          y: 100,
          floating: true,
          borderWidth: 1,
          backgroundColor: '#FFFFFF'
      },
      xAxis: {
          type: 'datetime'
      },
      tooltip: {
          shared: true,
      },
      credits: {
          enabled: false
      },
      plotOptions: {
          areaspline: {
              fillOpacity: 0.5,
      animationLimit: 'Infinity',
      boostThreshold: 0	
          }
      },
      series: [{
        name: 'Sessions',
        marker: {
            symbol: 'circle'
        },
        data: chartSessionsData,
        color: '#edcb21'
    },
    {
        name: 'Page Views',
        marker: {
            symbol: 'diamond'
        },
        data: chartPageViewsData,
        color: '#d64c1a'
    }]
   
       };
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

createPieChart(seriesName, data): Object {
  var pie_options = {
      chart: {
          plotBackgroundColor: "#081f32",
          backgroundColor: "#081f32",
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
      },
      title: {
          text: ''
      },
      tooltip: {
          headerFormat: '<span style="font-size:22px; ">{point.key}</span><br/><br/>',
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
          style: {
              fontSize:'22px'
          }
      },
      legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'top',
          itemStyle: {
              color: 'white',
              fontSize: '22px'
          },
          itemHoverStyle: {
              color: '#DCC',
              fontSize: '24px'
          }
          
      },
      plotOptions: {
          pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                  enabled: false
              },
              showInLegend: true
          }
      },
      series: [{
              name: seriesName,
              colorByPoint: true,
              data: data
          }],

      responsive: {
          rules: [{
              condition: {
                  maxWidth: 600
              },
              chartOptions: {
                  legend: {
                      align: 'center',
                      verticalAlign: 'bottom',
                      layout: 'horizontal',
                      maxHeight: '18px',
                      itemStyle: {
                          fontSize:  "14px"
                      },
                      itemHoverStyle: {
                          fontSize:  "16px" 
                      }
                  }
              }
          }]
      }
  }
  return pie_options;
}
  
}
