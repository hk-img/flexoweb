import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
import { AppGlobals } from './app-globals';


@Injectable()
export class WorkstationService {

  public selectedLocationId;

  constructor(
    private http: HttpClient,
    private _appGlobals: AppGlobals
  ) {}

  private base_url = 'api/v1/common/workstation';
  private common_base_url = 'api/v1/common';
  private getAllResourcesUrl = environment.apiUrl + this.base_url +'/list';
  private addBookingDetailsUrl = environment.apiUrl + this.base_url +'/addBooking';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  private _options = {
    headers: this.headers, 
    withCredentials: true
  };

  private handleError(error: any): Promise<any> {
    // console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getAllResources (location_id): Promise<any> {
    let location_condition = location_id ? `?location_id=${this.selectedLocationId}`: '';

    return this.http.get(this.getAllResourcesUrl+location_condition,
    {
      withCredentials: true
    })
    .toPromise()
    .then(res => res)
    .catch(this.handleError);
  }
  
  addBookingDetails(booking_details): Promise<any> {
    return this.http.post(this.addBookingDetailsUrl, JSON.stringify(booking_details), this._options)
    .toPromise()
    .then(res => res)
    .catch(this.handleError);
  }
}
