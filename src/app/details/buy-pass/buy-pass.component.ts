import { DatePipe, isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef, } from '@angular/material/legacy-dialog';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { ProfileManagementService } from 'src/app/profile-management/profile-management.service';
import { SpaceService } from 'src/app/services/space.service';
import { ThankyopopupComponent } from 'src/app/thankyopopup/thankyopopup.component';
import { environment } from 'src/environments/environment';
declare var $:any;

@Component({
  selector: 'app-buy-pass',
  templateUrl: './buy-pass.component.html',
  styleUrls: ['./buy-pass.component.css']
})
export class BuyPassComponent {
  @ViewChild('picker', { static: true }) _picker: MatDatepicker<Date>;
  public dateClass = (date: Date) => {
    if (this._findDate(date) !== -1) {
      return [ 'selected' ];
    }
    return [ ];
  }
  public spaceId: any;
  public init = new Date();
  public user: any;
  public aws_base_url =
    'https://s3.ap-south-1.amazonaws.com/' +
    environment.s3_bucket_path +
    '/details_images/';
  public bookingCard: any;
  originalPrice: any;
  noOfGuest: any;
  ofDays: any;
  valGstPanForm: boolean=true;
  totalHours: any;
  bookingPrice: any
  startDate: any = new Date();
  spaceName: any;
  landmark: any;
  public space_details;
  minDate: Date = new Date();
  selectedDate: Date;
  isFormSubmitted: boolean = false;
  isLoading: boolean = false;
  public dayPassForm: UntypedFormGroup;
  public ref;
  public CLOSE_ON_SELECTED = false;

  public model: Date[] = [
  ];
  public resetModel = new Date(0);
  public passOptions: [];
  public dayOptions: [];
  panErrorMsg: string;
  gstErrorMsg: string;
  GSTnumber: any;
  PANnumber: any;
  userDetail: any;
  billingAddress: any;
  billingAddress2: any;
  billingMsg: string;
  startTime: any;
  endTime: any; 
  filteredStartTimes = [];
  selectedDay: any;
  currentDay: string;
  location_name: any;
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<any>,
    private fb: UntypedFormBuilder,
    private router: Router,
    private cd: ChangeDetectorRef,
    private spaceService: SpaceService,
    private toastr: ToastrService,
    private datePipe: DatePipe,
    private profileService:ProfileManagementService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(PLATFORM_ID) private platformId: object
  ) {

    
    this.minDate = new Date();

    let user = localStorage.getItem('userDetails') || ''
    this.userDetail = JSON.parse(localStorage.getItem('userDetails') || '');
    if (user) {
      this.user = JSON.parse(user)
    }

    this.dayOptions = this.dayListOptions(30);
    this.passOptions = this.dayListOptions(1000);

  }

  dayListOptions(value: number) {
    let data: any = []
    for (let i = 1; i <= value; i++) {
      data.push(i);
    }
    return data
  }


  _window(): any {

    // return the global native browser window object

    return window;

  }
  public closeDialog(options) {
    this.ref.close(options);
  }
  ngOnInit(): void {
    
    this.dayPassForm = this.fb.group({
      firstName: [
        this.user?.firstName,
        [Validators.required],
      ],
      lastName: [this.user?.lastName,
      [Validators.required]],
      email: [this.user?.email,
      [Validators.required, Validators.email]],
      mobile: [this.user?.mobile,
      [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
      companyName: [this.user?.companyName,
      []],
      ofDays: [1],
      estimateArrivalTime: ["00.00"],
      noOfGuest: [1,
        [Validators.required]],
      message: ["",
        []],
      startDate: [this.minDate,
      [Validators.required]],
      // quantity: ["",
      // []],
      // timeQuantity: ["",
      // [Validators.required]],

    });
    if(this.userDetail && (this.userDetail?.billingAddress=='' || this.userDetail?.billingAddress==null)){
      this.valGstPanForm=false;
      // this.GSTnumber=this.userDetail?.gstNumber;
      // this.PANnumber=this.userDetail?.panNumber;
      this.billingAddress = this.userDetail?.billingAddress;
    }
    this.selectedDate = this.minDate;
    const now = new Date();
    this.currentDay = now.toLocaleDateString('en-GB', { weekday: 'long' });
    if(Object.keys(this.data)?.length){
      this.getSpaceDetails();
    }
  }
  startTimes = [
    { value: '10:00', viewValue: '10:00 AM' },
    { value: '10:30', viewValue: '10:30 AM' },
    { value: '11:00', viewValue: '11:00 AM' },
    { value: '11:30', viewValue: '11:30 AM' },
    { value: '12:00', viewValue: '12:00 PM' },
    { value: '12:30', viewValue: '12:30 PM' },
    { value: '13:00', viewValue: '1:00 PM' },
    { value: '13:30', viewValue: '1:30 PM' },
    { value: '14:00', viewValue: '2:00 PM' },
    { value: '14:30', viewValue: '2:30 PM' },
    { value: '15:00', viewValue: '3:00 PM' },
    { value: '15:30', viewValue: '3:30 PM' },
    { value: '16:00', viewValue: '4:00 PM' },
    { value: '16:30', viewValue: '4:30 PM' },
    { value: '17:00', viewValue: '5:00 PM' },
    { value: '17:30', viewValue: '5:30 PM' },
    { value: '18:00', viewValue: '6:00 PM' },
    { value: '18:30', viewValue: '6:30 PM' },
    { value: '19:00', viewValue: '7:00 PM' },
    { value: '19:30', viewValue: '7:30 PM' },
    { value: '20:00', viewValue: '8:00 PM' },
    { value: '20:30', viewValue: '8:30 PM' },
    { value: '21:00', viewValue: '9:00 PM' },
    { value: '21:30', viewValue: '9:30 PM' },
    { value: '22:00', viewValue: '10:00 PM' },
    { value: '22:30', viewValue: '10:30 PM' },
    { value: '23:00', viewValue: '11:00 PM' },
    { value: '23:30', viewValue: '11:30 PM' },
  ];
  getSpaceDetails() {
    this.spaceService
      .getSpaceDetails(this.data.country,this.data.city,this.data.spaceType,this.data.spaceId)
      .then((res) => {
        this.space_details = res.data
        this.spaceName = res.data.actual_name
        this.landmark = res.data.location_name
        this.originalPrice = res.data.originalPrice
        this.location_name = res.data.location_name;
      })
      .catch((error) => { });
  }
  get nativeWindow(): any {
    if (isPlatformBrowser(this.platformId)) {
      return this._window();
    }
  }

  convertTo24Hour(time: string): string {
    const [hours, minutes] = time.split(':');
    const period = time.slice(-2);
    let hour = parseInt(hours, 10);

    if (period === 'PM' && hour !== 12) {
      hour += 12;
    } else if (period === 'AM' && hour === 12) {
      hour = 0;
    }

    return `${hour.toString().padStart(2, '0')}:${minutes.slice(0, 2)}`;
  }

  getFilteredStartTimes() {
    const start = this.convertTo24Hour(this.startTime);
    const end = this.convertTo24Hour(this.endTime);

    return this.startTimes.filter(time => {
      const value = time.value;
      return value >= start && value <= end;
    });
  }

  public remove(date: Date): void {
    const index = this._findDate(date);
    this.model.splice(index, 1)
  }

  private _findDate(date: Date): number {
    return this.model.map((m) => +m).indexOf(+date);
  }

  public dateChanged(event: MatDatepickerInputEvent<Date>): void {
    if (event.value) {
      const date = event.value;
      const index = this._findDate(date);
     
      if (index === -1) {
        this.model.push(date);

        const transformedArray = this.model.map(dateString => {
          const date = new Date(dateString);
          const year = date.getUTCFullYear();
          const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed
          const day = String(date.getUTCDate()).padStart(2, '0');
          return `${year}-${month}-${day}`;
      });
        this.dayPassForm.patchValue({
          startDate: transformedArray
        })
        
      } else {
        this.model.splice(index, 1);
      }
      this.resetModel = new Date(0);



      if (!this.CLOSE_ON_SELECTED) {
        const closeFn = this._picker.close;
        this._picker.close = () => {};

        // Check if _picker['_popupComponentRef'] and _picker['_popupComponentRef'].instance exist
        if (this._picker['_popupComponentRef'] && this._picker['_popupComponentRef'].instance) {
          const calendar = this._picker['_popupComponentRef'].instance._calendar;
          if (calendar && calendar.monthView) {
            calendar.monthView._createWeekCells();
          }
        }

        setTimeout(() => {
          this._picker.close = closeFn;
        });
      }
    }
  }

  popupOpen(category,title1): void {
    let payload = {
        component: "favourite-workspace",
        title: title1,
        onCategory:category,
        message: 'Are you sure you want to Unfavourite this workspace?'
    }
    this.dialog.open(ThankyopopupComponent, { data: payload ,width: '500px'});
  }
  onSumbit() {
    if(!this.valGstPanForm){
      $("#updateModal").show();
      return false;
    }
    // if (!this.dayPassForm.valid) {
    //   this.dayPassForm.markAllAsTouched();
    //   return
    // }
    const formValue = this.dayPassForm.value;
    const payload = {
      startDate: this.model,
      visitTime: formValue.visitTime,
      //  quantity: formValue.quantity,
      //  timeQuantity: formValue.timeQuantity,
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      email: formValue.email,
      mobile: formValue.mobile,
      companyName: formValue.companyName,
      ofDays: formValue.ofDays,
      estimateArrivalTime: formValue.estimateArrivalTime,
      noOfGuest: formValue.noOfGuest,
      message: formValue.message,
      spaceLocation:this.location_name
    };
    this.isLoading = true
    this.spaceService.userDayPassCoworking(this.data.spaceId, payload).subscribe(
      (response: any) => {
        // this.bookingCard = response.bookingRecord
        this.isFormSubmitted = true;
        if (response.success) {
          let razerPay: any = {
            key: response?.razorpayOrder?.key_id,
            amount: response?.razorpayOrder?.amount_paid * 100,
            currency: 'INR',
            name: payload?.firstName, // company name or product name
            order_id: response?.razorpayOrder?.order_id,
            modal: {
              escape: false,
            },
            theme: {
              color: '#0c238a'
            },
            innerHeight: '80vh',
            outerHeight: '85vh'
          };

          razerPay.handler = ((result, error) => {

            razerPay.response = result;

            let resData = result
            resData.amount = razerPay?.amount
            this.spaceService.completeCoworkingPayment(resData).subscribe((bookingRes: any) => {

              if (bookingRes?.success) {
                this.popupOpen('coworking','Booking complete');
                // this.toastr.success('Booking complete');
                // this.toastr.success('Booking complete');
                setTimeout(() => {
                  this.router.navigate(['/booking-Detail', bookingRes?.bookingId])
                  this.closeDialog(true);
                  this.isLoading = false;
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
        } else {
          this.isLoading = false
          this.toastr.error(
            response.message ||
            'Some error occurred while equest booking!'
          );
        }
      },
      (error) => {
        this.isLoading = false
        // this.toastr.error('Some error occurred while visit schedule!');
      }
    );
  }

  closepopup(){
    $("#updateModal").hide();
  }
  onDateChange(event: any) {
    this.selectedDate = event.value;
  this.selectedDay = moment(this.selectedDate).format('dddd');

    if(this.selectedDay === 'Monday'){
      this.startTime = localStorage.getItem("mondayOpenTime");
      this.endTime = localStorage.getItem("mondayCloseTime");
    }else if(this.selectedDay === 'Tuesday'){
      this.startTime = localStorage.getItem("tuesdayOpenTime");
      this.endTime = localStorage.getItem("tuesdayCloseTime");
    }else if(this.selectedDay === 'Wednesday'){
      this.startTime = localStorage.getItem("wednesdayOpenTime");
      this.endTime = localStorage.getItem("wednesdayCloseTime");
    }else if(this.selectedDay === 'Thursday'){
      this.startTime = localStorage.getItem("thursdayOpenTime");
      this.endTime = localStorage.getItem("thursdayCloseTime");
    }else if(this.selectedDay === 'Friday'){
      this.startTime = localStorage.getItem("fridayOpenTime");
      this.endTime = localStorage.getItem("fridayCloseTime");
    }else if(this.selectedDay === 'Saturday'){
      this.startTime = localStorage.getItem("saturdayOpenTime");
      this.endTime = localStorage.getItem("saturdayCloseTime");
    }else if(this.selectedDay === 'Sunday'){
      this.startTime = localStorage.getItem("sundayOpenTime");
      this.endTime = localStorage.getItem("sundayCloseTime");
    }
    this.filteredStartTimes = this.getFilteredStartTimes();
  }

  dateFilter = (d: Date | null): boolean => {
    // Retrieve closed days from local storage and parse as boolean
    const mondayClosed = localStorage.getItem('mondayClosed') === 'true';
    const tuesdayClosed = localStorage.getItem('tuesdayClosed') === 'true';
    const wednesdayClosed = localStorage.getItem('wednesdayClosed') === 'true';
    const thursdayClosed = localStorage.getItem('thursdayClosed') === 'true';
    const fridayClosed = localStorage.getItem('fridayClosed') === 'true';
    const saturdayClosed = localStorage.getItem('saturdayClosed') === 'true';
    const sundayClosed = localStorage.getItem('sundayClosed') === 'true';

    const date = d ? new Date(d) : null;
    if (!date || isNaN(date.getTime())) {
      return true;
    }

    const day = date.getDay();
    // Disable days based on the closed days from local storage
    return !(
      (mondayClosed && day === 1) ||
      (tuesdayClosed && day === 2) ||
      (wednesdayClosed && day === 3) ||
      (thursdayClosed && day === 4) ||
      (fridayClosed && day === 5) ||
      (saturdayClosed && day === 6) ||
      (sundayClosed && day === 0)
    );
  }
  onInput() {
    // Trigger change detection to update the view
    this.cd.detectChanges();
  }

  get formControls() {
    return this.dayPassForm.controls;
  }

  chkValidateGstPanForm(event: any, fieldType){ 
    this.panErrorMsg='';
    // this.gstErrorMsg='';
    this.billingMsg='';
    // if(fieldType=='GSTnumber'){
      
    //   this.GSTnumber = event.target.value;
    //   alert(this.GSTnumber)
    // }
 
    // if(fieldType=='PANnumber'){
      
    //   this.PANnumber = event.target.value;
    // }
 
    if(fieldType == "billingAddress"){
      this.billingAddress = event.target.value;
    }

    if(fieldType == "billingAddress2"){
      this.billingAddress2 = event.target.value;
    }
 
    // if (this.GSTnumber === undefined || !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/.test(this.GSTnumber)) {
    //   this.gstErrorMsg = 'Please enter a valid GST number';
    // } else 
    
    // if (this.PANnumber === undefined || !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(this.PANnumber)) {
    //   this.panErrorMsg = 'Please enter a valid PAN number';
    // }else 
    
    if(this.billingAddress === undefined || this.billingAddress == ""){
      this.billingMsg = 'Please enter billing address';
    } else {
      this.valGstPanForm = true;
    }
    
  }

  submitGstAndPan(){
 
    if(this.valGstPanForm){
      this.profileService.fetchProfiledata().subscribe((result: any) => {
        if (result.success) {
          this.userDetail = result.data;
  
          let profileData = {
            email: this.userDetail?.email,
            mobile: this.userDetail?.mobile,
            firstName: this.userDetail?.firstName,
            lastName: this.userDetail?.lastName,
            gender: this.userDetail?.gender,
            dateOfBirth: this.userDetail?.dateOfBirth,
            companyName: this.userDetail?.companyName,
            billingAddress: this.billingAddress,
            billingAddress2: this.billingAddress2,
            panNumber: this.PANnumber,
            gstNumber: this.GSTnumber,
          }
          
  
          this.profileService.updateProfileDetails(this.userDetail?.id, profileData).subscribe((result: any) => {
            if(result.success){
              localStorage.setItem('userDetails', JSON.stringify(result?.user))
              this.toastr.success(result.message || 'Profile details updated successfully!');
              $("#updateModal").hide();
            } else {
              this.toastr.error('Some error occurred while update profile!');
            }
          }, (error) => {
            this.toastr.error('Some error occurred while update profile!')
            console.error(error);
          })
  
        }
      })
    }else{
      this.toastr.error('Please enter correct details.')
    }

  }

  closeModal(){
    $("#updateModal").hide();
  }


  isTimeDisabled(time: string): boolean {

    const currentDate = new Date();

    const selectedDate = new Date(this.dayPassForm.value.startDate);
    const currentHours = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();
    
    let totalMinut = currentHours * 60;
    if (!isNaN(currentMinutes)) {
      totalMinut += currentMinutes;
    }

    // Check if the current date matches the booking date
    if (currentDate.toDateString() === selectedDate.toDateString()) {

      const [hours, minutes] = time.split(':').map(Number);
      let selectedMinut = hours * 60;
      if (!isNaN(minutes)) { // Check if selminutes is a valid number
        selectedMinut += minutes; // Add minutes if they exist
      }
      return totalMinut > selectedMinut;
    }

    return false;

  }


}
