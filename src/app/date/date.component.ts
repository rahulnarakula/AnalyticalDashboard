import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DaterangepickerConfig } from 'ng2-daterangepicker';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit {
  date ="2018/09/01 - 2018/09/10";
  @Output() datePicked: EventEmitter<string> =new EventEmitter<string>();
  public daterange: any = {};
 
    // see original project for full list of options
    // can also be setup using the config service to apply to multiple pickers
    public options: any = {
        locale: { format: 'YYYY/MM/DD' },
        alwaysShowCalendars: false,
    };
 
    public selectedDate(value: any, datepicker?: any) {
        // this is the date the iser selected
        this.date= this.formatDate(value.start._d)+" - "+this.formatDate(value.end._d);
        // // any object can be passed to the selected event and it will be passed back here
        // datepicker.start = this.formatDate(value.start._d);
        // datepicker.end = this.formatDate(value.end._d);
 
        // // or manupulat your own internal property
        // this.daterange.start = this.formatDate(value.start._d);
        // this.daterange.end = this.formatDate(value.end._d);
    }

    formatDate(date) {
      var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();
  
      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;
  
      return [year, month, day].join('/');
  }

      dateSelected(){
        this.datePicked.emit(this.date.split("/").join("-"));
      }
      constructor(private daterangepickerOptions: DaterangepickerConfig) {
        this.daterangepickerOptions.settings = {
            locale: { format: 'YYYY/MM/DD' },
            alwaysShowCalendars: false
        };
    }

  ngOnInit() {
     this.dateSelected();
  }

}
