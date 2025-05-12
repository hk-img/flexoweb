import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';
import {
  MatLegacyDialog as MatDialog,
  MatLegacyDialogRef as MatDialogRef,
} from '@angular/material/legacy-dialog';
import { Router } from '@angular/router';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { InquiryComponent } from 'src/app/details/inquiry/inquiry.component';
import { environment } from '../../../../environments/environment';
import { GlobalVariables } from '../../../global/global-variables';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css'],
  providers: [MatDialog],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListItemComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  public loadAPI: Promise<any>;
  public aws_base_url = 'https://s3.ap-south-1.amazonaws.com/' + environment.s3_bucket_path + '/details_images/';
  webDomain = environment.webDomain;
  type: string;

  @Input() spaceDetails;
  @Input() isMobile;
  @Input() filters;
  @Input() is_similar_listing: boolean;

  @Output() shortlistItemEvent = new EventEmitter<any>();
  
  public resource_types = GlobalVariables.resource_types;
  public filter_type_name;
  public is_see_more_visible = 1;
  public filter_type_col_name;

  @ViewChild('slickMainCarousel', { static: false })
  slickMainCarousel: SlickCarouselComponent;

  public mainSliderConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
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

  constructor(
    private router: Router,
    public inquiryVisit_viewContainerRef: ViewContainerRef,
    public inquiryVisit_dialogRef: MatDialogRef<any>,
    public inquiryVisit_dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initializeSpaceDetails();
    this.initializeFilters();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeSpaceDetails(): void {
    const name = this.spaceDetails.name?.toLowerCase();
    const buildingName = this.spaceDetails.buildingName?.toLowerCase();
    const location_name = this.spaceDetails.location_name?.toLowerCase();
    const spaceType = this.spaceDetails.spaceType?.toLowerCase();

    const shortTermSpaces = [
      'coworking space', 'coworking café/restaurant', 'shoot studio', 'recording studio',
      'podcast studio', 'activity space', 'sports turf', 'sports venue', 'party space',
      'banquet hall', 'gallery', 'classroom', 'private cabin', 'meeting room',
      'training room', 'event space'
    ];

    this.spaceDetails.imageAlt = shortTermSpaces.includes(spaceType) 
      ? `${name} ${location_name} ${spaceType}`
      : `${buildingName} ${location_name} ${spaceType}`;

    this.type = this.getType(spaceType);
    this.cdr.markForCheck();
  }

  private initializeFilters(): void {
    if (this.filters?.type != null) {
      const resourceType = this.resource_types.find(x => x.id == this.filters.type);
      this.filter_type_name = resourceType?.name;
      this.filter_type_col_name = resourceType?.column_name;
      this.cdr.markForCheck();
    }
  }

  getArray(length: number): number[] {
    return Array(length || 5).fill(0);
  }

  onImageError(event: Event, imageAlt: string): void {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/images/details_placeholder_image.jpg';
    target.alt = `${imageAlt} details_placeholder_image.jpg`;
  }

  next(evt: Event): void {
    evt.stopPropagation();
    this.slickMainCarousel.slickNext();
  }

  prev(evt: Event): void {
    evt.stopPropagation();
    this.slickMainCarousel.slickPrev();
  }

  toggleSeeMore(e: Event, value: number): void {
    e.stopPropagation();
    this.is_see_more_visible = value;
    this.cdr.markForCheck();
  }

  openDetailsPage(): void {
    window.open('coworking-space/' + this.spaceDetails.link_name, '_blank');
  }

  openFacebook(): void {
    const url = `${window.location.origin}/coworking-space/${this.spaceDetails.link_name.toLowerCase()}`;
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      'facebook-popup',
      'height=350,width=600'
    );
  }

  openLinkedIn(): void {
    const url = `${window.location.origin}/coworking-space/${this.spaceDetails.link_name.toLowerCase()}`;
    window.open(
      `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=Share%Spaces`,
      'linkedin-popup',
      'height=350,width=600'
    );
  }

  openWhatsapp(): void {
    const staticText = 'Checkout this space on FLEXO ';
    const url = `${window.location.origin}/coworking-space/${this.spaceDetails.link_name}`;
    
    if (!this.isMobile) {
      window.open(
        `https://web.whatsapp.com/send?text=${staticText}-${url}`,
        'whatapp-popup',
        'height=650,width=650'
      );
    } else {
      window.open(`whatsapp://send?text=${staticText}-${url}`);
    }
  }

  shortListItem(e: Event, id: number, is_shortlisted: boolean): void {
    e.stopPropagation();
    this.shortlistItemEvent.emit({ id, is_shortlisted });
  }

  formatUrl(value: string): string {
    return value?.trim()?.toLowerCase().replace(/\s+/g, '-');
  }

  getType(spaceType: string): string {
    const shortTermSpaces = [
      'coworking café/restaurant', 'shoot studio', 'recording studio', 'podcast studio',
      'activity space', 'sports turf', 'sports venue', 'party space', 'banquet hall',
      'gallery', 'classroom', 'private cabin', 'meeting room', 'training room', 'event space'
    ];
    const longTermSpaces = [
      'managed office', 'private office', 'shared office', 'virtual office'
    ];

    if (spaceType === 'coworking space') {
      return "coworking";
    } else if (shortTermSpaces.includes(spaceType)) {
      return "shortterm";
    } else if (longTermSpaces.includes(spaceType)) {
      return "longterm";
    }
    return "coworking";
  }

  onSpaceNameClicked(e: any): void {
    window.open(e.slug, '_blank');
  }

  openInquiryPopUp(e: Event, spaceDetail: any): void {
    e.stopPropagation();
    setTimeout(() => {
      const config = new MatDialogConfig();
      config.viewContainerRef = this.inquiryVisit_viewContainerRef;
      config.panelClass = 'enq-mod-c';
      config.width = '100%';
      config.maxWidth = '55vw';
      config.data = {
        spaceDetail,
        spaceId: spaceDetail?.id,
        value: 'listing'
      };

      this.inquiryVisit_dialogRef = this.inquiryVisit_dialog.open(
        InquiryComponent,
        config
      );

      this.inquiryVisit_dialogRef.componentInstance.ref = this.inquiryVisit_dialogRef;
      this.inquiryVisit_dialogRef.componentInstance.flag = 1;

      this.inquiryVisit_dialogRef.afterClosed()
        .pipe(takeUntil(this.destroy$))
        .subscribe((result) => {
          if (result?.success) {
            // Handle success
          }
        });
    });
  }

  getValidPrice(desksPrice: number | null | undefined, flexiblePrice: number | null | undefined): number | null {
    if (this.isPriceValid(desksPrice)) return desksPrice;
    if (this.isPriceValid(flexiblePrice)) return flexiblePrice;
    return null;
  }

  isPriceValid(price: number | null | undefined): boolean {
    return price !== null && price !== undefined && price > 0;
  }

  trackByImage(index: number, image: string): string {
    return image;
  }
}
