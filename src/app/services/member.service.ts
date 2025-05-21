import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
// import { AppGlobals } from './app-globals';

@Injectable()
export class MemberService {
  public space_id;
  public member_id;

  constructor(
    private http: HttpClient // private _appGlobals: AppGlobals
  ) {
    // this._appGlobals.spaceConfig.subscribe(details => {
    //   this.space_id = details.id;
    // })
    // this._appGlobals.userDetails.subscribe(details => {
    //   this.member_id = details.member_id;
    // })
  }

  private base_url = '/api/v1/common/member';
  private common_base_url = '/api/v1/common';
  private addDetailsUrl = environment.apiUrl + '/api/v1/createWorker';
  private addDetailsManagerUrl = environment.apiUrl + '/api/v1/createManager';
  private getBillingDetailsUrl =
    environment.apiUrl + this.base_url + '/billing_details';
  private updateDetailsUrl =
    environment.apiUrl + this.common_base_url + '/updateMemberDetails';
  private verifyOTPAndSearchUrl =
    environment.apiUrl + '/api/v1/verifyOTPAndSearch';
  private verifyOTPAndSearchManagerUrl =
    environment.apiUrl + '/api/v1/verifyOTPAndSearchManager';
  private sendOTPUrl = environment.apiUrl + '/api/v1/user/sendOTP';
  private verifyOTPUrl = environment.apiUrl + '/api/v1/user/verifyOTP';
  private queryUrl = environment.apiUrl + '/api/v1/queries/add';
  private workerDetailsUrl = environment.apiUrl + '/api/v1/worker/getDetails';
  private updateWorkerUrl = environment.apiUrl + '/api/v1/worker/update_info';
  private forgotPasswordUrl =
    environment.apiUrl + '/api/v1/user/workerForgotPassword';
  private loginUrl = environment.apiUrl + '/api/v1/user/login';
  private addWorkerUrl = environment.apiUrl + '/api/v1/user/addWorker';
  private SigninUrl = environment.apiUrl + '/api/v1/user/signup';
  private getBasicInfoUrl = environment.apiUrl + '/api/v1/worker/basic_info';
  private updateShortlistsUrl =
    environment.apiUrl + '/api/v1/worker/updateShortlists';
  private updateWorkerPasswordUrl =
    environment.apiUrl + '/api/v1/user/updateWorkerPassword';
  private submitContactFormUrl =
    environment.apiUrl + '/api/v1/worker/contactForm';
  private checkTeamcabinBookingUrl =
    environment.apiUrl + '/api/v1/bookings/checkTeamcabinBooking';
  private qouteAttempted = environment.apiUrl + '/api/v1/user/qouteAttempted';
  private markAsVerifiedUrl = environment.apiUrl + '/api/v1/user/markAsVerified';
  private markAsNotVerifiedUrl =
    environment.apiUrl + '/api/v1/user/markAsNotVerified';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('authToken')
  });

  private _options = {
    headers: this.headers,
    withCredentials: true,
  };

  private handleError(error: any): Promise<any> {
    // console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  addDetails(member_details): Promise<any> {
    member_details.space_id = this.space_id;
    return this.http
      .post(this.addDetailsUrl, JSON.stringify(member_details), this._options)
      .toPromise()
      .then((res) => res)
      .catch(this.handleError);
  }

  forgotPassword(mobile: string): Promise<any> {
    return this.http
      .post(
        this.forgotPasswordUrl,
        JSON.stringify({ mobile: mobile }),
        this._options
      )
      .toPromise()
      .then((res) => res)
      .catch(this.handleError);
  }

  updateWorkerPassword(mobile: string, password: string): Promise<any> {
    return this.http
      .post(
        this.updateWorkerPasswordUrl,
        JSON.stringify({ mobile, password }),
        this._options
      )
      .toPromise()
      .then((res) => res)
      .catch(this.handleError);
  }

  checkTeamcabinBooking(details): Promise<any> {
    return this.http
      .post(
        this.checkTeamcabinBookingUrl,
        JSON.stringify(details),
        this._options
      )
      .toPromise()
      .then((res) => res)
      .catch(this.handleError);
  }

  addDetailsManager(member_details): Promise<any> {
    // member_details.space_id = this.space_id;
    return this.http
      .post(
        this.addDetailsManagerUrl,
        JSON.stringify(member_details),
        this._options
      )
      .toPromise()
      .then((res) => res)
      .catch(this.handleError);
  }

  login(member_details): Promise<any> {
    // member_details.space_id = this.space_id;
    return this.http
      .post(this.loginUrl, JSON.stringify(member_details), this._options)
      .toPromise()
      .then((res) => res)
      .catch(this.handleError);
  }

  signup(member_details): Promise<any> {
    // member_details.space_id = this.space_id;
    member_details.type = 1;
    return this.http
      .post(this.SigninUrl, JSON.stringify(member_details), this._options)
      .toPromise()
      .then((res) => res)
      .catch(this.handleError);
  }

  addWorker(member_details): Promise<any> {
    return this.http
      .post(this.addWorkerUrl, JSON.stringify(member_details), this._options)
      .toPromise()
      .then((res) => res)
      .catch(this.handleError);
  }

  getBasicInfo(): Promise<any> {
    return this.http
      .get(this.getBasicInfoUrl, this._options)
      .toPromise()
      .then((res) => res)
      .catch(this.handleError);
  }

  addShortlists(id): Promise<any> {
    return this.http
      .post(
        this.updateShortlistsUrl,
        JSON.stringify({ space_id: id }),
        this._options
      )
      .toPromise()
      .then((res) => res)
      .catch(this.handleError);
  }

  submitContactForm(details): Promise<any> {
    return this.http
      .post(this.submitContactFormUrl, JSON.stringify(details), this._options)
      .toPromise()
      .then((res) => res)
      .catch(this.handleError);
  }

  updateDetails(member_details): Promise<any> {
    member_details.member_id = this.member_id;
    return this.http
      .put(this.updateDetailsUrl, JSON.stringify(member_details), this._options)
      .toPromise()
      .then((res) => res)
      .catch(this.handleError);
  }

  updateWorker(member_details): Promise<any> {
    // member_details.member_id = this.member_id;
    return this.http
      .put(this.updateWorkerUrl, JSON.stringify(member_details), this._options)
      .toPromise()
      .then((res) => res)
      .catch(this.handleError);
  }

  getBillingDetails(): Promise<any> {
    return this.http
      .get(
        this.getBillingDetailsUrl +
          `?space_id=${this.space_id}&member_id=${this.member_id}`,
        this._options
      )
      .toPromise()
      .then((res) => res)
      .catch(this.handleError);
  }

  getWorkerDetails(): Promise<any> {
    return this.http
      .get(this.workerDetailsUrl, this._options)
      .toPromise()
      .then((res) => res)
      .catch(this.handleError);
  }

  sendOTP(mobile_obj): Promise<any> {
    return this.http
      .post(this.sendOTPUrl, JSON.stringify(mobile_obj), this._options)
      .toPromise()
      .then((res) => res)
      .catch(this.handleError);
  }

  verifyOTP(mobile_obj): Promise<any> {
    return this.http
      .post(this.verifyOTPUrl, JSON.stringify(mobile_obj), this._options)
      .toPromise()
      .then((res) => res)
      .catch(this.handleError);
  }

  verifyOTPAndSearch(details): Promise<any> {
    details.space_id = this.space_id;
    return this.http
      .post(this.verifyOTPAndSearchUrl, JSON.stringify(details), this._options)
      .toPromise()
      .then((res) => res)
      .catch(this.handleError);
  }

  verifyOTPAndSearchManager(details): Promise<any> {
    // details.space_id = this.space_id;
    return this.http
      .post(
        this.verifyOTPAndSearchManagerUrl,
        JSON.stringify(details),
        this._options
      )
      .toPromise()
      .then((res) => res)
      .catch(this.handleError);
  }

  addQuery(details): Promise<any> {
    return this.http
      .post(this.queryUrl, JSON.stringify(details), this._options)
      .toPromise()
      .then((res) => res)
      .catch(this.handleError);
  }

  qouteAttempte(data): Observable<any> {
    return this.http.post(this.qouteAttempted, data);
  }

  markAsVerified(data): Observable<any> {
    return this.http.post(this.markAsVerifiedUrl, data);
  }
  markAsNotVerified(data): Observable<any> {
    return this.http.post(this.markAsNotVerifiedUrl, data);
  }
}
