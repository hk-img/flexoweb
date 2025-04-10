import { ChangeDetectorRef, Component, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import {
  MatLegacyDialog as MatDialog
} from '@angular/material/legacy-dialog';
import { Router } from '@angular/router';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { AppGlobals } from '../services/app-globals';
import { DialogConfirmationPopUp } from '../shared/component/dialog-confirmation-popup/dialog-confirmation-popup.component';
import { FavouriteWorkSpaceService } from './favourite-workspace.service';

@Component({
  selector: 'app-favourite-workspace',
  templateUrl: './favourite-workspace.component.html',
  styleUrls: ['./favourite-workspace.component.css'],
})
export class FavouriteWorkSpaceComponent implements OnInit {
  favouriteWorkSpaceList: any = [];

  public aws_base_url = 'https://s3.ap-south-1.amazonaws.com/' + environment.s3_bucket_path + '/details_images/';
  webDomain = environment.webDomain
  ratingOffset=0;
  shortListReviewListOffset: any = [];
  linkName:any;
  

  @ViewChild('slickMainCarousel', { static: false })
  slickMainCarousel: SlickCarouselComponent;
  public mainSliderConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    centerMode: true,
    dots: false,
    centerPadding: '0',
    variableHeight: false,
    autoplay: false,
    swipeToSlide: true,
    infinite: true,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          variableHeight: false,
        },
      },
    ],
  };
  
  @Input() spaceDetails;
  @Input() isMobile;

  is_see_more_visible: boolean[] = [];

  public page = 1;
  public pages = [];
  public page_start = 1;
  public page_size = 20;
  public page_end;
  public active_page = 1;
  total_pages;
  reviewCount: any;

  constructor(
    private favouriteWorkspaceSevice: FavouriteWorkSpaceService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private appGlobals: AppGlobals,
    private dtr: ChangeDetectorRef,
    private ngZone: NgZone,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getAllFavouriteWorkSpace();
  }

  getAllFavouriteWorkSpace() {
    this.favouriteWorkspaceSevice.getFavoriteList().subscribe(
      (result: any) => {
        this.favouriteWorkSpaceList = [];
        if (result.favoriteSpaceList && result.favoriteSpaceList.length > 0) {
          for (let i = 0; i < result.favoriteSpaceList.length; i++) {
            let spaceData = result.favoriteSpaceList[i].spaceData;
            
            let actual_name = spaceData.actual_name.replace(/ /g,"-");
            let location_name = spaceData.location_name.replace(/ /g,"-");
            let link_name = `${actual_name}-${location_name}-${spaceData.id}`;
            this.reviewCount = result?.favoriteSpaceList[i]?.reviews?.length || 0;

            result.favoriteSpaceList[i].spaceData.linkName = link_name.toLowerCase();
            this.favouriteWorkSpaceList.push(spaceData);
          }
          
          this.shortListReviewListOffset = this.favouriteWorkSpaceList.slice(this.ratingOffset, 6);

        }
        this.ngZone.run(() => this.dtr.detectChanges());
      },
      (error) => {
      }
    );
  }

  nextReviewList() {
    if (this.favouriteWorkSpaceList.length > this.shortListReviewListOffset.length) {
        const endIndex = Math.min(this.ratingOffset+6, this.favouriteWorkSpaceList.length);
        const nextReviews = this.favouriteWorkSpaceList.slice(this.ratingOffset, endIndex);
        this.shortListReviewListOffset.push(...nextReviews);
        this.ratingOffset += 5;
    }
  }

  onRemoveFavourite(item): void {
    let payload = {
        component: "favourite-workspace",
        title: 'Remove this space from favorites?',
        message: 'Are you sure you want to Unfavourite this workspace?',
        componentData: item 
    }
    this.dialog.open(DialogConfirmationPopUp, { data: payload ,width: '500px'});
  }

  next() {
    this.slickMainCarousel.slickNext();
  }

  prev() {
    this.slickMainCarousel.slickPrev();
  }

  toggleSeeMore(e: Event, index: number, value: boolean) {
    e.stopPropagation();
    this.is_see_more_visible[index] = value;
  }

  pagination(num) {
    this.page_start = num * this.page_size - (this.page_size - 1);
    this.page_end =
    this.favouriteWorkSpaceList.length < num * this.page_size
        ? this.favouriteWorkSpaceList.length
        : num * this.page_size;
    this.active_page = num;
    this.page = num;
    this.getAllFavouriteWorkSpace();
  }

  handleImageError(event:any){

    const imgElement=event.target as HTMLImageElement
    imgElement.src = 'assets/images/details_placeholder_image.jpg';
    imgElement.alt = 'Failed to Load Image';
  }



  formatUrl(value: string): string {
    return value?.trim()?.toLowerCase().replace(/\s+/g, '-');
  }

  onSpaceNameClicked(e: any) {
    if (e.spaceType === 'Coworking Space') {
      window.open(
        `${this.formatUrl(e.spaceType)}/${this.formatUrl(e.name)}-${e.id}`,
        '_blank'
      );
    } else {
      window.open(
        `${this.formatUrl(e.spaceType)}/${this.formatUrl(e.contact_city_name)}/${this.formatUrl(e.location_name)}/${e.id}`,
        '_blank'
      );
    }
  }
}
