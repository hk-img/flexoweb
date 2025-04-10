import { Component, Inject, Input, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from "@angular/material/legacy-dialog";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { SpaceService } from "../services/space.service";

@Component({
    selector: 'app-workspace-rating-review',
    templateUrl: './workspace-rating-review.component.html',
    styleUrls: ['./workspace-rating-review.component.css'],
})
export class WorkspaceRatingReviewComponent implements OnInit {

    public ref;
    public workspaceRatingReviewForm: UntypedFormGroup;
    public isRateSpace: boolean = false;

    @Input('rating') public rating: number = 0;
    @Input('starCount') public starCount: number = 5;
    @Input('color') public color: string = 'accent';

    // private snackBarDuration: number = 2000;
    public ratingArr = [];

    constructor(
        public fb: UntypedFormBuilder,
        private spaceService: SpaceService,
        private toastr: ToastrService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private router: Router
    ){ }

    ngOnInit(){ 
        for (let index = 0; index < this.starCount; index++) {
            this.ratingArr.push(index);
        }

        this.workspaceRatingReviewForm = this.fb.group({
            rating: [ 0, [Validators.required] ],
            review: [""]
        });
        if(this.data.userSpaceReviewDetails != null){
            this.isRateSpace = true;
            this.rating = this.data.userSpaceReviewDetails.rating;
            this.workspaceRatingReviewForm.setValue({ rating: this.rating, review: this.data.userSpaceReviewDetails.review ? this.data.userSpaceReviewDetails.review : "" });
        }
    }

    public closeDialog(options) {
        this.ref.close(options);
    }

    public onSubmitRatingReview(){
        const formValue = this.workspaceRatingReviewForm.getRawValue();
        let payload = {
            rating: formValue.rating,
            Review: formValue.review
        }
        let space_id = this.data.space_id ? this.data.space_id : null;
        let link_name = this.data.link_name ? this.data.link_name : null;
        if(this.isRateSpace){
            let rating_id = this.data.userSpaceReviewDetails.ratingId ? this.data.userSpaceReviewDetails.ratingId : null;
            this.spaceService.updateRatingReview(rating_id, payload, space_id).subscribe((response:any) => {
                if(response.result.success){
                    this.toastr.success(response.result.message || 'Rated space successfully!')
                    this.closeDialog(null);
                    this.router.navigateByUrl('/',{skipLocationChange:true}).then(()=>{
                        this.router.navigate([`/details/${link_name}`])
                    })
                } else {
                    this.toastr.error(response.result.message || 'Some error occurred while rating added!')
                }
            })
        } else {
            this.spaceService.addRatingReview(payload, this.data.space_id).subscribe((response:any) => {
                if(response.result.success){
                    this.toastr.success(response.result.message || 'Rated space successfully!')
                    this.closeDialog(null);
                    this.router.navigateByUrl('/',{skipLocationChange:true}).then(()=>{
                        this.router.navigate([`/details/${link_name}`])
                    })
                } else {
                    this.toastr.error(response.result.message || 'Some error occurred while rating added!')
                }
            })
        }
    }

    onReviewRating(rating:number) {
        this.rating = rating;
        const formValue = this.workspaceRatingReviewForm.getRawValue();
        this.workspaceRatingReviewForm.setValue({ rating: this.rating, review: formValue.review ? formValue.review : "" });
      }
    
    showIcon(index:number) {
        if (this.rating >= index + 1) {
          return 'star';
        } else {
          return 'star_border';
        }
    }
}