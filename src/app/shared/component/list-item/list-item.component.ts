import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
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
@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css'],
  providers:[MatDialog]
})
export class ListItemComponent implements OnInit{
  public loadAPI: Promise<any>;
  public aws_base_url =
    'https://s3.ap-south-1.amazonaws.com/' +
    environment.s3_bucket_path +
    '/details_images/';
  webDomain = environment.webDomain;
  type: string;
  constructor(private router: Router, public inquiryVisit_viewContainerRef: ViewContainerRef, public inquiryVisit_dialogRef: MatDialogRef<any>, public inquiryVisit_dialog: MatDialog,) {}

  @Input() spaceDetails;
  @Input() isMobile;
  @Input() filters;
  @Input() is_similar_listing: boolean;

  @Output() shortlistItemEvent = new EventEmitter<any>();
  public resource_types = GlobalVariables.resource_types;
  public filter_type_name;
  public is_see_more_visible = 1;
  public filter_type_col_name;
  ngOnInit(): void {
    console.log("this.spaceDetails", this.spaceDetails);
    const  name =this.spaceDetails.name?.toLowerCase()
    const  buildingName =this.spaceDetails.buildingName?.toLowerCase()
    const location_name = this.spaceDetails.location_name?.toLowerCase()
    const spaceType = this.spaceDetails.spaceType?.toLowerCase()
     if (
      spaceType === 'coworking space' ||
      spaceType === 'coworking cafe/restaurant' ||
      spaceType === 'shoot studio' ||
      spaceType === 'recording studio' ||
      spaceType === 'podcast studio' ||
      spaceType === 'activity space' ||
      spaceType === 'sports turf' ||
      spaceType === 'sports venue' ||
      spaceType === 'party space' ||
      spaceType === 'banquet hall' ||
      spaceType === 'gallery' ||
      spaceType === 'classroom' ||
      spaceType === 'private cabin' ||
      spaceType === 'meeting room' ||
      spaceType === 'training room' ||
      spaceType === 'event space'
    ) {
      this.spaceDetails.imageAlt = `${name} ${location_name} ${spaceType}`
    } else {
       this.spaceDetails.imageAlt = `${buildingName} ${location_name} ${spaceType}`
    }
    if (this.filters && this.filters.type != null) {
      this.filter_type_name = this.resource_types.find(
        (x) => x.id == this.filters.type
      )?.name;
      this.filter_type_col_name = this.resource_types.find(
        (x) => x.id == this.filters.type
      )?.column_name;
    }

    this.type = this.getType(this.router.url.split("/")[2])

    // for (let i = 0; i < this.spaceDetails.images.length; i++) {
    //   console.log('========================',this.spaceDetails.images[i]);
    // }
    
  }

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


  getArray(length: number): number[] {
    if(length === 0){
      length = 5
    }
    return Array(length).fill(0);
  }

  onImageError(event: Event, imageAlt:string) {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/images/details_placeholder_image.jpg';
    target.alt = `${imageAlt} details_placeholder_image.jpg`;
  }

  next(evt: any) {
    evt.stopPropagation()
    this.slickMainCarousel.slickNext();
  }

  prev(evt:any) {
    evt.stopPropagation()
    this.slickMainCarousel.slickPrev();
  }

  toggleSeeMore(e: Event, value) {
    e.stopPropagation();
    this.is_see_more_visible = value;
  }

  openDetailsPage() {
    window.open('coworking-space/' + this.spaceDetails.link_name, '_blank');
  }

  openFacebook() {
    window.open(
      'https://www.facebook.com/sharer/sharer.php?u=' +
        window.location.origin +
        '/coworking-space/' +
        this.spaceDetails.link_name.toLowerCase(),
      'facebook-popup',
      'height=350,width=600'
    );
  }

  openLinkedIn() {
    window.open(
      'https://www.linkedin.com/shareArticle?mini=true&url=' +
        window.location.origin +
        '/coworking-space/' +
        this.spaceDetails.link_name.toLowerCase() +
        '&title=Share%Spaces',
      'linkedin-popup',
      'height=350,width=600'
    );
  }

  openWhatsapp() {
    let staticText = 'Checkout this space on FLEXO ';
    if (!this.isMobile) {
      window.open(
        `https://web.whatsapp.com/send?text=${staticText}-${window.location.origin}/details/` +
          this.spaceDetails.link_name.toLowerCase(),
        'whatapp-popup',
        'height=650,width=650'
      );
    } else {
      window.open(
        `whatsapp://send?text=${staticText}-${window.location.origin}/coworking-space/${this.spaceDetails.link_name}`
      );
    }
  }

  shortListItem(e:any,id, is_shortlisted) {
    e.stopPropagation()
    this.shortlistItemEvent.emit({ id, is_shortlisted });
  }

  formatUrl(value: string): string {
    return value?.trim()?.toLowerCase().replace(/\s+/g, '-');
  }

  getType(spaceType: string): string {
    const shortTermSpaces = [
      'coworking-cafe/restaurant', 'shoot-studio', 'recording-studio', 'podcast-studio',
      'activity-space', 'sports-turf', 'sports-venue', 'party-space', 'banquet-hall',
      'gallery', 'classroom', 'private-cabin', 'meeting-room', 'training-room', 'event-space'
    ];
    const longTermSpaces = [
      'managed-office', 'private-office', 'shared-office', 'virtual-office'
    ];
    if (spaceType === 'coworking-space') {
      return "coworking";
    } else if (shortTermSpaces.includes(spaceType)) {
      return "shortterm";
    } else if (longTermSpaces.includes(spaceType)) {
      return "longterm";
    } else {
      return "coworking";
    }
  }
  
  onSpaceNameClicked(e: any) {
    let type = this.getType(this.router.url.split("/")[2])
    if (type === 'coworking'){
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




  openInquiryPopUp(e:any,{id}) {
    e.stopPropagation()
    setTimeout(() => {
      let config = new MatDialogConfig();
      config.viewContainerRef = this.inquiryVisit_viewContainerRef;
      config.panelClass = 'enq-mod-c';
      config.width = '55vw';
      config.data = {
        spaceId: id,
        value: 'listing'
      };
  
      this.inquiryVisit_dialogRef = this.inquiryVisit_dialog.open(
        InquiryComponent,
        config
      );
      this.inquiryVisit_dialogRef.componentInstance.ref = this.inquiryVisit_dialogRef;
      this.inquiryVisit_dialogRef.componentInstance.flag = 1;
      this.inquiryVisit_dialogRef.afterClosed().subscribe((result) => {
        if (result && result.success) {
          window.location.reload();
        }
        this.inquiryVisit_dialogRef = null;
      });
    }, );
  }


  handleImageError(event: any, imageAlt:string) {
    const imgElement = event.target as HTMLImageElement
    imgElement.src = 'assets/images/details_placeholder_image.jpg';
    imgElement.alt = `${imageAlt} details_placeholder_image.jpg`;
  }
  

}
