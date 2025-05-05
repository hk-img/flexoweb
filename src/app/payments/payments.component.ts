import { Location, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, ViewContainerRef } from '@angular/core';
import {
  MatLegacyDialog as MatDialog,
  MatLegacyDialogConfig as MatDialogConfig,
  MatLegacyDialogRef as MatDialogRef,
} from '@angular/material/legacy-dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginDialog } from '../login/login-dialog.component';
import { SpaceService } from '../services/space.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  isLoading: boolean = false;
  response:any
  space_id:any;
  timestamp:any;
  formattedDate: string;
  hour: number;
  minute: number;
  period: string;
  public userDetails: any = null;
  public isLoggedIn: any = false;
  _window(): any {
    return window;
  }

  get nativeWindow(): any {
    if (isPlatformBrowser(this.platformId)) {
      return this._window();
    }
  }
  constructor(private router: Router,
private _activatedRoute:ActivatedRoute,
    private _location: Location,
    public login_viewContainerRef: ViewContainerRef,
    private userService: UserService,
    public login_dialog: MatDialog,
    public login_dialogRef: MatDialogRef<any>,
    private toastr: ToastrService,
    private spaceService:SpaceService,
    @Inject(PLATFORM_ID) private platformId: object

  ) {
   this.response = this._activatedRoute.snapshot.queryParams;

    if (!this.response) {
      this._location.back();
  }
}
ngOnInit(): void {
  this.space_id = this._activatedRoute.snapshot.paramMap.get('id');
  this.timestamp = this._activatedRoute.snapshot.paramMap.get('timestamp');
  this.formattedDate = this.convertTimestamp(this.timestamp);
  const { hour, minute, period } = this.extractTime(this.formattedDate);
    this.hour = hour;
    this.minute = minute;
    this.period = period;

    this.checkTimeExpiry();
}

extractTime(dateString: string): { hour: number, minute: number, period: string } {
  const date = new Date(dateString);
  let hour = date.getHours();
  const minute = date.getMinutes();
  const period = hour >= 12 ? 'PM' : 'AM';

  hour = hour % 12 || 12;

  return { hour, minute, period };
}

checkTimeExpiry(): void {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentDate = now.getDate();   // Get the current day of the month
  const currentMonth = now.getMonth(); // Get the current month (0-based index)
  const currentYear = now.getFullYear(); // Get the current year

  // Assuming `formattedDate` is in a valid date format like "YYYY-MM-DD" or any ISO-like string
  const formattedDate = new Date(this.formattedDate); // Convert `formattedDate` to Date object
  const formattedDay = formattedDate.getDate();
  const formattedMonth = formattedDate.getMonth();
  const formattedYear = formattedDate.getFullYear();
  let extractedHour = this.hour;
  const extractedMinute = this.minute;

  if (this.period === 'PM' && extractedHour !== 12) {
    extractedHour += 12;
  }
  if (this.period === 'AM' && extractedHour === 12) {
    extractedHour = 0;
  }
  
  if (
    currentYear === formattedYear &&
    currentMonth === formattedMonth &&
    currentDate === formattedDay
  ) {
    // If today's date and formattedDate are the same, proceed to check the time
    if (
      currentHour > extractedHour ||
      (currentHour === extractedHour && currentMinute > extractedMinute)
    ) {
      this.toastr.error('Link expired', 'Error');
      this.spaceService.rejectBookingonPaymentExpiry(this.space_id);
    } else {
      this.toastr.error('Please login to continue booking', 'Error');
      this.openLoginDialog();
    }
  } else {
    // If the dates don't match (either expired or a future date), you can handle the logic here
    this.toastr.error('Please login to continue booking', 'Error');
    this.openLoginDialog();
  }
}

convertTimestamp(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return date.toLocaleString();
}

openLoginDialog() {
  let config = new MatDialogConfig();
  config.viewContainerRef = this.login_viewContainerRef;
  config.panelClass = 'dialogClass-l';
  config.hasBackdrop = false;
  // config.width = '60%';
  // config.height = 'auto';


  this.login_dialog.closeAll();
  this.login_dialogRef = this.login_dialog.open(LoginDialog, config);
  this.login_dialogRef.componentInstance.flag = 1;
  this.login_dialogRef.componentInstance.ref = this.login_dialogRef;
  this.login_dialogRef.afterClosed().subscribe((result) => {
    if (result || result?.success) {
      this.initialSubscribers();
      setTimeout(() => {
        this.payment();
      }, 200);
    }
    this.login_dialogRef = null;
  });
}

private initialSubscribers(): void {
  this.userService.loginUserDetails.subscribe((user: any) => {
    // this.userDetails = user;
    this.userDetails = JSON.parse(localStorage.getItem('userDetails')) || null;
  });
  this.userService.isLoggedIn.subscribe((result: any) => {
    // this.isLoggedIn = result;
    this.isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn')) || null;
  });
}

payment() {
    this.spaceService.completeShortPayment(this.space_id).subscribe((bookingRes: any) => {
      
      if (bookingRes?.success) {
        let razerPay: any = {
          key: bookingRes?.razorpayOrder?.key_id,
          amount:  bookingRes?.razorpayOrder?.amount_paid * 100,
          currency: 'INR',
          order_id:  bookingRes?.razorpayOrder?.order_id,
          modal: {
            escape: false,
          },
          theme: {
            color: '#0c238a'
          },
          innerHeight: '80vh',
          outerHeight:'85vh'
        };
    
        razerPay.handler = ((result, error) => {
    
          razerPay.response = result;
    
          let resData = result
          resData.amount = razerPay?.amount
          resData.id = this.response?.bookingRecord?.id;

          this.spaceService.completeCoworkingPayment(resData).subscribe((bookingRes: any) => {

            if (bookingRes?.success) {
              this.toastr.success('Booking complete');
              setTimeout(() => {
                this.router.navigate(['/booking-Detail', bookingRes?.bookingId])
                // this.isLoading = false;
              }, 1500);
            } else {
              this.toastr.error(bookingRes?.message)
              this.isLoading = false;
            }
          })

    
          });
    
        razerPay.modal.ondismiss = (() => {
    
          // handle the case when user closes the form while transaction is in progress
    
          this.toastr.error('Payment failed');
          this.isLoading = false;
    
        });
    
        const rzp = new this.nativeWindow.Razorpay(razerPay);
    
        rzp.open();
        // this.toastr.success('Booking complete');
        this.toastr.success('Booking complete');
        setTimeout(() => {
          // Call the setDelay function again with the remaining times
          this.isLoading = false;
      },1500);
      } else {
        this.toastr.error(bookingRes?.message)
        this.isLoading = false;
      }
    })
}


}
