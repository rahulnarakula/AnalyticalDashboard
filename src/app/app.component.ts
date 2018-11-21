import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Analytics Dashboard';
  options: Object;
  data:any;
  errorMessage:string;
  dateGenerated: string;
  constructor() {
     
    
     }

     ngOnInit() {
      
    }
  
    OnDateSelected(date: string): void{
      this.dateGenerated = date;
    }
}
