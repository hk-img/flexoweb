import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public userDetails: BehaviorSubject<any> = new BehaviorSubject(null);
  public loginUserDetails: Observable<boolean> = this.userDetails.asObservable();
  public isLoggedInSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoggedIn: Observable<boolean> = this.isLoggedInSource.asObservable();
  constructor() {}
  loadGoogleMapsScript(): void {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.mapKey}&callback=initMap&libraries=places`;
    script.defer = true;
    script.async = true;

    // Append the script to the body of the document
    document.head.appendChild(script);
  }
}
