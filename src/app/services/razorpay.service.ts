import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
import { LoaderService } from './loader.service';
import { AppGlobals } from './app-globals';

declare var Razorpay: any;

@Injectable()
export class RazorpayService {

  private userDetails;
  private _spaceConfig;

  constructor(
    private _appGlobals: AppGlobals
  ) {
      this._appGlobals.spaceConfig.subscribe(spaceConfig => {
      this._spaceConfig = spaceConfig;
    });
    this._appGlobals.userDetails.subscribe(user_details => {
      this.userDetails = user_details;
    });
  }

  public  checkout (payment_details: any, callback: (payment_id: any) => any) {
    let options = {
      "key": environment.access_key,
      "amount": payment_details.total_amount*100,
      "name": this._spaceConfig.name,
      "description": payment_details.description,
      "handler": response => {
        callback(response.razorpay_payment_id);
      },
      "modal": {
        "ondismiss": () => {
          alert ("Payment is not completed");
        }
      },
      "prefill": {
        "name":  this.userDetails.name,
        "email": this.userDetails.email,
        "contact": this.userDetails.mobile,
      },
      "theme": {
        "color": this._spaceConfig.color || "blue"
      }
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
  }
}
