import { Component } from '@angular/core';

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
  constructor() {
     
    
     }

     ngOnInit() {
      
    }
  
    
}
