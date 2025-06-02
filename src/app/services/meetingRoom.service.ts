import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
import { AppGlobals } from './app-globals';


@Injectable()
export class MeetingRoomService {

  public space_id;
  public member_id;

  constructor(
    private http: HttpClient,
    private _appGlobals: AppGlobals
  ) {
    this._appGlobals.spaceConfig.subscribe(details => {
      this.space_id = details.id;
    })
    this._appGlobals.userDetails.subscribe(details => {
      this.member_id = details.member_id;
    })
  }

  private base_url = 'api/v1/common/meetingRoom';
  private common_base_url = 'api/v1/common';
  private getAllResourcesUrl = environment.apiUrl + this.base_url +'/list';
  private getAllLocationsUrl = environment.apiUrl + this.base_url +'/locations';
  private getAllSlotsUrl = environment.apiUrl + this.base_url +'/bookings';
  private getAllBookingsUrl = environment.apiUrl + this.base_url +'/bookingsByMember';
  private getAllBookingsByResourceIdUrl = environment.apiUrl + this.base_url +'/bookingsByResourceId';
  private updateBookingDetailsUrl = environment.apiUrl + this.base_url +'/updateBooking';
  private addBookingDetailsUrl = environment.apiUrl +'api/v1/bookings/addWorkStationAndTeamCabin';
  private addDayPassUrl = environment.apiUrl +'api/v1/bookings/addDayPass';
  private getPlansUrl = environment.apiUrl +'api/v1/bookings/getAllPlans';
  private buyPlanUrl = environment.apiUrl +'api/v1/bookings/buyPlan';
  private addMeetingRoomBookingDetailsUrl = environment.apiUrl + this.base_url +'/addBookingAndSendInvoice';
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

  getAllSlots (booking_params): Promise<any> {
    return this.http.get(this.getAllSlotsUrl + `?resource_id=${booking_params.resource_id}&date=${booking_params.date}&open_time=${booking_params.open_time}&close_time=${booking_params.close_time}`,
    {
      withCredentials: true
    })
    .toPromise()
    .then(res => res)
    .catch(this.handleError);
  }

  getAllResources (location_id): Promise<any> {
    return this.http.get(this.getAllResourcesUrl + '?space_id=' + this.space_id, {withCredentials: true})
    .toPromise()
    .then(res => res)
    .catch(this.handleError);
  }
  
  addWorkstationAndTeamCabin(details): Promise<any> {
    return this.http.post(this.addBookingDetailsUrl, JSON.stringify(details), this._options)
    .toPromise()
    .then(res => res)
    .catch(this.handleError);
  }

  addDayPass(details): Promise<any> {
    return this.http.post(this.addDayPassUrl, JSON.stringify(details), this._options)
    .toPromise()
    .then(res => res)
    .catch(this.handleError);
  }

  buyPlan(details): Promise<any> {
    return this.http.post(this.buyPlanUrl, JSON.stringify(details), this._options)
    .toPromise()
    .then(res => res)
    .catch(this.handleError);
  }

  getAllLocations (): Promise<any> {
    return this.http.get(this.getAllLocationsUrl,
    {
      withCredentials: true
    })
    .toPromise()
    .then(res => res)
    .catch(this.handleError);
  }

  getAllPlans (): Promise<any> {
    return this.http.get(this.getPlansUrl, {withCredentials: true})
    .toPromise()
    .then(res => res)
    .catch(this.handleError);
  }
}
