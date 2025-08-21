import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SpaceService } from 'src/app/services/space.service';

@Component({
  selector: 'app-view-more-reviews',
  templateUrl: './view-more-reviews.component.html',
  styleUrls: ['./view-more-reviews.component.css'],
})
export class ViewMoreReviews implements OnInit {
  public space_name;
  public space_id;
  public spaceRatingReviewList = [];
  public ratingBreakDown = [];
  public rating_array = [0, 1, 2, 3, 4];
  public catagoryArr = [
    {
      value: 'topRating',
      label: 'Top Rating',
    },
    {
      value: 'lowestRating',
      label: 'Lowest Rating',
    },
    {
      value: 'latestRating',
      label: 'Latest Rating',
    },
    {
      value: 'oldestRating',
      label: 'Oldest Rating',
    },
  ];
  public startArr = [
    {
      value: '',
      label: 'All Stars',
    },
    {
      value: '5',
      label: '5 Star only',
    },
    {
      value: '4',
      label: '4 Star only',
    },
    {
      value: '3',
      label: '3 Star only',
    },
    {
      value: '2',
      label: '2 Star only',
    },
    {
      value: '1',
      label: '1 Star only',
    },
  ];
  public currentDateTime = new Date();
  public sortBy = 'latestRating';
  public starBy = '';
  public page = 1;
  public pageSize = 10;
  public totalReviews = 0;
  public totalPage = 1;
  public disabledPrev: boolean = true;
  public disabledNext: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private spaceService: SpaceService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.space_name = params.get('space-name');
      this.space_id = +this.space_name?.substring(
        this.space_name.lastIndexOf('-') + 1
      );
    });

    this.onLoadMoreReviews();
  }

  ratingReviewBySpaceId() {
    this.spaceService
      .getSpaceRatingReviewDetailsWithSortPagination(
        this.space_id,
        this.sortBy,
        this.page,
        this.pageSize,
        this.starBy
      )
      .subscribe((result: any) => {
        this.spaceRatingReviewList = [];
        if (result.data.success) {
          let reviews = result.data.reviews ? result.data.reviews : [];
          this.totalReviews = result.data.totalReviews
            ? result.data.totalReviews
            : 0;
          this.totalPage = Math.ceil(this.totalReviews / this.pageSize);
          if (this.totalReviews > this.page * this.pageSize) {
            this.disabledNext = false;
          } else {
            this.disabledNext = true;
          }

          this.spaceRatingReviewList = reviews;
        }
      });
  }

  onLoadMoreReviews(pageType = null) {
    if (pageType != null) {
      if (pageType == 'next') {
        if (this.totalReviews > this.page * this.pageSize) {
          this.page = this.page + 1;
        }
      } else {
        this.page = this.page - 1;
        if (this.page <= 1) {
          this.page = 1;
        }
      }
    }
    if (this.page >= 1) {
      this.disabledPrev = true;
      if (this.page > 1) {
        this.disabledPrev = false;
      }
      this.ratingReviewBySpaceId();
    }
  }

  filterCategory(value) {
    this.sortBy = value;
    this.ratingReviewBySpaceId();
  }
  filterStarCategory(value) {
    this.starBy = value;
    this.ratingReviewBySpaceId();
  }
  showStarIcon(index: number, rating) {
    if (rating >= index + 1) {
      return '<i class="ion-android-star"></i>';
    } else {
      return '<i class="ion-android-star-outline"></i>';
    }
  }

  calculateDateDifference(startDate: Date, endDate: Date): string {
    let sd = new Date(startDate);
    const diffInMilliseconds = endDate.getTime() - sd.getTime();
    const seconds = Math.floor(diffInMilliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30); // Approximate months
    const years = Math.floor(days / 365); // Approximate years

    if (years > 0) {
      return this.datePipe.transform(startDate, 'mediumDate');
    } else if (months > 0) {
      return `${months} months ago`;
    } else if (days > 0) {
      return `${days} days ago`;
    } else if (hours > 0) {
      return `${hours} hours ago`;
    } else if (minutes > 0) {
      return `${minutes} minutes ago`;
    } else {
      return `${seconds} seconds ago`;
    }
  }
}