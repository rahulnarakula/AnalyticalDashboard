import { Component, OnInit } from '@angular/core';
import { AnalyticalDataService } from '../analytical-data.service';

@Component({
  selector: 'app-revenue-reports',
  templateUrl: './revenue-reports.component.html',
  styleUrls: ['./revenue-reports.component.css']
})
export class RevenueReportsComponent implements OnInit {
  data: any;
  errorMessage: any;
  goalCompletionsTableHtml = '';
  pie_sources_options: Object;

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

  setValues(): any {
    
    var arrSources = [];
    for (let index in this.data['SOURCE']) {
      let value = this.data['SOURCE'][index];
        arrSources.push({
            y: parseInt(value.sessions),
            name: value.SOURCE + " / " + value.MEDIUM
        });
    }

    this.pie_sources_options = this.createPieChart('Sessions', arrSources);
    
    for (let index in this.data['CITY_NAME']) {
      let value = this.data['CITY_NAME'][index];
        this.goalCompletionsTableHtml += '<tr><td>' + value.CITY_NAME + '</td>' +
                                    '<td>' + this.commaSeparateNumber(value.goal_completions) + '</td>' +
                                    '<td>' + "$" + this.commaSeparateNumber(value.goal_value) + '</td></tr>';

    }
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

  commaSeparateNumber(val): any{
    while (/(\d+)(\d{3})/.test(val.toString())){
      val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
    }
    return val;
  }

}
