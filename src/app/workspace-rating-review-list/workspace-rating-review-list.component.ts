import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { SpaceService } from '../services/space.service';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-workspace-rating-review-list',
	templateUrl: './workspace-rating-review-list.component.html',
	styleUrls: ['./workspace-rating-review-list.component.css'],
})
export class WorkspaceRatingReviewListComponent implements OnInit {
	
    public aws_base_url = 'https://s3.ap-south-1.amazonaws.com/' + environment.s3_bucket_path + '/details_images/';
    webDomain = environment.webDomain
    reviewRatingList: any = [];
    public rating_array = [0,1,2,3,4];
    ratingOffset=0; 
    spaceRatingReviewList = [];
    linkName:any;
    
    constructor(
        private spaceService: SpaceService,
        private dtr: ChangeDetectorRef,
    ) {
        this.getReviewRatingListByUser();
    }

	ngOnInit(): void {
	}

    getReviewRatingListByUser(){
        this.spaceService.getSpaceRatingReviewDetailsByUser().subscribe((result:any)=> {
            if(result.data.success){
                this.reviewRatingList = [];
                this.spaceRatingReviewList = [];
                this.reviewRatingList = result.data.reviews ? result.data.reviews : [];
                this.spaceRatingReviewList = this.reviewRatingList.slice(this.ratingOffset, 5);
                for (let i = 0; i < this.reviewRatingList.length; i++) {
                    let actual_name = this.reviewRatingList[i]?.spacename ? this.reviewRatingList[i]?.spacename.replace(/ /g, "-") : "";
                    let location_name = this.reviewRatingList[i]?.spaceLocationName ? this.reviewRatingList[i]?.spaceLocationName.replace(/ /g, "-") : "";
                    let link_name = `${actual_name}-${location_name}-${this.reviewRatingList[i].spaceId}`;
                    this.reviewRatingList[i].linkName = link_name.toLowerCase();
                  }
            }
            this.dtr.detectChanges();
        }, error => {
        })
    }

    handleImageError(event:any){

        const imgElement=event.target as HTMLImageElement
        imgElement.src = 'assets/images/details_placeholder_image.jpg';
        imgElement.alt = 'Failed to Load Image';
        }

    nextReviewList() {
        if (this.reviewRatingList.length > this.spaceRatingReviewList.length) {
            const endIndex = Math.min(this.ratingOffset + 5, this.reviewRatingList.length);
            const nextReviews = this.reviewRatingList.slice(this.ratingOffset, endIndex);
            this.spaceRatingReviewList.push(...nextReviews);
            this.ratingOffset += 5;
        }
    }

    showStarIcon(index:number, rating) {
        if (rating >= index + 1) {
          return '<i class="ion-android-star"></i>';
        } else {
          return '<i class="ion-android-star-outline"></i>';
        }
    }
}
