import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export class Location {
  id: number;
  name: string;
  tnc_link: string;
}

export class UserDetails {
  is_logged_in: boolean;
  shortlists: Array<number>;
}


export class BookingDetails {

}
export class UserLocation {
  lat: any;
  long: any;
}

@Injectable()
export class AppGlobals {

  // use this property for property binding
  public bookingDetailsObject: BehaviorSubject<BookingDetails> = new BehaviorSubject({});

  public userDetails: BehaviorSubject<UserDetails> = new BehaviorSubject({
    is_logged_in: null,
    shortlists: []
  });

  public userLocation: BehaviorSubject<UserLocation> = new BehaviorSubject({
    lat: 0,
    long: 0
  })

  public lastInvoiceNo: BehaviorSubject<number> = new BehaviorSubject<number>(1);

  public locationsArray: BehaviorSubject<Location[]> = new BehaviorSubject([]);

  setLastInvoiceNo(invoiceNo) {
    this.lastInvoiceNo.next(invoiceNo);
  };

  setLocationsArray(locations) {
    this.locationsArray.next(locations);
  };

  setBookingDetails(booking) {
    this.bookingDetailsObject.next(booking)
  };

  setUserLocation(userLocation) {
    this.userLocation.next(userLocation)
  };

  setUserDetails(user_details) {
    this.userDetails.next(user_details);
  };

  setHeaders(){
    let newHeaders = new HttpHeaders();
    let userData:any = JSON.parse(localStorage.getItem('userDetails'));
    let authToken = localStorage.getItem('authToken') || userData?.accessToken;
    let headers = newHeaders.set('Authorization', authToken);
    return headers;
  }

  public behaveClick = new BehaviorSubject<Object>('');

  /** Set Behavior click*/
  setBehaviorClick(behave: object) {
    this.behaveClick.next(behave);
  }
  
  /** Get Behavior click */
  getBehaviorClick(): Observable<object> {
    return this.behaveClick.asObservable();
  }
}
