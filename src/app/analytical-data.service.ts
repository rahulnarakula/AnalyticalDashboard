import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnalyticalDataService {

  private dataURL = 'http://172.16.1.154:8089/getAnalytics';
  getData(): Observable<any> {
    return this.http.post(this.dataURL,{
      "Cust_id" : 14001,
                "Filters" : {"Analytics" : "Google_Analytics","Dimensions" : ["DEVICE_CATEGORY","LANDING_PAGE", "MEDIUM"],
                    "Metrics" : ["Sessions", "Bounce Rate"],
                    "Start_Date" : "2017-05-01",
                    "End_Date" : "2017-05-28"}
    }).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
  constructor(private http:HttpClient) { }
}
