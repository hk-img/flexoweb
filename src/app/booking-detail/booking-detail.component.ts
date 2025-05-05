import { DatePipe, isPlatformBrowser, Location } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, ViewContainerRef } from '@angular/core';
import {
  MatLegacyDialog as MatDialog,
  MatLegacyDialogConfig as MatDialogConfig,
  MatLegacyDialogRef as MatDialogRef,
} from '@angular/material/legacy-dialog';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { AddReviewDialogComponent } from '../details/add-review-dialog/add-review-dialog.component';
import { SpaceService } from '../services/space.service';
import { DialogConfirmationPopUp } from '../shared/component/dialog-confirmation-popup/dialog-confirmation-popup.component';
@Component({
  selector: 'app-booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.css'],
})
export class BookingDetailComponent implements OnInit {
  bookingId: string = '';
  isLoading: boolean = false;
  bookingDetail: any
  userGivenReview: any;
  bookingPeriod: any = [];
  paymentDetail: any = [];
  totalHours: any;
  formattedDates: any = [];
  constructor(public requestBooking_viewContainerRef: ViewContainerRef,@Inject(PLATFORM_ID) private platformId: any,
    public login_dialog: MatDialog,
    public login_dialogRef: MatDialogRef<any>,
    public login_viewContainerRef: ViewContainerRef,
    public addReview_dialogRef: MatDialogRef<any>,
    public addReview_dialog: MatDialog, private _route: ActivatedRoute,
    private location: Location,
    private datePipe: DatePipe,
    private _spaceService: SpaceService, private toastr: ToastrService
  ) {
    this.bookingId = this._route.snapshot.params['id'];
    if (!this.bookingId) {
      this.location.back();
    }
  }

  ngOnInit(): void {
    this.getbookingDetailById(this.bookingId);
  }

  // openLoginDialog() {
  //   let config = new MatDialogConfig();
  //   config.viewContainerRef = this.login_viewContainerRef;
  //   config.panelClass = 'dialogClass-l';
  //   // config.height = '520px';
  //   // config.width = '60%';

  //   this.login_dialogRef = this.login_dialog.open(LoginDialog, config);
  //   this.login_dialogRef.componentInstance.ref = this.login_dialogRef;
  //   this.login_dialogRef.componentInstance.flag = 1;
  //   // this.login_dialogRef.componentInstance.selected_teamcabin = teamcabin_obj;
  //   // this.login_dialogRef.componentInstance.action_type = action_type;
  //   this.login_dialogRef.afterClosed().subscribe((result) => {
  //     if ((result && result.success) || result) {
  //       window.location.reload();
  //     }
  //     this.login_dialogRef = null;
  //   });
  // }

  getbookingDetailById(bookingId) {
    this.isLoading = true;
    this._spaceService.getBookingDetailById(bookingId).subscribe(
      (res: any) => {
        this.bookingDetail = res?.booking?.booking[0];
        this.userGivenReview = res?.booking?.rating;
        this.isLoading = false;
        if (this.bookingDetail?.bookingPeriods) {
          this.bookingPeriod = this.bookingDetail?.bookingPeriods;
          this.formattedDates = this.bookingPeriod.map(date => moment(date).format('DD-MM-YYYY'));
        }

        this.paymentDetail = JSON.parse(this.bookingDetail?.payment_detail);
        // if (res?.success) {
        // } else {
        //   this.isLoading = false;
        // }
      },
      (error) => {
        this.isLoading = false;
      }
    );

  }

  getUserInvoiceByBookingId(bookingID: any) {
    this._spaceService.getUserInvoice(bookingID).subscribe((res: any) => {
      if (res.success) {
        window.open(environment.apiUrl + '/' + res.pdfFilePath, '_blank');
        this.toastr.success(res.message);
      } else {
        this.toastr.error(res.message);
      }
    })
  }

  formatTimestamp(timestamp: number, type): string {
    if (type == 'date') {

      return this.datePipe.transform(timestamp * 1000, 'dd-MM-yyyy');
    } else {
      return this.datePipe.transform(timestamp * 1000, 'shortTime');
    }
  }

  calculateHourDifference(startTime: string, endTime: string) {
    let [startHourInteger, startMinute] = startTime.split(":").map(Number);
    let [endHourInteger, endMinute] = endTime.split(":").map(Number);
  
    // Handle cases where minutes are missing
    if (isNaN(startMinute)) {
      startMinute = 0;
    }
    if (isNaN(endMinute)) {
      endMinute = 0;
    }
  
    // Special case: if startTime and endTime are both 00:00, return 24 hours
    if (startHourInteger === 0 && startMinute === 0 && endHourInteger === 0 && endMinute === 0) {
      return 24;
    }
  
    // Convert hours to minutes and add minutes
    const startTotalMinutes = startHourInteger * 60 + startMinute;
    const endTotalMinutes = endHourInteger * 60 + endMinute;
  
    // Calculate time difference in minutes
    let timeDifferenceInMinutes = endTotalMinutes - startTotalMinutes;
  
    // Handle negative time difference (if endTime is past midnight)
    if (timeDifferenceInMinutes < 0) {
      timeDifferenceInMinutes += 24 * 60; // Add 24 hours in minutes
    }
  
    // Return time difference in hours
    return timeDifferenceInMinutes / 60;
  }
  

  formatTime(timeStr: any) {
    if (!timeStr) return '';

    const [hours, minutes] = timeStr.split(':');
    const hoursInt = parseInt(hours, 10);
    const period = hoursInt >= 12 ? 'PM' : 'AM';
    const hours12 = hoursInt % 12 || 12;
    return `${hours12}:${minutes} ${period}`;
  }

  openAddReviewDialog(spaceID: any) {
    if (isPlatformBrowser(this.platformId)) {
    localStorage.setItem("space_id", spaceID);
    let isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn')) || null;
    let userDetails = JSON.parse(localStorage.getItem('userDetails')) || null;
    if (isLoggedIn || userDetails?.accessToken) {

      // check user is given review or not
      if (userDetails != null && userDetails.id) {

        if (this.userGivenReview) {
          this.toastr.error('You have already given review for this space.', 'Error');
          return false;
        }

      }

      let config = new MatDialogConfig();
      config.viewContainerRef = this.requestBooking_viewContainerRef;
      config.panelClass = 'dialogClass-l';
      // config.width = '100%';
      config.data = {
        spaceId: localStorage.getItem("space_id"),
      };

      // Ensure that this.requestBooking_dialogRef is properly initialized
      // after calling this.requestBooking_dialog.open()
      this.addReview_dialogRef = this.addReview_dialog.open(
        AddReviewDialogComponent,
        config
      );

      // Make sure to check if this.requestBooking_dialogRef is not undefined
      // before accessing its properties or methods
      if (this.addReview_dialogRef) {
        this.addReview_dialogRef.componentInstance.ref =
          this.addReview_dialogRef;
        this.addReview_dialogRef.componentInstance.flag = 1;

        // Ensure proper handling of the afterClosed() subscription
        this.addReview_dialogRef.afterClosed().subscribe((result) => {
          if ((result && result.success) || result) {
            window.location.reload();
          }
          this.addReview_dialogRef = null;
        });
      }
    } else {
      // this.openLoginDialog();
    }
  }
  }


  cancelConfirmation(details: any) {
    let payload = {
      title: 'Cancel Booking',
      price: details.bookingPrice
    };
    const dialogRef = this.login_dialog.open(DialogConfirmationPopUp, {
      width: '500px',
      data :payload
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let payload = {
          title: 'Cancel Booking',
          message: 'Are you sure you want to cancel this booking?',
        };
        const dialog_Ref = this.login_dialog.open(DialogConfirmationPopUp, {
          width: '500px',
          data:payload
        });
        dialog_Ref.afterClosed().subscribe((result) => {
          if (result) {
            this._spaceService.cancelUserBooking(this?.bookingId).subscribe((res:any)=>{
              if(res?.success){
                this.toastr.success(res?.message)
              }else{
                this.toastr.error(res?.message)
              }
            })
          }
        })
      }
    });
  }



}
