import { DatePipe, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import {
  MatLegacyDialog as MatDialog
} from '@angular/material/legacy-dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { ProfileManagementService } from 'src/app/profile-management/profile-management.service';
import { SpaceService } from 'src/app/services/space.service';
import { ThankyopopupComponent } from 'src/app/thankyopopup/thankyopopup.component';
import { environment } from 'src/environments/environment';
declare var $: any;

export interface Booking {
  date: any;
  startTime: string;
  endTime: string;
  minDate: Date;
  duration: any
}

@Component({
  selector: 'app-request-booking',
  templateUrl: './request-booking.component.html',
  styleUrls: ['./request-booking.component.css'],
})
export class RequestBookingComponent {
  public spaceId: any;
  public ref;
  public bookingCard: any;
  originalPrice: any = 0.00;
  totalHours: any = 0;
  bookingPrice: any;
  startDate: any;
  spaceName: any;
  landmark: any;
  public space_details;
  minDate: Date = new Date();
  selectedDate: Date = new Date();
  isFormSubmitted: boolean = false;
  isLoading: boolean = false;
  days: any;
  public space_id;
  totalDays: any;
  userDetail: any;
  public aws_base_url =
    'https://s3.ap-south-1.amazonaws.com/' +
    environment.s3_bucket_path +
    '/details_images/';
  booking = {
    date: new Date(), // Initialize with today's date
  };

  currentDateTime: Date = new Date(); // Get current date and time
  currentTime: string = this.currentDateTime.toTimeString().split(' ')[0];
  userDetails: any;
  valGstPanForm: boolean=true;
  GSTnumber: any;
  PANnumber: any;
  gstErrorMsg: string;
  panErrorMsg: string;
  gstPatternMsg: string;
  panPatternMsg: string;
  billingAddress: any;
  billingAddress2: any;
  billingMsg: string;
  filteredStartTimes = [];
  selectedDay: any;
  startTime: any;
  endTime: any;
  minimumHours: any;
  startTimes = [];
  endTimes = [];
  city: any;
  country: any;
  spaceType: string;
  // startTime247 = [
  //   {value: '00:00', label: '12:00 AM'},
  //   {value: '00:30', label: '12:30 AM'},
  //   {value: '01:00', label: '01:00 AM'},
  //   {value: '01:30', label: '01:30 AM'},
  //   {value: '02:00', label: '02:00 AM'},
  //   {value: '02:30', label: '02:30 AM'},
  //   {value: '03:00', label: '03:00 AM'},
  //   {value: '03:30', label: '03:30 AM'},
  //   {value: '04:00', label: '04:00 AM'},
  //   {value: '04:30', label: '04:30 AM'},
  //   {value: '05:00', label: '05:00 AM'},
  //   {value: '05:30', label: '05:30 AM'},
  //   {value: '06:00', label: '06:00 AM'},
  //   {value: '06:30', label: '06:30 AM'},
  //   {value: '07:00', label: '07:00 AM'},
  //   {value: '07:30', label: '07:30 AM'},
  //   {value: '08:00', label: '08:00 AM'},
  //   {value: '08:30', label: '08:30 AM'},
  //   {value: '09:00', label: '09:00 AM'},
  //   {value: '09:30', label: '09:30 AM'},
  //   {value: '10:00', label: '10:00 AM'},
  //   {value: '10:30', label: '10:30 AM'},
  //   {value: '11:00', label: '11:00 AM'},
  //   {value: '11:30', label: '11:30 AM'},
  //   {value: '12:00', label: '12:00 PM'},
  //   {value: '12:30', label: '12:30 PM'},
  //   {value: '13:00', label: '01:00 PM'},
  //   {value: '13:30', label: '01:30 PM'},
  //   {value: '14:00', label: '02:00 PM'},
  //   {value: '14:30', label: '02:30 PM'},
  //   {value: '15:00', label: '03:00 PM'},
  //   {value: '15:30', label: '03:30 PM'},
  //   {value: '16:00', label: '04:00 PM'},
  //   {value: '16:30', label: '04:30 PM'},
  //   {value: '17:00', label: '05:00 PM'},
  //   {value: '17:30', label: '05:30 PM'},
  //   {value: '18:00', label: '06:00 PM'},
  //   {value: '18:30', label: '06:30 PM'},
  //   {value: '19:00', label: '07:00 PM'},
  //   {value: '19:30', label: '07:30 PM'},
  //   {value: '20:00', label: '08:00 PM'},
  //   {value: '20:30', label: '08:30 PM'},
  //   {value: '21:00', label: '09:00 PM'},
  //   {value: '21:30', label: '09:30 PM'},
  //   {value: '22:00', label: '10:00 PM'},
  //   {value: '22:30', label: '10:30 PM'},
  //   {value: '23:00', label: '11:00 PM'},
  //   {value: '23:30', label: '11:30 PM'},
  // ];
  // endTime247 = [
  //   {value: '00:00', label: '12:00 AM'},
  //   {value: '00:30', label: '12:30 AM'},
  //   {value: '01:00', label: '01:00 AM'},
  //   {value: '01:30', label: '01:30 AM'},
  //   {value: '02:00', label: '02:00 AM'},
  //   {value: '02:30', label: '02:30 AM'},
  //   {value: '03:00', label: '03:00 AM'},
  //   {value: '03:30', label: '03:30 AM'},
  //   {value: '04:00', label: '04:00 AM'},
  //   {value: '04:30', label: '04:30 AM'},
  //   {value: '05:00', label: '05:00 AM'},
  //   {value: '05:30', label: '05:30 AM'},
  //   {value: '06:00', label: '06:00 AM'},
  //   {value: '06:30', label: '06:30 AM'},
  //   {value: '07:00', label: '07:00 AM'},
  //   {value: '07:30', label: '07:30 AM'},
  //   {value: '08:00', label: '08:00 AM'},
  //   {value: '08:30', label: '08:30 AM'},
  //   {value: '09:00', label: '09:00 AM'},
  //   {value: '09:30', label: '09:30 AM'},
  //   {value: '10:00', label: '10:00 AM'},
  //   {value: '10:30', label: '10:30 AM'},
  //   {value: '11:00', label: '11:00 AM'},
  //   {value: '11:30', label: '11:30 AM'},
  //   {value: '12:00', label: '12:00 PM'},
  //   {value: '12:30', label: '12:30 PM'},
  //   {value: '13:00', label: '13:00 PM'},
  //   {value: '13:30', label: '13:30 PM'},
  //   {value: '14:00', label: '01:00 PM'},
  //   {value: '14:30', label: '01:30 PM'},
  //   {value: '15:00', label: '02:00 PM'},
  //   {value: '15:30', label: '02:30 PM'},
  //   {value: '16:00', label: '03:00 PM'},
  //   {value: '16:30', label: '03:30 PM'},
  //   {value: '17:00', label: '04:00 PM'},
  //   {value: '17:30', label: '04:30 PM'},
  //   {value: '18:00', label: '05:00 PM'},
  //   {value: '18:30', label: '05:30 PM'},
  //   {value: '19:00', label: '06:00 PM'},
  //   {value: '19:30', label: '06:30 PM'},
  //   {value: '20:00', label: '07:00 PM'},
  //   {value: '20:30', label: '07:30 PM'},
  //   {value: '21:00', label: '08:00 PM'},
  //   {value: '21:30', label: '08:30 PM'},
  //   {value: '22:00', label: '10:00 PM'},
  //   {value: '22:30', label: '10:30 PM'},
  //   {value: '23:00', label: '11:00 PM'},
  //   {value: '23:30', label: '11:30 PM'},
  // ];

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private spaceService: SpaceService,
    private toastr: ToastrService,
    private datePipe: DatePipe,
    private profileService: ProfileManagementService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object
    // public dialogRef: MatDialogRef<RequestBookingComponent>
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.spaceId = sessionStorage.getItem('space_id');
    }
    this.userDetail = JSON.parse(localStorage.getItem('userDetails') || '');
  }

  _window(): any {

    return window;

  }

  get nativeWindow(): any {
    if (isPlatformBrowser(this.platformId)) {
      return this._window();
    }
  }

  getShortDetails(spaceId: number) {
    this.spaceService
      .getShortDetailsById(spaceId)
      .then((res) => {
        if (res.success) {
          this.city = res.spaceData.contact_city_name
          this.country = res.spaceData.country
          this.getSpaceDetails(this.country, this.city, this.spaceType, spaceId);
        }
      }
      )
  }

  ngOnInit(): void {
    
    this.route.params.subscribe((params: Params) => {
       this.spaceType = this.getOriginalUrlParam(params.spaceType);
        this.space_id = params.spaceId;
      if(this.spaceType == 'Coworking Café Restaurant'){
        this.spaceType = "Coworking Café/Restaurant";
        this.getShortDetails(params.spaceName?.match(/\d+$/)?.[0])
      }else{
        this.getShortDetails(params.spaceId)
      }
    });

    const date = new Date();

    this.onDateChange(date);

    // set default booking date
    this.bookings[0].date = new Date();

    if(this.userDetail && (this.userDetail?.billingAddress=='' || this.userDetail?.billingAddress==null)){
      this.valGstPanForm=false;
      // this.GSTnumber=this.userDetail?.gstNumber;
      // this.PANnumber=this.userDetail?.panNumber;
      this.billingAddress = this.userDetail?.billingAddress;
    }
  }

  getOriginalUrlParam(value: string): string {
    return value.replace(/-/g, ' ')?.replace(/\b\w/g, char => char?.toUpperCase());
  }
  
  chkValidateGstPanForm(event: any, fieldType){ 
    this.panErrorMsg='';
    // this.gstErrorMsg='';
    this.billingMsg='';
    if(fieldType=='GSTnumber'){
      
      this.GSTnumber = event.target.value;
    }
 
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
    if(this.billingAddress == ""){
      this.billingMsg = 'Please enter billing address';
    } else {
      this.valGstPanForm = true;
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

  onDateChange(event: any) {
    const selectedDate = event.value;
    this.selectedDay = moment(selectedDate).format('dddd');

    let dayPrefix: string;
    switch (this.selectedDay) {
      case 'Monday':
        dayPrefix = 'monday';
        break;
      case 'Tuesday':
        dayPrefix = 'tuesday';
        break;
      case 'Wednesday':
        dayPrefix = 'wednesday';
        break;
      case 'Thursday':
        dayPrefix = 'thursday';
        break;
      case 'Friday':
        dayPrefix = 'friday';
        break;
      case 'Saturday':
        dayPrefix = 'saturday';
        break;
      case 'Sunday':
        dayPrefix = 'sunday';
        break;
      default:
        dayPrefix = '';
    }

    if (dayPrefix) {
      this.startTime = localStorage.getItem(`${dayPrefix}OpenTime`);
      this.endTime = localStorage.getItem(`${dayPrefix}CloseTime`);

      this.generateTimeSlots(this.startTime, this.endTime);

      if (!this.startTime || !this.endTime) {
        this.toastr.warning(`No time available for ${this.selectedDay}. Please choose another day.`
          , 'Warning',{
            timeOut: 100
          }
        );
      } else {
        this.filteredStartTimes = this.getFilteredStartTimes();
      }
    }
  }

  generateTimeSlots(startTime: any, endTime: any) {
    this.startTimes = [];

    this.endTime = endTime;

    if (endTime == '00:00') {
      endTime = '23:30';
    }
    // Convert times from 12-hour to 24-hour format
    const [startHour, startMinute] = this.convertTo24Hour2(startTime);
    const [endHour, endMinute] = this.convertTo24Hour2(endTime);
    
    const start = startHour * 60 + startMinute; // Total minutes from midnight
    const end = endHour * 60 + endMinute;       // Total minutes from midnight

  
    for (let timeInMinutes = start; timeInMinutes <= end; timeInMinutes += 30) {
      const hour = Math.floor(timeInMinutes / 60);
      const minute = timeInMinutes % 60;
      const time = this.formatTime(hour, minute);
      const time24Format = this.formatTime24Hour(hour, minute);

      this.startTimes.push({
        value: time24Format,  // 24-hour format
        viewValue: time       // 12-hour format with AM/PM
      });
    }

    if (this.endTime == '00:00') {
      this.endTimes = this.startTimes;
    } else{
      for (let timeInMinutes = 30; timeInMinutes <= end; timeInMinutes += 30) {
        const hour = Math.floor(timeInMinutes / 60);
        const minute = timeInMinutes % 60;
        const time = this.formatTime(hour, minute);
        const time24Format = this.formatTime24Hour(hour, minute);
  
        this.endTimes.push({
          value: time24Format,  // 24-hour format
          viewValue: time       // 12-hour format with AM/PM
        });
      }

    }
  }
  
  convertTo24Hour2(time: string): [number, number] {
    const [timePart, period] = time.split(' ');
    const [hour, minute] = timePart.split(':').map(Number);
    let hour24 = hour;
    
    if (period === 'PM' && hour !== 12) {
      hour24 += 12;
    } else if (period === 'AM' && hour === 12) {
      hour24 = 0;
    }
    
    return [hour24, minute];
  }
  
  formatTime(hour: number, minute: number): string {
    const period = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;  // Convert 0 to 12 for midnight and handle PM times
    const formattedMinute = minute === 0 ? '00' : minute.toString();
    return `${formattedHour}:${formattedMinute} ${period}`;
  }
  
  formatTime24Hour(hour: number, minute: number): string {
    const formattedHour = hour < 10 ? `0${hour}` : hour.toString();
    const formattedMinute = minute === 0 ? '00' : minute.toString();
    return `${formattedHour}:${formattedMinute}`;
  }

  submitGstAndPan(){
 
    if(this.valGstPanForm){
      this.profileService.fetchProfiledata().subscribe((result: any) => {
        if (result.success) {
          this.userDetails = result.data;
  
          let profileData = {
            email: this.userDetails?.email,
            mobile: this.userDetails?.mobile,
            firstName: this.userDetails?.firstName,
            lastName: this.userDetails?.lastName,
            gender: this.userDetails?.gender,
            dateOfBirth: this.userDetails?.dateOfBirth,
            companyName: this.userDetails?.companyName,
            billingAddress: this.billingAddress,
            billingAddress2:this.billingAddress2,
            panNumber: this.PANnumber,
            gstNumber: this.GSTnumber,
          }
          
  
          this.profileService.updateProfileDetails(this.userDetails?.id, profileData).subscribe((result: any) => {
            if(result.success){
              localStorage.setItem('userDetails', JSON.stringify(result?.user))
              this.toastr.success(result.message || 'Profile details updated successfully!');
              $("#updateModal").hide();
            } else {
              this.toastr.error(result?.message);
            }
          }, (error) => {
            this.toastr.error('Some error occurred while update profile!')
          })
  
        }
      })
    }else{
      this.toastr.error('Please enter correct details.')
    }

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

  getSpaceDetails(country:any, city:any, spaceType:any, spaceId:any) {
    this.spaceService
      .getSpaceDetails(country, city, spaceType,spaceId)
      .then((res) => {``
        this.space_details = res.data;
        this.spaceName = this.space_details.actual_name;
        this.landmark = this.space_details.location_name;
        this.minimumHours = this.space_details?.minimum_hours / 60;
        this.originalPrice =
          this.space_details.originalPrice ||
          this.space_details?.flexible_desk_price;
      })
      .catch((error) => {});
  }

  convertMinutesToHours(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours} hour(s) and ${remainingMinutes} minute(s)`;
  }

  bookings: Booking[] = [
    {
      date: null,
      startTime: null,
      endTime: null,
      minDate: this.minDate,
      duration: null
    },
  ];

  public closeDialog(options) {
    this.ref.close(options);
  }

  isTimeDisabled(index: number, time: string): boolean {
    const currentDate = new Date();

    // Check if there are no bookings or if the booking date is not defined
    if (this.bookings.length === 0 || !this.bookings[index].date) {
      return true;
    }

    const selectedDate = new Date(this.bookings[index].date);
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

  addBooking() {
    if (this.isFormValid()) {
      this.isFormSubmitted = false;
      let minDate: any = this.bookings[this.bookings.length - 1].date?._d;
      // minDate = minDate.setDate(minDate.getDate() + 1)
      this.bookings.push({
        date: null,
        startTime: null,
        endTime: null,
        minDate: minDate,
        duration: null
      });
    } else {
      this.toastr.warning('You can not overlap the time for the same date', 'Warning');
    }
  }

  removeBooking(i: number) {
    this.bookings.splice(i, 1);
    this.calculateTotalHours(i);
  }

  getDate(date: any) {
    let data = this.datePipe.transform(date, 'dd/MM/yyyy');
    return data;
  }

  popupOpen(isinstant): void {
    let payload = {
        component: "favourite-workspace",
        isinstant:isinstant,
        message: 'Are you sure you want to Unfavourite this workspace?'
    }
    this.dialog.open(ThankyopopupComponent, { data: payload ,width: '500px'});
  }

  onSumbit() {
    this.isFormSubmitted = true
    if (this.isFormValid() && this.totalHours > 0) {

      if(!this.valGstPanForm){
        $("#updateModal").show();
        return false;
      }
      const payload = {
        spaceLocation:this.landmark,
        bookingPeriods: this.bookings.map((booking) => {

          const timeParts1 = booking.startTime.split(':'); // Split the time string by '.'
          const startingHours = parseInt(timeParts1[0]); // Extract the hours part
          const startingMinutes = parseInt(timeParts1[1]);


          const timeParts2 = booking.endTime.split(':'); // Split the time string by '.'
          const endhours = parseInt(timeParts2[0]); // Extract the hours part
          const endMinutes = parseInt(timeParts2[1]);

          if (isNaN(startingMinutes) && !isNaN(endMinutes)) {
            return {
              startDate: this.datePipe.transform(booking.date, 'dd/MM/yyyy'),
              startTime: (startingHours + '.00'),
              endTime: (endhours + '.' + endMinutes)
            };
          }

          if (isNaN(endMinutes) && !isNaN(startingMinutes)) {
            return {
              startDate: this.datePipe.transform(booking.date, 'dd/MM/yyyy'),
              startTime: (startingHours + '.' + startingMinutes),
              endTime: (endhours + '.00')
            };
          }

          return {
            startDate: this.datePipe.transform(booking.date, 'dd/MM/yyyy'),
            startTime: (startingHours + '.' + startingMinutes),
            endTime: (endhours + '.' + endMinutes),
          };
        }),
      };
      this.isLoading = true;
      this.spaceService
        .userRequestBookingShort(this.spaceId, payload)
        .subscribe(
          (response: any) => {
            this.bookingCard = response.bookingRecord;

            this.isFormSubmitted = true;

            if (response.success) {
              if (response?.razorpayOrder) {
                let razerPay: any = {
                  key: response?.razorpayOrder?.key_id,
                  amount: response?.razorpayOrder?.amount_paid * 100,
                  currency: 'INR',
                  name: this.userDetail?.firstName, // company name or product name
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
                  resData.id = response?.bookingRecord?.id;
                  // this.spaceService.completeShortPayment(resData).subscribe((bookingRes: any) => {
                  //   if (bookingRes?.success) { 
                  //     this.toastr.success('Booking complete');
                  //     setTimeout(() => {
                  //       this.router.navigate(['/booking-Detail', bookingRes?.bookingRecord?.id])
                  //       this.closeDialog(true);
                  //       this.isLoading = false;
                  //     }, 1500);
                  //   } else {
                  //     this.toastr.error(bookingRes?.message)
                  //     this.isLoading = false;
                  //   }
                  // })

                  this.spaceService.completeShortTermLaterPayment(resData).subscribe((bookingRes: any) => {
                    if (bookingRes?.success) {
                      this.popupOpen(this.space_details?.isInstant);
                      // this.toastr.success('Booking complete');
                      // setTimeout(() => {
                        this.router.navigate(['/booking-Detail', bookingRes?.bookingId])
                        this.closeDialog(null);
                        this.isLoading = false;
                      // }, 3000);
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
                this.popupOpen(this.space_details?.isInstant);
                // this.toastr.success(
                //   'Request for booking sent successfully awaiting confirmation from host!'
                // );
                // setTimeout(() => {
                  this.router.navigate(['/booking-Detail', response?.bookingRecord?.id])
                  this.closeDialog(null);
                  this.isLoading = false;
                // }, 3000);
              }
            } else {
              this.toastr.error(
                response.message || 'Some error occurred while equest booking!'
              );
            }
          },
          (error) => {
            this.isLoading = false;
            // this.toastr.error('Some error occurred while visit schedule!');
          }
        );
    }else {
      this.toastr.error('Please enter correct details');
    }
  }

  startTimeChanged(index: number) {
    const booking = this.bookings[index];
    const startTime = parseFloat(booking.startTime);
    const endTime = parseFloat(booking.endTime);

    this.calculateTotalHours(index);

    if (endTime && endTime - startTime < this.minimumHours) {
      this.toastr.error(
        `Time difference between start and end time must be at least ${this.minimumHours} hours.`
      );
      this.bookings[index].endTime = null;
    }
    
  }

  endTimeChanged(index: number) {
    const booking = this.bookings[index];
    const startTime = parseFloat(booking.startTime);
    const endTime = parseFloat(booking.endTime);

    
    // if (endTime && endTime - startTime < 0) {
    //   this.toastr.error(
    //     'End time must be greater than start time.'
    //   );
    //   this.bookings[index].endTime = null; // Reset end time
    // }
    // else if (startTime && endTime && endTime - startTime < this.minimumHours) {
    //   this.toastr.error(
    //     `Time difference between start and end time must be at least ${this.minimumHours} hours.`
    //   );
    //   this.bookings[index].endTime = null; // Reset end time
    // }
    
    this.calculateTotalHours(index);
    
  }
  
  dateChanged(index: number, value:any) {
    if (index === 0) {
      // Only update selectedDate if it's the first array of index
      this.selectedDate = value._d;
      this.bookings[index].minDate = value._d;
    }

    if (index > 0) {
      const prevDate = this.bookings[index - 1].date;
      const currentDate = this.bookings[index].date;
      this.bookings[index].minDate = value._d;

      if (prevDate > currentDate) {
        this.toastr.error(
          'Date must be greater than the previous booking date.'
        );
        this.bookings[index].date = null; // Reset date
      }
    }
  }

  closeModal(){
    $("#updateModal").hide();
  }

  isFormValid(): boolean {
    // Check if any field is empty
    // if (this.userDetail?.companyName == '') {
    //   return false;
    // }
    // Iterate through each booking
    let getError = true;
    for (let i = 0; i < this.bookings.length; i++) {
      const booking = this.bookings[i];

      // Check if any field is empty
      if (!booking.date || !booking.startTime || !booking.endTime) {
        return false; // Form is invalid
      }

      // Convert start and end time to numbers
      // const startTime = parseFloat(booking.startTime);
      // const endTime = parseFloat(booking.endTime);

      // // Check if time difference is less than 2 hours
      // if (endTime - startTime < 2) {
      //   return false; // Form is invalid
      // }

      var [startHour, startMinute] = booking.startTime.split(":").map(Number);
      var [endHour, endMinute] = booking.endTime.split(":").map(Number);

      if (isNaN(startMinute)) {
        startMinute = 0
      }

      if (isNaN(endMinute)) {
        endMinute = 0
      }

      const startTotalMinutes = startHour * 60 + startMinute;
      const endTotalMinutes = endHour * 60 + endMinute;

      // Check if time difference is less than 2 hours
      // if (endTotalMinutes - startTotalMinutes < this.space_details.minimum_hours) {
      //   return false; // Form is invalid
      // }

      // Check if the date is greater than the previous booking's date
      // if (i > 0) {
      // const prevDate = this.bookings[i - 1].date;
      // const currentDate = booking.date;


      // if (prevDate > currentDate) {
      //   return false; // Form is invalid
      // }


      this.bookings.filter((item, index) => {

        const itemDate = new Date(item.date);

        if ((itemDate.toDateString() === new Date(booking.date).toDateString()) && index != i) {

          var [beforestartHour, beforestartMinute] = item.startTime.split(":").map(Number);
          var [beforeendHour, beforeendMinute] = item.endTime.split(":").map(Number);

          if (isNaN(beforestartMinute)) {
            beforestartMinute = 0
          }

          if (isNaN(beforeendMinute)) {
            beforeendMinute = 0
          }

          const beforeTotalMinutes = beforestartHour * 60 + beforestartMinute;
          const beforeendTotalMinutes = beforeendHour * 60 + beforeendMinute;

          if ((startTotalMinutes > beforeTotalMinutes && endTotalMinutes < beforeendTotalMinutes) || (startTotalMinutes > beforeTotalMinutes && startTotalMinutes < beforeendTotalMinutes) || (startTotalMinutes == beforeTotalMinutes || endTotalMinutes == beforeendTotalMinutes)) {
            return getError = false;
          }
        }
      });

      // return getError
      // }


    }
    return getError; // Form is valid if all validations pass
  }

  // calculateTotalHours(): void {
  //   // Initialize total hours
  //   this.totalHours = 0;

  //   // Iterate through each booking
  //   this.bookings.forEach(booking => {
  //     // Check if both start time and end time are selected
  //     if (booking.startTime && booking.endTime) {
  //       // Parse start and end times
  //       const startHour = parseFloat(booking.startTime);
  //       const endHour = parseFloat(booking.endTime);

  //       // Convert half an hour (0.5) to 0.5 hour
  //       const duration = endHour - startHour;
  //       if (duration === 0.5) {
  //         // If the duration is half an hour, add 0.5 hour to the total
  //         this.totalHours += 0.5;
  //       } else {
  //         // Otherwise, add the duration in hours to the total
  //         this.totalHours += duration;
  //       }
  //     }
  //   });

  //   // Round the total hours to one decimal place
  //   this.totalHours = Math.round(this.totalHours * 10) / 10;
  // }

  calculateTotalHours(index: any): void {
    this.totalHours = 0;

    this.bookings.forEach((booking, i) => {
        if (booking.startTime && booking.endTime) {
            const [startHour, startMinute] = booking.startTime.split(":").map(Number);
            const [endHour, endMinute] = booking.endTime.split(":").map(Number)

            const startTotalMinutes = startHour * 60 + (isNaN(startMinute) ? 0 : startMinute);
            const endTotalMinutes = endHour * 60 + (isNaN(endMinute) ? 0 : endMinute);

            let timeDifferenceInMinutes;

            if (startTotalMinutes === endTotalMinutes) {
              if (booking.startTime == '00:00' && booking.endTime == '00:00') {
                  timeDifferenceInMinutes = 24 * 60; // 24 hours
              } else if (booking.startTime === booking.endTime) {
                timeDifferenceInMinutes = 0;
                this.bookings[index].endTime = null;
              }
            } else if (booking.startTime > booking.endTime) {
                timeDifferenceInMinutes = 24 * 60 - (startTotalMinutes - endTotalMinutes);
              
            } else {
                timeDifferenceInMinutes = endTotalMinutes - startTotalMinutes;
            }

            this.bookings[i].duration = timeDifferenceInMinutes / 60;
            this.totalHours += timeDifferenceInMinutes / 60;

            if (this.bookings[i].duration < this.minimumHours) {
                console.error(`Booking ${i} duration is less than the minimum required hours.`);
                this.toastr.error(
                    `Time difference must be at least ${this.minimumHours} hours.`
                );
                this.bookings[i].duration = null;
                this.totalHours -= timeDifferenceInMinutes / 60;
            }
        }
    });

    this.totalHours = Math.ceil(this.totalHours * 2) / 2;
  }


  gettotalDays() {
    let days = this.bookings.length;
    return days;
  }

  getHours(endTime, startTime) {
    let end = this.getNumberValue(+endTime);
    let start = this.getNumberValue(+startTime);
    let data = end - start
    return data;
  }

  getNumberValue(data) {
    switch (data) {
      case 11: return 11;
      case 11.30: return 11.5;
      case 12: return 12;
      case 12.30: return 12.5;
      case 13: return 13;
      case 13.30: return 13.50;
      case 14: return 14;
      case 14.30: return 14.50;
      case 15: return 15;
      case 15.30: return 15.50;
      case 16: return 16;
      case 16.30: return 16.50;
      case 17: return 17;
      case 17.30: return 17.50;
      case 18: return 18;
    }

  }

}
