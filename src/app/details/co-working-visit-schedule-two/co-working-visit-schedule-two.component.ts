import { DatePipe, isPlatformBrowser } from '@angular/common';
import { Component, EventEmitter, Inject, Output, PLATFORM_ID } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import {
  MatLegacyDialog as MatDialog
} from '@angular/material/legacy-dialog';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SpaceService } from 'src/app/services/space.service';
import { ThankyopopupComponent } from 'src/app/thankyopopup/thankyopopup.component';
import { CoWorkingVisitScheduleComponent } from '../co-working-visit-schedule/co-working-visit-schedule.component';
@Component({
  selector: 'app-co-working-visit-schedule-two',
  templateUrl: './co-working-visit-schedule-two.component.html',
  styleUrls: ['./co-working-visit-schedule-two.component.css']
})
export class CoWorkingVisitScheduleTwoComponent {
  @Output() formSubmitted: EventEmitter<any> = new EventEmitter();
  // @ViewChild('modal2') modal2!: CoWorkingVisitScheduleComponent;

  public coWorkingSchduleVisitForm: UntypedFormGroup;
  public space_id;
  showSchedule: boolean = false; 
  isFormSubmitted: boolean = false;
  public spaceId: any;
  visitDate: any;
  visitTime: any;
  private_cabin_price: any;
  managed_office_price: any;
  dedicated_desk_price: any;
  flexible_dek_price: any;
  virtual_office_price: any;
  meeting_room_price: any;
  submitForm:boolean = false;
  space_name: string;
  city: any;
  country: any;
  spaceType: string;
  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private fb: UntypedFormBuilder,
    public dialog: MatDialog,
    private spaceService: SpaceService,
    private toastr: ToastrService,
    private datePipe: DatePipe,
    private modal: CoWorkingVisitScheduleComponent,
    private route:ActivatedRoute
  ) {

    setTimeout(() => {
      if (isPlatformBrowser(this.platformId)) {
      this.spaceId = sessionStorage.getItem('space_id');
      }
    }, 300);
    this.visitDate = localStorage.getItem('coWorkingVisitInfo');
    // this.visitTime = JSON.parse(localStorage.getItem('coWorkingVisitInfo'));
    if (this.visitDate) {
      const visitInfo = JSON.parse(this.visitDate);
      this.visitDate = visitInfo.visitDate;
      this.visitTime = visitInfo.visitTime;
    }

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.space_name = params.get('spaceName');
      this.space_id = +this.space_name?.substring(
        this.space_name.lastIndexOf('-') + 1
      );
    });
  }

  getShortDetails(spaceId: number) {
    this.spaceService
      .getShortDetailsById(spaceId)
      .then((res) => {
        if (res.success) {
          this.city = res.spaceData.contact_city_name
          this.country = res.spaceData.country
          setTimeout(() => {
            this.spaceService.getSpaceDetails(this.country, this.city, this.spaceType, this.spaceId).then(
              (res) => {
                this.private_cabin_price = res?.data?.privatecabin_price;
                this.managed_office_price = res?.data?.customized_space_price;
                this.dedicated_desk_price = res?.data?.desks_price;
                this.flexible_dek_price = res?.data?.flexible_desk_price;
                this.virtual_office_price = res?.data?.virtual_office_price;
                this.meeting_room_price = res?.data?.meeting_room_price;
              }
            );
          }, 300);
        }
      }
      )
  }
  ngOnInit(): void {
    // this.spaceService.showSchedule$.subscribe(show => this.showSchedule = show);
    this.coWorkingSchduleVisitForm = this.fb.group({
      visitDate: [this.visitDate],
      visitTime: [this.visitTime],
        spaceType: ["",
        [Validators.required]],
        
        howManyPeople: ["",
        [Validators.required]],

    });
    this.route.params.subscribe((params: Params) => {
      this.spaceType = this.getOriginalUrlParam(params.spaceType);
      // this.space_id = params.spaceId;
      // alert(this.space_id)
      this.getShortDetails(this.space_id)
    });

  }

  getOriginalUrlParam(value: string): string {
    return value?.replace(/-/g, ' ')?.replace(/\b\w/g, char => char?.toLowerCase());
  }

  popupOpen(visit,title1): void {
    let payload = {
        component: "favourite-workspace",
        title: title1,
        visit: visit,
        message: 'Are you sure you want to Unfavourite this workspace?'
    }
    this.dialog.open(ThankyopopupComponent, { data: payload ,width: '500px'});
  }

  
  submit() {
   
      const formValues = this.coWorkingSchduleVisitForm.value;

      this.visitDate = localStorage.getItem('coWorkingVisitInfo'); 
      if (this.visitDate) {
        const visitInfo = JSON.parse(this.visitDate);
        formValues.visitDate = visitInfo.visitDate;
        formValues.visitTime = visitInfo.visitTime;
      }else{
        this.submitForm = true;
      }
 
      if(formValues?.spaceType == ''){
        this.submitForm = true;
      }else if(formValues?.howManyPeople == ''){
        this.submitForm = true;
      }else{
        const payload = {
          visitDate: formValues.visitDate,
          visitTime: formValues.visitTime,
          spaceType: formValues.spaceType,
          howManyPeople: formValues.howManyPeople
  
        };
    
        this.spaceService.userCoworkingVisitSchdule(this.spaceId, payload).subscribe(
          (response: any) => {
    
            this.isFormSubmitted = true;
         
          
    
            if (response.result.success) {
              this.popupOpen('coworking-visit',`${response?.result?.message}. Our team will get back to you shortly.`);
              // this.toastr.success(
              //   response?.result?.message
                
              // );
              this.coWorkingSchduleVisitForm.reset();
              this.closeModal1();
              // this.closeDialog(null);
            } else {
              this.toastr.error(
                response.message ||
                'Some error occurred while equest booking!'
              );
            }
          },
          (error) => {
            // this.toastr.error('Some error occurred while visit schedule!');
          }
        );
      }
  }
  
 
  isOpen: boolean = false;

  openModal1() {
    this.isOpen = true;
  }

  closeModal1() {
    this.isOpen = false;
  }
  
  openModal2() {
    this.isOpen = true;
  }

  closeModal2() {
    this.isOpen = false;
  }
  Privious(){
    this.closeModal2();
    this.modal.openModal();
  }
}