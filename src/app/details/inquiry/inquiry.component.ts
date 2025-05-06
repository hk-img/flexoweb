import { Component, Inject, Input, PLATFORM_ID, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA,
  MatLegacyDialog as MatDialog,
  MatLegacyDialogRef as MatDialogRef
} from '@angular/material/legacy-dialog';
import { ActivatedRoute, ParamMap } from '@angular/router';
import intlTelInput from 'intl-tel-input';
import { CountryISO } from 'ngx-intl-tel-input';
import { ToastrService } from 'ngx-toastr';
import { SpaceService } from 'src/app/services/space.service';
import { ThankyopopupComponent } from 'src/app/thankyopopup/thankyopopup.component';
import { DetailsComponent } from '../details.component';
import { isPlatformBrowser } from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-inquiry',
  templateUrl: './inquiry.component.html',
  styleUrls: ['./inquiry.component.css']
})
export class InquiryComponent {
  @Input() childInput: string;
  @ViewChild('profileDetailForm') profileDetailForm: NgForm;
  formData: any = {
    spaceType: [],
  };

  private_cabin_price: any;
  managed_office_price: any;
  dedicated_desk_price: any;
  virtual_office_price: any;
  meeting_room_price: any;
  isCoworkings: string;
  userDetail: any;
  space_name: string;
  space_id: number;
  isOpen: boolean = true;
  userId: any;
  public ref: any;
  iti: any = intlTelInput;
  CountryISO = CountryISO;
  selectedCountryData: any;
  dialCode: any;
  countryName: any;
  val: any;
  flexible_dek_price: any;
  countryCodes: any = [];
  selectedIndex: any;
  placeholder: string = '0123456789';
  valueForListingPage: string;
  staticValue: string;
  city_name: any = localStorage.getItem('city_name');
  spaceDetail: any;
  value: any;
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
    { workSpaceName: 'Not Sure', typeOfSpace: "Not Sure" },
  ]

  constructor(@Inject(PLATFORM_ID) private platformId: any, public dialogRef: MatDialogRef<InquiryComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, private detailPage: DetailsComponent, private service: SpaceService, private route: ActivatedRoute, private toastr: ToastrService) {

    let user_detail = JSON.parse(localStorage.getItem("userDetails"));
    this.userId = user_detail?.id;

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.space_id = Number(params.get('spaceId'));
    });

    this.updatePlaceholder();
    this.value = this.data.value;
    setTimeout(() => {
      if (localStorage.getItem("spaceDetail")) {
        let space_detail = JSON.parse(localStorage.getItem("spaceDetail"));
        this.private_cabin_price = space_detail?.privatecabin_price;
        this.managed_office_price = space_detail?.customized_space_price;
        this.dedicated_desk_price = space_detail?.desks_price;
        this.flexible_dek_price = space_detail?.flexible_desk_price;
        this.virtual_office_price = space_detail?.virtual_office_price;
        this.meeting_room_price = space_detail?.meeting_room_price;
        this.userId = space_detail?.user_id;
      } else {
        setTimeout(() => {
          let space_detail = this.data.spaceDetail;
          this.private_cabin_price = space_detail?.privatecabin_price;
          this.managed_office_price = space_detail?.customized_space_price;
          this.dedicated_desk_price = space_detail?.desks_price;
          this.flexible_dek_price = space_detail?.flexible_desk_price;
          this.virtual_office_price = space_detail?.virtual_office_price;
          this.meeting_room_price = space_detail?.meeting_room_price;
          this.userId = space_detail?.user_id;
        }, 300);
      }
    }, 300);
  }

  ngOnInit(): void {
    this.formData.spaceType = this.data.name ?? "";
    if (isPlatformBrowser(this.platformId)) {
      this.isCoworkings = sessionStorage.getItem('isCoworking');
      this.valueForListingPage = localStorage.getItem('staticValue');
    }

    const url = window.location.href;  // Get the full URL
    const segments2 = url.split('/');

    // Find 'in' in the URL and extract the next static segment ('longTerm')
    // const inIndex = segments2.indexOf('in');
    // if (inIndex !== -1 && segments2.length > inIndex + 1) {
    //   this.staticValue = segments2[inIndex + 1];
    // }

    if (localStorage.getItem('userDetails')) {
      this.userDetail = JSON.parse(localStorage.getItem('userDetails') || '');
      this.formData.firstName = this.userDetail?.firstName;
      this.formData.lastName = this.userDetail?.lastName;
      this.formData.userEmail = this.userDetail?.email;
      this.formData.userMobile = this.userDetail?.mobile?.replace(" ", "");
      this.formData.phone = this.userDetail?.mobile;
      this.formData.phone_code = String(`+${this.userDetail?.phone_code}`);
      this.dialCode = this.userDetail?.phone_code;
    } else {
      this.formData.phone_code = '+91'
    }
    this.countryCodes = this.service.countryCodes;
  }

  onCountryCodeChange(country: any) {
    this.profileDetailForm.control.patchValue({ userMobile: '' })
    this.profileDetailForm.value.phone_code = country;
    this.selectedIndex = this.countryCodes.findIndex((code: any) => code?.dialcode === country);
    this.updatePlaceholder();
  }

  updatePlaceholder() {
    if (this.selectedIndex) {
      this.placeholder = Array.from({ length: this.countryCodes[this.selectedIndex]['number-of-digits-in-number'] }, (_, i) => i).join('');
    }
  }

  closeModal(options: any) {
    this.ref.close(options);
  }

  popupOpen(category, title1): void {
    let payload = {
      component: "favourite-workspace",
      title: title1,
      category: category,
      message: 'Are you sure you want to Unfavourite this workspace?'
    }
    this.dialog.open(ThankyopopupComponent, { data: payload, width: '500px' });
  }

  getSpaceType(event: any) {
    this.formData.spaceType = [event];
  }

  onSubmit(formData: any) {
    if (!this.profileDetailForm.value.spaceType) {
      this.profileDetailForm.value.spaceType = this.data?.name;
    }
    if (isPlatformBrowser(this.platformId)) {
      if (this.valueForListingPage == 'Coworking') {
        this.profileDetailForm.value.type = 'Coworking';
      } else {
        this.profileDetailForm.value.type = 'Longterm';
        formData.city = [this.city_name]
      }
    }
    if (this.city_name) {
      formData.city = [this.city_name]
    }
    if (this.formData.firstName || this.formData.lastName || this.formData.userEmail) {
      formData.firstName = this.formData.firstName
      formData.lastName = this.formData.lastName
      formData.userEmail = this.formData.userEmail
    } else {
      this.profileDetailForm.value.firstName = this.userDetail?.firstName
      this.profileDetailForm.value.lastName = this.userDetail?.lastName
      this.profileDetailForm.value.userEmail = this.userDetail?.email
    }
    if (this.profileDetailForm.form.status == 'VALID') {
      if (localStorage.getItem('userDetails')) {
        this.userDetail = JSON.parse(localStorage.getItem('userDetails') || '');
        formData.userId = this.userDetail?.id;
      } else {
        formData.userId = 0;
        formData.firstName = this.formData.firstName
        formData.lastName = this.formData.lastName
        formData.userEmail = this.formData.userEmail
      }
      if (this.space_id) {
        formData.spaceId = this.space_id;
      }
      formData.spaceId = this.data.spaceId
      this.service.inquiryBooking(formData).subscribe((data: any) => {
        if (data?.result?.success) {
          this.popupOpen("inquirenow", `${data?.result?.message}. Our team will get back to you shortly.`);
          // this.toastr.success(data?.result?.message)
          this.detailPage.inquiryVisit_dialogRef.close();
        } else {
          this.toastr.error(data?.result?.message)
        }
      }, error => {
        this.toastr.error(error?.error?.message)
      })
    }
    else {
      this.profileDetailForm.form.markAllAsTouched();
    }
  }

}
