import { DatePipe, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { GlobalVariables } from '../global/global-variables';
import { SpaceService } from '../services/space.service';
import { ThankyopopupComponent } from '../thankyopopup/thankyopopup.component';

@Component({
  selector: 'app-schedule-visit',
  templateUrl: './schedule-visit.component.html',
  styleUrls: ['./schedule-visit.component.css'],
})
export class ScheduleVisitComponent implements OnInit {
  public ref;
  public scheduleVisitForm: UntypedFormGroup;
  public currentDateTime = new Date();
  public spaceId: any;
  public visitId: any;
  public typeOfSpaceList: any = GlobalVariables.resource_types;
  public isUpdating: boolean = false;
  isShortterm:boolean;
  isCoworking:boolean;
  isLongterm: boolean;
  public date = new Date();
  startTime: any;
  endTime: any;
  filteredStartTimes = [];
  selectedDay: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private fb: UntypedFormBuilder,
    private datePipe: DatePipe,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private spaceService: SpaceService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.spaceId = sessionStorage.getItem('space_id');
      this.isShortterm = JSON.parse(sessionStorage.getItem('isShortterm'));
      
      this.isCoworking = JSON.parse(sessionStorage.getItem('isCoworking'));
    this.isLongterm = JSON.parse(sessionStorage.getItem('isLongterm'));
    }
  }
  startTimes = [
    {value: '10:00', viewValue: '10:00 AM'},
    {value: '10:30', viewValue: '10:30 AM'},
    {value: '11:00', viewValue: '11:00 AM'},
    {value: '11:30', viewValue: '11:30 AM'},
    {value: '12:00', viewValue: '12:00 PM'},
    {value: '12:30', viewValue: '12:30 PM'},
    {value: '13:00', viewValue: '1:00 PM'},
    {value: '13:30', viewValue: '1:30 PM'},
    {value: '14:00', viewValue: '2:00 PM'},
    {value: '14:30', viewValue: '2:30 PM'},
    {value: '15:00', viewValue: '3:00 PM'},
    {value: '15:30', viewValue: '3:30 PM'},
    {value: '16:00', viewValue: '4:00 PM'},
    {value: '16:30', viewValue: '4:30 PM'},
    {value: '17:00', viewValue: '5:00 PM'},
    { value: '17:30', viewValue: '5:30 PM' },
    { value: '18:00', viewValue: '6:00 PM' },
    { value: '18:30', viewValue: '6:30 PM' },
    // { value: '19:00', viewValue: '7:00 PM' },
    // { value: '19:30', viewValue: '7:30 PM' },
    // { value: '20:00', viewValue: '8:00 PM' },
    // { value: '20:30', viewValue: '8:30 PM' },
    // { value: '21:00', viewValue: '9:00 PM' },
    // { value: '21:30', viewValue: '9:30 PM' },
    // { value: '22:00', viewValue: '10:00 PM' },
    // { value: '22:30', viewValue: '10:30 PM' },
    // { value: '23:00', viewValue: '11:00 PM' },
    // { value: '23:30', viewValue: '11:30 PM' },
  ];
  ngOnInit() {
    this.scheduleVisitForm = this.fb.group({
      visitDate: [
        "",
        [Validators.required],
      ],
      visitTime:["",
      [Validators.required]]
     
    });
    if (this.data != null) {
      this.spaceId = this.data.spaceId;

      if (
        this.data?.scheduleVisitDetails &&
        this.data?.scheduleVisitDetails != null
      ) {
        this.isUpdating = true;
        this.scheduleVisitForm.setValue({
          visitDateTime: this.data.scheduleVisitDetails.visitDateTime ? this.datePipe.transform(this.data.scheduleVisitDetails.visitDateTime, 'yyyy-MM-ddTHH:mm') : this.datePipe.transform(this.currentDateTime, 'yyyy-MM-ddTHH:mm'),
          typeOfSpaceId: this.data.scheduleVisitDetails.typeOfSpaceId
            ? this.data.scheduleVisitDetails.typeOfSpaceId
            : '',
          description: this.data.scheduleVisitDetails.visitDescription,
        });
      }
    }
  }

  public closeDialog(options) {
    this.ref.close(options);
  }

  onDateChange(event: any) {
    const selectedDate = event.value;
    this.selectedDay = moment(selectedDate).format('dddd');

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

  // dateFilter = (d: Date | null): boolean => {
  //   const mondayClosed = localStorage.getItem('mondayClosed') === 'true';
  //   const tuesdayClosed = localStorage.getItem('tuesdayClosed') === 'true';
  //   const wednesdayClosed = localStorage.getItem('wednesdayClosed') === 'true';
  //   const thursdayClosed = localStorage.getItem('thursdayClosed') === 'true';
  //   const fridayClosed = localStorage.getItem('fridayClosed') === 'true';
  //   const saturdayClosed = localStorage.getItem('saturdayClosed') === 'true';
  //   const sundayClosed = localStorage.getItem('sundayClosed') === 'true';

  //   const date = d ? new Date(d) : null;
  //   if (!date || isNaN(date.getTime())) {
  //     return true;
  //   }

  //   const day = date.getDay();
  //   return !(
  //     (mondayClosed && day === 1) ||
  //     (tuesdayClosed && day === 2) ||
  //     (wednesdayClosed && day === 3) ||
  //     (thursdayClosed && day === 4) ||
  //     (fridayClosed && day === 5) ||
  //     (saturdayClosed && day === 6) ||
  //     (sundayClosed && day === 0)
  //   );
  // }

  popupOpen(title1:any): void {
    let payload = {
        component: "favourite-workspace",
        title: title1,
        message: 'Are you sure you want to Unfavourite this workspace?'
    }
    this.dialog.open(ThankyopopupComponent, { data: payload ,width: '500px'});
  }
  onSubmitScheduleVisit() {
    if (!this.scheduleVisitForm.valid) {
      this.scheduleVisitForm.markAllAsTouched();
      return
    }
    const formValue = this.scheduleVisitForm.value;
    const visitDate = new Date(this.scheduleVisitForm.value?.visitDate?._d);
    const date = new Date(visitDate.getTime() - (visitDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
    // var date = new Date(this.scheduleVisitForm.value?.visitDate?._d).toISOString().split('T')[0];
    const payload = {
      visitDate: date,
      visitTime: formValue.visitTime,
    };
  
    if (this.isShortterm ) {
      this.spaceService.userShortTermScheduleVisit(this.spaceId, payload).subscribe(
        (response: any) => {
          if (response.result.success) {
            this.popupOpen("Visit scheduled successfully. Our team will get back to you shortly.");
            // this.toastr.success(
            //   response.result.message || 'Visit scheduled successfully!'
            // );
            this.closeDialog(null);
          } else {
            this.toastr.error(
              response.result.message ||
              'Some error occurred while visit schedule!'
            );
          }
        },
        (error) => {
          this.toastr.error('Some error occurred while visit schedule!');
        }
      );
    } else {
      // Use the other API for long-term
      this.spaceService.userLongTermScheduleVisit(this.spaceId, payload).subscribe(
        (response: any) => {
          if (response.result.success) {
            this.popupOpen("Visit scheduled successfully. Our team will get back to you shortly.");
            // this.toastr.success(
            //   response.result.message || 'Visit scheduled successfully!'
            // );
            this.closeDialog(null);
          } else {
            this.toastr.error(
              response.result.message ||
              'Some error occurred while visit schedule!'
            );
          }
        },
        (error) => {
          this.toastr.error('Some error occurred while visit schedule!');
        }
      );
    }
  }

  isTimeDisabled(time: string): boolean {

    const currentDate = new Date();

    const selectedDate = new Date(this.scheduleVisitForm.value.visitDate);
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
  
  // onSubmitScheduleVisit(){
  //   const formValue = this.scheduleVisitForm.value;
  //      const payload = {
  //       visitDate: this.datePipe.transform(formValue.visitDateTime, 'yyyy/MM/dd'),
  //       visitTime: formValue.visitTime,
  //   };
  //   this.spaceService.userShortTermScheduleVisit(this.spaceId, payload).subscribe(
  //             (response: any) => {
  //               console.log('onSubmitScheduleVisit | response : ', response);
  //               if (response.result.success) {
  //                 this.toastr.success(
  //                   response.result.message || 'Visit scheduled successfully!'
  //                 );
  //                 this.closeDialog(null);
  //               } else {
  //                 this.toastr.error(
  //                   response.result.message ||
  //                     'Some error occurred while visit schedule!'
  //                 );
  //               }
  //             },
  //             (error) => {
  //               console.log('onSubmitScheduleVisit | error : ', error);
  //               this.toastr.error('Some error occurred while visit schedule!');
  //             }
  //           );
  // }



  // 
  // onSubmitScheduleVisit() {
  //   console.log('onSubmitScheduleVisit');
  //   if (!this.scheduleVisitForm.valid) {
  //     this.toastr.error('Form is not valid!');
  //     return false;
  //   }

  //   const formValue = this.scheduleVisitForm.value;

  //   this.currentDateTime = new Date();
  //   let currentTimeStamp = this.currentDateTime.getTime();
  //   let visitDateTimeTimeStamp = new Date(formValue.visitDateTime).getTime();
  //   if (visitDateTimeTimeStamp <= currentTimeStamp) {
  //     this.toastr.error(
  //       'Visit Date Time must be greater than current date time!'
  //     );
  //     return false;
  //   }

  //   const payload = {
  //     visitTime: this.datePipe.transform(formValue.visitDateTime, 'HH:mm'),
  //     visitDate: this.datePipe.transform(formValue.visitDateTime, 'yyyy/MM/dd'),
  //     visitDiscription: formValue.description,
  //     visitSpaceTypeId: formValue.typeOfSpaceId,
  //   };

  //   if(this.isUpdating){
  //       let visitId = this.data?.scheduleVisitDetails?.visitId ? this.data?.scheduleVisitDetails?.visitId : null;
  //       this.spaceService.userUpdateScheduleVisit(visitId, payload).subscribe(
  //           (response: any) => {
  //             console.log('onSubmitScheduleVisit | response : ', response);
  //             if (response.result.success) {
  //               this.toastr.success(
  //                 response.result.message || 'Visit updated successfully!'
  //               );
  //               this.router.navigateByUrl('/',{skipLocationChange:true}).then(()=>{
  //                 this.router.navigate([`/visit-scheduling`])
  //               })
  //               this.closeDialog(null);
  //             } else {
  //               this.toastr.error(
  //                 response.result.message ||
  //                   'Some error occurred while visit updated!'
  //               );
  //             }
  //           },
  //           (error) => {
  //             console.log('onSubmitScheduleVisit | error : ', error);
  //             this.toastr.error('Some error occurred while visit schedule!');
  //           }
  //         );
  //   } else {
  //       this.spaceService.userScheduleVisit(this.spaceId, payload).subscribe(
  //         (response: any) => {
  //           console.log('onSubmitScheduleVisit | response : ', response);
  //           if (response.result.success) {
  //             this.toastr.success(
  //               response.result.message || 'Visit scheduled successfully!'
  //             );
  //             this.closeDialog(null);
  //           } else {
  //             this.toastr.error(
  //               response.result.message ||
  //                 'Some error occurred while visit schedule!'
  //             );
  //           }
  //         },
  //         (error) => {
  //           console.log('onSubmitScheduleVisit | error : ', error);
  //           this.toastr.error('Some error occurred while visit schedule!');
  //         }
  //       );
  //   }
  // }
}
