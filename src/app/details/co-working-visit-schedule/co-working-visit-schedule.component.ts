import { DatePipe } from '@angular/common';
import { Component, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import {  MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { LoginDialog } from 'src/app/login/login-dialog.component';
import { SpaceService } from 'src/app/services/space.service';
import { CoWorkingVisitScheduleTwoComponent } from '../co-working-visit-schedule-two/co-working-visit-schedule-two.component';
import { EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
@Component({
  selector: 'app-co-working-visit-schedule',
  templateUrl: './co-working-visit-schedule.component.html',
  styleUrls: ['./co-working-visit-schedule.component.css']
})
export class CoWorkingVisitScheduleComponent {
  isOpen: boolean = false;

  @ViewChild('modal1') modal!: CoWorkingVisitScheduleTwoComponent;
  @Output() formSubmitted: EventEmitter<any> = new EventEmitter();
  public coWorkingSchduleVisitForm: UntypedFormGroup;
  public scheduleVisitCoworking_dialogRef: MatDialogRef<any> | null = null;
  public scheduleVisitCoworking_viewContainerRef: ViewContainerRef
  public buyPass_dialog: MatDialog
  public space_id;
  public login_viewContainerRef: ViewContainerRef
  public login_dialogRef: MatDialogRef<any>
  public login_dialog: MatDialog
  showSchedule: boolean = false; 
  minDate = new Date(); // Today's date
  startTimes = [
  // { value: '00:00', viewValue: '12:00 AM' },
  // { value: '00:30', viewValue: '12:30 AM' },
  // { value: '01:00', viewValue: '1:00 AM' },
  // { value: '01:30', viewValue: '1:30 AM' },
  // { value: '02:00', viewValue: '2:00 AM' },
  // { value: '02:30', viewValue: '2:30 AM' },
  // { value: '03:00', viewValue: '3:00 AM' },
  // { value: '03:30', viewValue: '3:30 AM' },
  // { value: '04:00', viewValue: '4:00 AM' },
  // { value: '04:30', viewValue: '4:30 AM' },
  // { value: '05:00', viewValue: '5:00 AM' },
  // { value: '05:30', viewValue: '5:30 AM' },
  // { value: '06:00', viewValue: '6:00 AM' },
  // { value: '06:30', viewValue: '6:30 AM' },
  // { value: '07:00', viewValue: '7:00 AM' },
  // { value: '07:30', viewValue: '7:30 AM' },
  // { value: '08:00', viewValue: '8:00 AM' },
  // { value: '08:30', viewValue: '8:30 AM' },
  // { value: '09:00', viewValue: '9:00 AM' },
  // { value: '09:30', viewValue: '9:30 AM' },
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
  // { value: '24:00', viewValue: '12:00 AM' }
  ];
  startTime: any;
  endTime: any; 
  filteredStartTimes = [];
  selectedDay: any;

  constructor(
    private fb: UntypedFormBuilder,

    private spaceService: SpaceService,
    private toastr: ToastrService,
    private datePipe: DatePipe,
    // public dialog: MatDialog
  ) {

  
  }
  ngOnInit(): void {
    this.spaceService.showSchedule$.subscribe(show => this.showSchedule = show);
    this.coWorkingSchduleVisitForm = this.fb.group({
      visitDate: [
        "",
        [Validators.required],
      ],
      visitTime: ["",
        [Validators.required]],
       

    });
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
    if (this.startTime === '00:00' && this.endTime === '00:00') {
      this.filteredStartTimes = this.startTimes;
    } else {
      this.filteredStartTimes = this.getFilteredStartTimes();
    }
  }

  isTimeDisabled(time: string): boolean {

    const currentDate = new Date();

    const selectedDate = new Date(this.coWorkingSchduleVisitForm.value.visitDate);
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


  submit() {
    if (this.coWorkingSchduleVisitForm.valid) {
      const formValues = this.coWorkingSchduleVisitForm.value;
      const formattedDate = this.datePipe.transform(formValues.visitDate, 'yyyy-MM-dd');
      const visitInfo = {
        visitDate: formattedDate,
        visitTime: formValues.visitTime,
      };
  
      localStorage.setItem('coWorkingVisitInfo', JSON.stringify(visitInfo));
  
      // this.toastr.success('Visit info saved successfully');
  
      // Close the current dialog
      this. closeModal();
      this.modal.openModal1();
  
      // Open the second dialog after the first one is closed
    } else {
      this.toastr.error('Please fill in all required fields.');
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

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }
  openModal1() {
    this.isOpen = true;
  }
  closeModal1() {
    this.isOpen = false;
  }
  
}
