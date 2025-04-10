import { Component, Inject, NgZone, PLATFORM_ID, ViewContainerRef } from '@angular/core';
import { DatePipe, isPlatformBrowser } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express';
import { ToastrService } from 'ngx-toastr';
import { AppGlobals } from 'src/app/services/app-globals';
import { SpaceService } from 'src/app/services/space.service';
import { environment } from 'src/environments/environment';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ThankyopopupComponent } from 'src/app/thankyopopup/thankyopopup.component';
import {
  MatLegacyDialog as MatDialog,
  MatLegacyDialogConfig as MatDialogConfig,
  MatLegacyDialogRef as MatDialogRef,
} from '@angular/material/legacy-dialog';
@Component({
  selector: 'app-add-review-dialog',
  templateUrl: './add-review-dialog.component.html',
  styleUrls: ['./add-review-dialog.component.css']
})
export class AddReviewDialogComponent {
  public isLoading: boolean = false;
  public spaceId: any;
  public ref;
  submitForm:boolean = false;
  public reviewForm: UntypedFormGroup;
  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    public dialog: MatDialog,
    private spaceService: SpaceService,
    private toastr: ToastrService,
    private datePipe: DatePipe,
    private _fb: FormBuilder
    // public dialogRef: MatDialogRef<RequestBookingComponent>
  ) {
    if (isPlatformBrowser(this.platformId)) {
    this.spaceId = sessionStorage.getItem('space_id');
    }
  }
  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.reviewForm = this._fb.group({
      rating: ['', Validators.required],
      additionalComments: [''],
      book_again:[true]
    });
  }

  public closeDialog(options) {
    this.ref.close(options);
    return false;
  }

  onCheckChange(event:any){
    this.reviewForm.patchValue({
      book_again: event.target.checked
    })
  }

  popupOpen(status,title1): void {
    let payload = {
        component: "favourite-workspace",
        title: title1,
        status: status,
        message: 'Are you sure you want to Unfavourite this workspace?'
    }
    this.dialog.open(ThankyopopupComponent, { data: payload ,width: '500px'});
  }
  onSumbit() { 
    let payload = this.reviewForm.value
    if(this.reviewForm.valid && !this.isLoading){
      this.isLoading = true;
      this.spaceService.addReview(this.spaceId, payload)
      .subscribe(
        (res: any) => {
          if (res?.result?.success) { 
            this.popupOpen("review",res?.result?.message);
            // this.toastr.success(res?.result?.message,"Success", { timeOut: 10000 }); 
            // setTimeout(() => { 
            //   window.location.reload();
            // }, 10000);
          } else {
            this.submitForm = true; 
            this.toastr.error(res?.result?.message,"Dismiss", { timeOut: 10000 }); 
          }
          this.isLoading = false;
          this.submitForm = false; 
          this.closeDialog(false);
        },
        (error) => {
          this.isLoading = false;
          this.submitForm = true;
          this.toastr.error('Some error occurred while visit schedule!');
        }
      );
    }else{
      this.submitForm = true;
    }
  }


}
