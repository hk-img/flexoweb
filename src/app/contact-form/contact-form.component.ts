import {
  HostListener,
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  NgZone,
  ViewContainerRef,
  PLATFORM_ID,
  Inject
} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MemberService } from '../services/member.service';
import { ConfirmedValidator } from '../confirmed.validator';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';
import { GlobalVariables } from '../global/global-variables';
import { MatLegacyDialog as MatDialog, MatLegacyDialogConfig as MatDialogConfig, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { LoginDialog } from '../login/login-dialog.component';
import { SpaceService } from '../services/space.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
})
export class ContactFormComponent implements OnInit {
  // radioValue = false;
  public space_type;
  public company_name;
  public description;
  public booking_date_time;
  public page1 = true;
  public page2 = false;
  public page3 = false;
  public page4 = false;
  public no_of_persons = 0;
  public location_name = null;
  public autocomplete_location_name = null;
  public autocomplete_city_name = null;
  public no_of_pages = 4;
  public percentage;
  public logged_in: boolean;
  public loginForm: UntypedFormGroup;
  public form: UntypedFormGroup;
  public otpForm: UntypedFormGroup;
  public height_neccessary = false;
  public city_name = null;
  public isVertical;
  public space_id;
  public type_space_id;
  public inquiry_id;
  // public show_mobile = false;
  // public show_enter_passwords = false;
  public show_submit_response = false;
  public is_select_date_time_visible = false;
  public resource_types = GlobalVariables.resource_types;
  // @HostListener('window:resize') onWindowResize() {

  //   if (window.innerWidth <= 768) {
  //     this.isVertical = true;
  //   } else {
  //     this.isVertical = false;
  //   }
  // }
  public show_otp = false;
  public mobile;
  public email;
  public name;
  public otp;
  public otp_sent: boolean = false;
  public login: boolean = false;
  public signup: boolean = true;
  public is_user_exist: boolean = true;
  public autocomplete: google.maps.places.Autocomplete;
  @ViewChild('autocomplete', { static: false }) autocompleteElement: ElementRef;
  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar,
    private ngZone: NgZone,
    private _formBuilder: UntypedFormBuilder,
    private _memberService: MemberService,
    private router: Router,
    public login_dialogRef: MatDialogRef<any>,
    public login_dialog: MatDialog,
    public login_viewContainerRef: ViewContainerRef,
    private spaceService: SpaceService
  ) {
    this.form = _formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobile: [
        '',
        [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
      ],
    });
    this.loginForm = _formBuilder.group({
      mobile: [
        '',
        [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
      ],
    });
    this.otpForm = _formBuilder.group({
      otp: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.location_name = params.get('area');
      this.city_name = params.get('city');
    });
    this.route.queryParamMap.subscribe((params: ParamMap) => {
      this.space_id = params.get('space_id');
      this.type_space_id = params.get('type_space_id');
      this.inquiry_id = params.get('inquiry_id');
    });
    if(this.type_space_id != null ){
      this.onResourceTypeSelection(this.type_space_id);
    }

    if (this.location_name || this.space_id || this.city_name) {
      this.location_name =
        this.location_name && this.location_name.replace('-', ' ');
      this.city_name = this.city_name && this.city_name.replace('-', ' ');
      this.no_of_pages--;
      this.page1 = false;
      this.page2 = true;
    }
    // this.basicInfo();
    if (this.logged_in) {
      this.no_of_pages--;
    }
  }

  ngAfterViewInit() {
    if (!this.location_name && !this.space_id && !this.city_name) {
      this.initAutocomplete();
    }
  }

  onResourceTypeSelection(resource_type) {
    this.space_type = resource_type;
    if (resource_type == 6 || resource_type == 7) {
      this.is_select_date_time_visible = true;
    } else {
      this.is_select_date_time_visible = false;
    }
    this.router.navigate([],  // Remain on current route
    {
      relativeTo: this.route,
      queryParams: {
        space_id: this.space_id,
        type_space_id: resource_type,
        inquiry_id: this.inquiry_id,
      },
      queryParamsHandling: 'merge'  // Merge new params with existing params
    });
  }
  public initAutocomplete() {
    // geographical location types.
    this.autocomplete = new google.maps.places.Autocomplete(
      this.autocompleteElement.nativeElement,
      { types: ['geocode'] }
    );

    this.autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        let place_data =
          (this.autocomplete && this.autocomplete.getPlace()) || null;
        if (place_data.address_components[0].types.includes('sublocality')) {
          this.autocomplete_location_name =
            place_data.address_components[0].long_name;
        }
        for (let i = 1; i < place_data.address_components.length - 1; i++) {
          if (place_data.address_components[i].types[0] == 'locality') {
            this.autocomplete_city_name =
              place_data.address_components[i].long_name;
          }
        }
      });
    });
    this.autocomplete.setFields(['address_component', 'geometry']);
  }

  get f() {
    return this.form.controls;
  }
  get lf() {
    return this.loginForm.controls;
  }
  get of() {
    return this.otpForm.controls;
  }

  public Login() {
    this._memberService
      .login({ mobile: this.mobile })
      .then((res) => {
        this.login = false;
        if (res && res.success) {
          // this.is_user_exist = true;
          this.sendOtp();
        } else {
          this.openSnackBar(res.message, 'Error');
          // this.is_user_exist = false;
        }
      })
      .catch((error) => {
        this.openSnackBar('Some error occured', 'Error');
      });
  }

  public addWorker() {
    this._memberService
      .addWorker({ mobile: this.mobile, email: this.email, name: this.name })
      .then((data) => {
        if (data && data.success) {
          this.openSnackBar(data.message, 'Error');
          this.markAsNotVerified();
          // this.is_user_exist = true;
          this.sendOtp();
        } else {
          this.openSnackBar(data.message, 'Error');
        }
      })
      .catch((error) => {
        this.openSnackBar('Some error occured', 'Error');
      });
  }

  public sendOtp() {
    this._memberService
      .sendOTP({ mobile: this.mobile })
      .then((data) => {
        if (data && data.success) {
          this.otp_sent = true;
          this.openSnackBar(data.message, 'Dismiss');
        } else {
          this.openSnackBar(data.message, 'Dismiss');
        }
      })
      .catch((error) => {
        this.openSnackBar('Some error occured', 'Error');
      });
  }

  public verifyOtp() {
    this._memberService
      .verifyOTP({ mobile: this.mobile, otp: this.otp })
      .then((data) => {
        if (data && data.success) {
          this.openSnackBar(data.message, 'Success');
          this.markAsVerified();
          this.submitForm();
        } else {
          this.openSnackBar(data.message, 'Dismiss');
          // this.markAsNotVerified();
        }
      })
      .catch((error) => {
        // this.markAsNotVerified();
        this.openSnackBar('Some error occured', 'Error');
      });
  }

  markAsNotVerified() {
    this._memberService
      .markAsNotVerified({
        location_name: this.location_name || this.autocomplete_location_name,
        type: this.space_type,
        persons: this.no_of_persons,
        company_name: this.company_name,
        city_name: this.autocomplete_city_name || this.city_name,
        space_id: this.space_id,
        booking_date_time: this.booking_date_time,
        ...this.form.value,
      })
      .subscribe(
        (respone) => {},
        (error) => {}
      );
  }
  markAsVerified() {
    this._memberService
      .markAsVerified({
        location_name: this.location_name || this.autocomplete_location_name,
        type: this.space_type,
        persons: this.no_of_persons,
        company_name: this.company_name,
        city_name: this.autocomplete_city_name || this.city_name,
        space_id: this.space_id,
        booking_date_time: this.booking_date_time,
        ...this.form.value,
      })
      .subscribe(
        (respone) => {},
        (error) => {}
      );
  }

  public prevHelper(page) {}

  public nextHelper(page) {

    if (isPlatformBrowser(this.platformId)) {
      if (page == 1) {
        this.percentage = 100 / this.no_of_pages;
        this.page1 = false;
        this.page2 = true;
        this.page3 = false;
        this.height_neccessary = true;
      } else if (page == 2) {
        this.percentage = 2 * (100 / this.no_of_pages);
        this.page1 = false;
        this.page2 = false;
        this.page3 = true;
        this.height_neccessary = false;
      } else if (page == 3) {
        /* if (!this.logged_in) {
          this.percentage = 3 * (100 / this.no_of_pages);
          this.page3 = false;
          this.page4 = true;
          this.signup = true;
          this.login = false;
          this.otp_sent = false;
        } else {
          this.percentage = 3 * (100 / this.no_of_pages);
          this.submitForm();
        } */

        const isLoggedIn = localStorage.getItem('isLoggedIn')
        if(isLoggedIn){
          let payload = {
            inquirySpaceTypeId: this.space_type ? this.space_type : null,
            inquirySpaceBookingDateTime: this.booking_date_time ? this.booking_date_time : null,
            inquirySpaceCapacity: this.no_of_persons ? this.no_of_persons : null,
            inquiryCompanyName: this.company_name ? this.company_name : null,
            inquiryDescription: this.description ? this.description : ""
          }

          if(this.inquiry_id){
            this.spaceService.updateInquiry(this.inquiry_id,this.space_id, payload).subscribe((response:any) => {
              if(response.result.success){
                this.openSnackBar(response.result.message || 'Booking request updated successfully!', 'Success');
                this.router.navigateByUrl('/',{skipLocationChange:true}).then(()=>{
                  this.router.navigate([`/booking-request-inquires`])
                })
              } else {
                this.openSnackBar(response.result.message || 'Some error occurred while update inquiry!', 'Error');
              }
            }, error => {
              this.openSnackBar('Some error occurred while sent inquiry!', 'Error');
            })
          } else {
            this.spaceService.sentInquiry(this.space_id, payload).subscribe((response:any) => {
              if(response.result.success){
                this.openSnackBar(response.result.message || 'Inquiry sent successfully!', 'Success');
                this.show_submit_response = true;
    
              } else {
                this.openSnackBar(response.result.message || 'Some error occurred while sent inquiry!', 'Error');
              }
            }, error => {
              this.openSnackBar('Some error occurred while sent inquiry!', 'Error');
            })
          }

        } else {
          this.openLoginDialog();
        }
      }
    }

  }

  openLoginDialog() {
    let config = new MatDialogConfig();
    config.viewContainerRef = this.login_viewContainerRef;
    config.panelClass = 'dialogClass';
    config.width = '450px';
    config.disableClose = true

    this.login_dialogRef = this.login_dialog.open(LoginDialog, config);
    this.login_dialogRef.componentInstance.ref = this.login_dialogRef;
    this.login_dialogRef.componentInstance.flag = 1;
    this.login_dialogRef.afterClosed().subscribe((result) => {
      if (result && result.success) {
        window.location.reload();
      }
      this.login_dialogRef = null;
    });
  }

  /* basicInfo() {
    this._memberService
      .getBasicInfo()
      .then((data) => {
        if (data && data.success) {
          this.logged_in = true;
        } else {
          this.logged_in = false;
        }
      })
      .catch((err) => {
        throw err;
        // this.openSnackBar('Not Logged In', 'Dismiss');
      });
  } */
  openSnackBar(message: string, action: string) {
    // this.loaderService.displayLoader(false);
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
  submitForm() {
    this._memberService
      .submitContactForm({
        location_name: this.location_name || this.autocomplete_location_name,
        type: this.space_type,
        persons: this.no_of_persons,
        company_name: this.company_name,
        city_name: this.autocomplete_city_name || this.city_name,
        space_id: this.space_id,
        booking_date_time: this.booking_date_time,
        isLoggedIn: this.logged_in ? 1 : 0,
        ...this.form.value,
      })
      .then((res) => {
        if (res && res.success) {
          this.show_submit_response = true;
        }
      })
      .catch((error) => {
        this.openSnackBar('Some error occured', 'Error');
      });
  }

  setNoOfPeople(no_of_people) {
    this.no_of_persons = no_of_people;
  }
}
