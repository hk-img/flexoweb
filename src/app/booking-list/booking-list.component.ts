import { Component, Inject, OnInit, PLATFORM_ID, ViewContainerRef, } from '@angular/core';
import { SpaceService } from '../services/space.service';
import { DatePipe, isPlatformBrowser } from '@angular/common';
import { environment } from 'src/environments/environment';
import {
  MatLegacyDialog as MatDialog,
  MatLegacyDialogConfig as MatDialogConfig,
  MatLegacyDialogRef as MatDialogRef,
} from '@angular/material/legacy-dialog';
import { AddReviewDialogComponent } from '../details/add-review-dialog/add-review-dialog.component';
import { LoginDialog } from '../login/login-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css'],
})
export class BookingListComponent implements OnInit {
  bookingList: any[] = [];
  aws_base_url = 'https://s3.ap-south-1.amazonaws.com/' + environment.s3_bucket_path + '/details_images/'
  bookingType: string = 'allBooking';
  public webDomain = environment.webDomain;
  dateRange = '';
  spaceType: String = '';
  bookingStatus: String = '';
  startDate: any;
  endDate: any;
  isLoading: boolean = false;
  pageNo: number = 1;
  pageSize: number = 10;
  userId: String = '';
  userGivenReviews: any = [];
  linkName:any;

  workSpace = [
    { workSpaceName: 'Coworking Space', typeOfSpace: "Coworking" },
    { workSpaceName: 'Managed Office', typeOfSpace: "Long-Term" },
    { workSpaceName: 'Private Office', typeOfSpace: "Long-Term" },
    { workSpaceName: 'Shared Office', typeOfSpace: "Long-Term" },
    { workSpaceName: 'Virtual Office', typeOfSpace: "Long-Term" },
    { workSpaceName: 'Coworking Café/Restaurant', typeOfSpace: "Short-Term" },
    { workSpaceName: 'Shoot Studio', typeOfSpace: "Short-Term" },
    { workSpaceName: 'Recording Studio', typeOfSpace: "Short-Term" },
    { workSpaceName: 'Podcast Studio', typeOfSpace: "Short-Term" },
    { workSpaceName: 'Activity Space', typeOfSpace: "Short-Term" },
    { workSpaceName: 'Sports Turf', typeOfSpace: "Short-Term" },
    { workSpaceName: 'Sports Venue', typeOfSpace: "Short-Term" },
    { workSpaceName: 'Party Space', typeOfSpace: "Short-Term" },
    { workSpaceName: 'Banquet Hall', typeOfSpace: "Short-Term" },
    { workSpaceName: 'Gallery', typeOfSpace: "Short-Term" },
    { workSpaceName: 'Classroom', typeOfSpace: "Short-Term" },
    { workSpaceName: 'Private Cabin', typeOfSpace: "Short-Term" },
    { workSpaceName: 'Meeting Room', typeOfSpace: "Short-Term" },
    { workSpaceName: 'Training Room', typeOfSpace: "Short-Term" },
    { workSpaceName: 'Event Space', typeOfSpace: "Short-Term" },
  ]
  constructor(public requestBooking_viewContainerRef: ViewContainerRef,
    @Inject(PLATFORM_ID) private platformId: any,
    public login_dialog: MatDialog,
    public login_dialogRef: MatDialogRef<any>,
    public login_viewContainerRef: ViewContainerRef,
    public addReview_dialogRef: MatDialogRef<any>,
    private toastr: ToastrService,
    public addReview_dialog: MatDialog, private _spaceService: SpaceService, private datePipe: DatePipe,) {
    if (isPlatformBrowser(this.platformId)) {
      let userData: any = localStorage.getItem('userDetails');
    userData ? (userData = JSON.parse(userData)) : '';

    this.userId = userData?.id;
    }
  }

  ngOnInit(): void {
    this.getBookingList();
  }

  getBookings(type: string) {
    this.bookingType = type;
    this.getBookingList();
  }
  dateRangeChange() {
    this.startDate = this.datePipe.transform(this.startDate, 'yyyy-MM-dd');
    this.endDate = this.datePipe.transform(this.endDate, 'yyyy-MM-dd');
    if (this.startDate && this.endDate || !this.startDate && !this.endDate) {
      this.getBookingList();
    }
  }
  getBookingList() {
    let data = {
      userId: this.userId,
      bookingType: this.bookingType,
      spaceType: this.spaceType,
      bookingStatus:this.bookingStatus,
      startDate: this.startDate,
      endDate: this.endDate
    };
    this.isLoading = true;
    this._spaceService.getBookingDetail(data).subscribe(
      (res: any) => {
        if (res?.user) {
          this.bookingList = res?.bookings || res?.upcomingBookings || res?.previousBookings;
          for (let i = 0; i < this.bookingList.length; i++) {
            let actual_name = this.bookingList[i]?.spaceName ? this.bookingList[i]?.spaceName.replace(/ /g, "-") : "";
            let location_name = this.bookingList[i]?.location_name ? this.bookingList[i]?.location_name.replace(/ /g, "-") : "";
            let link_name = `${actual_name}-${location_name}-${this.bookingList[i].spaceId}`;
            this.bookingList[i].linkName = link_name.toLowerCase();
          }
          // Initialize an empty object to store reviews with spaceId as keys
          this.userGivenReviews = {};

          // Iterate over each booking object in bookingList
          for (var i = 0; i < this.bookingList.length; i++) {
            // Get the spaceId of the current booking object
            var spaceId = this.bookingList[i].spaceId;

            // Check if the spaceId exists
            if (this.bookingList[i].review) {
              // Initialize the array at userGivenReviews[spaceId] if it doesn't exist yet
              if (!this.userGivenReviews[spaceId]) {
                this.userGivenReviews[spaceId] = [];
              }

              // Push the review object to the array at userGivenReviews[spaceId]
              this.userGivenReviews[spaceId].push(this.bookingList[i]?.review);
            }
          }

          this.isLoading = false;
        } else {
          this.isLoading = false;
        }
      },
      (error) => {
        this.isLoading = false;
      }
    );
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

  openAddReviewDialog(spaceId: any) {
  if (isPlatformBrowser(this.platformId)) {
    localStorage.setItem("space_id", spaceId);
    let isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn')) || null;
    let userDetails = JSON.parse(localStorage.getItem('userDetails')) || null;
    let spaceID = spaceId;
    if (isLoggedIn || userDetails?.accessToken) {

      // check user is given review or not 
      if (this.userGivenReviews.hasOwnProperty(spaceId)) {
        this.toastr.error('You have already given review for this space.', 'Error');
        return false;
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
          if (isPlatformBrowser(this.platformId)) {
            if ((result && result.success) || result) {
              window.location.reload();
            }
            this.addReview_dialogRef = null;
          }
        });
      }
    }
  }
  }
  
  getUserInvoiceByBookingId(bookingID:any){
    this._spaceService.getUserInvoice(bookingID).subscribe((res:any)=>{
      if(res.success){
        if (isPlatformBrowser(this.platformId)) {
        window.open(environment.apiUrl+'/'+res.pdfFilePath, '_blank');
        this.toastr.success(res.message);
        }
      }else{
        this.toastr.error(res.message);
      }
    })
  }
}
