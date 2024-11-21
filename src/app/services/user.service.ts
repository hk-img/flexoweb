import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public userDetails: BehaviorSubject<any> = new BehaviorSubject(null);
  public loginUserDetails: Observable<boolean> = this.userDetails.asObservable();
  public isLoggedInSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoggedIn: Observable<boolean> = this.isLoggedInSource.asObservable();
  constructor() {}
  
}
