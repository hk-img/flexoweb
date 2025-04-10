import { Component, Inject, OnInit } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FavouriteWorkSpaceService } from 'src/app/favourite-workspace/favourite-workspace.service';
import { SpaceService } from 'src/app/services/space.service';

export interface ConfirmDialogData {
  component: string
  title: string;
  message: string;
  componentData: any;
  price:any
}

@Component({
  selector: 'dialog-confirmation-popup',
  templateUrl: 'dialog-confirmation-popup.component.html',
  styleUrls: ['./dialog-confirmation-popup.component.css'],
})
export class DialogConfirmationPopUp implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogConfirmationPopUp>, 
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData,
    // private favouriteWorkSpaceComponent: FavouriteWorkSpaceComponent,
    private router: Router,
    private toastr: ToastrService,
    private favouriteWorkspaceSevice: FavouriteWorkSpaceService,
    private spaceService: SpaceService,
  ) {}

  ngOnInit(){
  }

  successConfirmation(){
    if(this.data.component == 'favourite-workspace'){
      this.removeFavouriteWorkSpace(this.data.componentData)
    }
    if(this.data.component == 'scheduled-visit-list'){
      this.cancelScheduledVisit(this.data.componentData)
    }
    if(this.data.component == 'booking-request-inquiries'){
      this.cancelInquiry(this.data.componentData)
    }
  }

  public removeFavouriteWorkSpace(item) {
    this.favouriteWorkspaceSevice
      .addRemoveFavouriteWorkSpace(item.id)
      .subscribe(
        (result: any) => {
          this.toastr.success(result.message);
          this.router.navigateByUrl('/',{skipLocationChange:true}).then(()=>{
            this.router.navigate([`/favourite-workspace`])
          })
        },
        (error) => {
          this.toastr.success(
            'Some error occurred while unfavourite work space!'
          );
        }
    );
  }
  
  public cancelScheduledVisit(item) {
    this.spaceService.cancelScheduledVisit(item.visitId)
      .subscribe(
        (result: any) => {
          if(result.success){
            this.toastr.success(result.message);
            this.router.navigateByUrl('/',{skipLocationChange:true}).then(()=>{
              this.router.navigate([`/visit-scheduling`])
            })
          } else {
            this.toastr.error(
              result.message || 'Some error occurred while cancel schedule visit!'
            );  
          }
        },
        (error) => {
          this.toastr.error(
            'Some error occurred while cancel schedule visit!'
          );
        }
    );
  }
  
  public cancelInquiry(item) {
    this.spaceService.cancelInquiry(item.spaceId, item.inquiryId)
      .subscribe(
        (response: any) => {
          if(response.result.success){
            this.toastr.success(response.result.message);
            this.router.navigateByUrl('/',{skipLocationChange:true}).then(()=>{
              this.router.navigate([`/booking-request-inquires`])
            })
          } else {
            this.toastr.error(
              response.result.message || 'Some error occurred while cancel inquiry!'
            );  
          }
        },
        (error) => {
          this.toastr.error(
            'Some error occurred while cancel inquiry!'
          );
        }
    );
  }


  confirmed(){
    this.dialogRef.close(true);
  }


}