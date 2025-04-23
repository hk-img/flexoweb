import { DatePipe, isPlatformBrowser, TitleCasePipe } from '@angular/common';
import {
  Component,
  Inject,
  NgZone,
  OnInit,
  PLATFORM_ID,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {
  MatLegacyDialog as MatDialog,
  MatLegacyDialogConfig as MatDialogConfig,
  MatLegacyDialogRef as MatDialogRef,
} from '@angular/material/legacy-dialog';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { environment } from '../../environments/environment';
import { MemberService } from '../services/member.service';
import { SpaceService } from '../services/space.service';
import { Facilities } from './facilities';
// import { LoaderService } from '../services/loader.service';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { FavouriteWorkSpaceService } from '../favourite-workspace/favourite-workspace.service';
import { GlobalVariables } from '../global/global-variables';
import { LoginDialog } from '../login/login-dialog.component';
import { ScheduleVisitComponent } from '../schedule-visit/schedule-visit.component';
import { AppGlobals } from '../services/app-globals';
import { WorkspaceRatingReviewComponent } from '../workspace-rating-review/workspace-rating-review.component';
import { AddReviewDialogComponent } from './add-review-dialog/add-review-dialog.component';
import { BuyPassComponent } from './buy-pass/buy-pass.component';
import { CoWorkingVisitScheduleTwoComponent } from './co-working-visit-schedule-two/co-working-visit-schedule-two.component';
import { CoWorkingVisitScheduleComponent } from './co-working-visit-schedule/co-working-visit-schedule.component';
import { InquiryComponent } from './inquiry/inquiry.component';
import { RequestBookingComponent } from './request-booking/request-booking.component';
import { ViewMoreDialog } from './view-more/view-more.component';
declare var $: any;


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  providers: [TitleCasePipe],
})
export class DetailsComponent implements OnInit {
  @ViewChild('modal') modal!: CoWorkingVisitScheduleComponent;

  showSchedule: boolean = false;
  panelOpenState: boolean = false;
  isShortterm: boolean;
  isCoworking: boolean;
  isLongterm: boolean;
  public isMobile = false;
  public showShortDesciption = true;
  public resources_list = GlobalVariables.resource_types;
  public currentDateTime = new Date();
  public webDomain = environment.webDomain

  public shortlits: Array<number> = [];
  faqs = new BehaviorSubject([]);
  isFaqsVisible: any;
  spaceRatingReviewList = [];
  ratingBreakDown = [
    {
      star: 5,
      value: 0,
      backgroundColor: '#2ac75a',
    },
    {
      star: 4,
      value: 0,
      backgroundColor: '#007bff',
    },
    {
      star: 3,
      value: 0,
      backgroundColor: '#00dcff',
    },
    {
      star: 2,
      value: 0,
      backgroundColor: '#ffc600',
    },
    {
      star: 1,
      value: 0,
      backgroundColor: '#ff0000',
    },
  ];
  userSpaceRating = null;
  public is_see_more_visible = 1;
  public isLoading: boolean = false;
  existingUpVote: any;
  existingDownVote: any;
  reviews: any = [];
  serviceArray: any;
  workingTime: any;
  parkingOptionsValue: any;
  workingTimeValue: any;
  country: string;
  city: string;
  spaceType: string;
  spaceName: string;
  location: string;
  city_param: any;

  constructor(
    private route: ActivatedRoute,
    private spaceService: SpaceService,
    private titleService: Title,
    private ngZone: NgZone,
    private meta: Meta,
    private titleCasePipe: TitleCasePipe,
    public login_dialogRef: MatDialogRef<any>,
    public workspaceRatingReview_dialogRef: MatDialogRef<any>,
    public scheduleVisit_dialogRef: MatDialogRef<any>,
    public inquiryVisit_dialogRef: MatDialogRef<any>,
    public scheduleVisit2_dialogRef: MatDialogRef<any>,
    // public dialog: MatDialog,
    // public scheduleVisitCoworking_dialogRef: MatDialogRef<any>,
    // public scheduleVisitCoworking2_dialogRef: MatDialogRef<any>,
    private fb: UntypedFormBuilder,

    public requestBooking_dialogRef: MatDialogRef<any>,
    public addReview_dialogRef: MatDialogRef<any>,
    public buyPass_dialogRef: MatDialogRef<any>,

    public scheduleVisitCoworking_dialogRef: MatDialogRef<CoWorkingVisitScheduleComponent>,
    public scheduleVisitCoworking2_dialogRef: MatDialogRef<CoWorkingVisitScheduleTwoComponent>,
    // private loaderService: LoaderService,
    public login_viewContainerRef: ViewContainerRef,
    public workspaceRatingReview_viewContainerRef: ViewContainerRef,
    public scheduleVisit_viewContainerRef: ViewContainerRef,
    public inquiryVisit_viewContainerRef: ViewContainerRef,
    public scheduleVisitCoworking_viewContainerRef: ViewContainerRef,

    public requestBooking_viewContainerRef: ViewContainerRef,
    public buyPass_viewContainerRef: ViewContainerRef,
    public addReviewRef: ViewContainerRef,

    public snackBar: MatSnackBar,
    private metaService: Meta,
    public dialog: MatDialog,
    public viewContainerRef: ViewContainerRef,
    private _memberService: MemberService,
    @Inject(PLATFORM_ID) private platformId: any,
    public login_dialog: MatDialog,
    public scheduleVisit_dialog: MatDialog,
    public requestBooking_dialog: MatDialog,
    public addReview_dialog: MatDialog,
    public buyPass_dialog: MatDialog,
    public inquiryVisit_dialog: MatDialog,

    public workspaceRatingReview_dialog: MatDialog,
    private _appGlobals: AppGlobals,
    public sanitizer: DomSanitizer,
    private favouriteWorkSpaceService: FavouriteWorkSpaceService,
    private toastr: ToastrService,
    private router: Router,
    private datePipe: DatePipe
  ) {
    this._appGlobals.userDetails.subscribe((user_details) => {
      if (user_details && user_details.is_logged_in != null) {
        this.logged_in = user_details.is_logged_in;
        this.shortlists = user_details.shortlists || [];
      }
    });
  }

  // public is_go_back_visible =
  //   document.referrer && document.referrer != window.location.href;

  @ViewChild('slickMainCarousel', { static: false })
  slickMainCarousel: SlickCarouselComponent;
  public mainSliderConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    centerMode: true,
    centerPadding: '0px',
    variableHeight: false,
    variableWidth: false,
    autoplay: false,
    dots: false,
    swipeToSlide: true,
    infinite: true,
  };

  @ViewChild('slickSimilarSpacesCarousel', { static: false })
  slickSimilarSpacesCarousel: SlickCarouselComponent;

  public similarSpacesConfig = {
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    variableHeight: false,
    autoplaySpeed: 1000,
    dots: true,
    swipeToSlide: true,
    infinite: true,
    responsive: [
      {
        breakpoint: 1200, 
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 900, 
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 600, 
        settings: {
          slidesToShow: 1,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 480, 
        settings: {
          slidesToShow: 1,
          dots: true,
          arrows: false,
        },
      },
    ],
    
  };

  public similarRatingReviewConfig = {
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    variableHeight: false,
    centerMode: false,
    autoplaySpeed: 1000,
    dots: false,
    swipeToSlide: true,
    infinite: true,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  next() {
    this.slickMainCarousel.slickNext();
  }

  prev() {
    this.slickMainCarousel.slickPrev();
  }
  next1() {
    this.slickSimilarSpacesCarousel.slickNext();
  }

  prev1() {
    this.slickSimilarSpacesCarousel.slickPrev();
  }
  public options: google.maps.MapOptions = {
    scrollwheel: false,
    maxZoom: 15,
    mapTypeControl: false,
    minZoom: 9,
  };
  circleRadius1 = 400; // Radius of the first circle (in meters)
  circleRadius2 = 250; // Radius of the second circle (in meters)

  // Define options for the first circle
  circleOptions1: google.maps.CircleOptions = {
    fillColor: '#F76900', // Orange fill color
    fillOpacity: 0.3, // Opacity of the fill
    strokeWeight: 0, // Width of the stroke
    strokeColor: '#F76900' // Color of the stroke
  };

  // Define options for the second circle
  circleOptions2: google.maps.CircleOptions = {
    fillColor: '#F76900', // Orange fill color
    fillOpacity: 0.5, // Opacity of the fill
    strokeWeight: 0, // Width of the stroke
    strokeColor: '#F76900' // Color of the stroke
  };
  public space_id;
  public space_details;
  public marker;
  public show_less_facilities = [];
  public logged_in;
  public aws_base_url;
  public is_shortlisted: boolean = true;
  public shortlists = [];
  public rating_array = [0, 1, 2, 3, 4];
  public empty_star_array = [];
  public rating_floor;
  public empty_rating_stars;
  public list_tab = 0;
  public facilities = Facilities;
  public schema: any;
  public viewMoreRatingReview = '';
  public coWorkingSchduleVisitForm: UntypedFormGroup;
  mon_opening_time: any = '';
  mon_closing_time: any = '';
  tue_opening_time: any = '';
  tue_closing_time: any = '';
  wed_opening_time: any = '';
  wed_closing_time: any = '';
  thu_opening_time: any = '';
  thu_closing_time: any = '';
  fri_opening_time: any = '';
  fri_closing_time: any = '';
  sat_opening_time: any = '';
  sat_closing_time: any = '';
  sun_opening_time: any = '';
  sun_closing_time: any = '';


  getShortDetails(spaceId: number) {
    this.spaceService
      .getShortDetailsById(spaceId)
      .then((res) => {
        if (res.success) {
          const spaceType = res.spaceData.spaceType?.toLowerCase()
          const { actual_name, spaceTitle, location_name, contact_city_name } = res.spaceData
          if (spaceType === 'coworking space') {
            this.titleService.setTitle(`${actual_name} ${location_name} - ${spaceType} | Pricing - FLEXO`);
            this.metaService.updateTag({
              name: "description",
              content: `Discover ${actual_name}, ${location_name}, a coworking space with modern amenities and great pricing, Get customised quotes today!`,
            });
          } else if (
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
            this.titleService.setTitle(`${spaceTitle} at ${location_name}, ${contact_city_name}`);
            this.metaService.updateTag({
              name: "description",
              content: `Book ${spaceTitle} at ${location_name}, ${contact_city_name} for Rs.2000 /hour on FLEXO. `,
            });
          } else {
            this.titleService.setTitle(`${spaceType} for Rent at ${location_name}, ${contact_city_name}`);
            this.metaService.updateTag({
              name: "description",
              content: `Rent ${spaceTitle} at ${location_name}, ${contact_city_name} for Rs.2000 /month`,
            });
          }
          this.city = contact_city_name
          this.country = res.spaceData.country
          this.getSpaceDetails(this.country, this.city, spaceType, this.space_id);
        }
      }
      )
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.spaceType = this.getOriginalUrlParam(params.spaceType);
      if (params.spaceType === 'coworking-space') {
        this.spaceName = this.getOriginalUrlParam(params.spaceName);
        this.space_id = this.spaceName?.match(/(\d+)$/)?.[0];
        this.getShortDetails(this.space_id)
      }else if(this.spaceType == 'coworking café restaurant'){
        this.spaceName = this.getOriginalUrlParam(params.spaceName);
        this.space_id = params.spaceName?.match(/\d+$/)?.[0];
        this.getShortDetails(this.space_id)
      } else {
        this.location = this.getOriginalUrlParam(params.location);
        this.space_id = params.spaceId;
        this.getShortDetails(this.space_id);
      }
    });

    // this.getFaqsBySpaceBy(this.space_id);
    // alert(this.space_id.toString());
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem('space_id', this.space_id?.toString());

      this.coWorkingSchduleVisitForm = this.fb.group({
        visitDate: ['', [Validators.required]],
        visitTime: ['', [Validators.required]],
      });
      if (window.innerWidth < 700) {
        this.isMobile = true;
      }

    }

  }

  formatUrl(value: string): string {
    return value ? value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-') : '';
  }  
  updateJsonLd(
    spaceType: string,
    imageUrl: string,
    detail: string,
    priceMin: number,
    priceMax?: any,
    location?: string
  ) {
    const jsonLdId = 'json-ld-product';
    if (isPlatformBrowser(this.platformId)) {
      const existingScript = document.getElementById(jsonLdId);
      if (existingScript) {
        existingScript.remove();
      }
    }

    if(priceMax === "none"){
      var offer = "Offer"
    }else{
      var offer = "AggregateOffer"
    }
  
    const jsonLd: any = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": `${spaceType} in ${location || 'an unknown location'}`,
      "image": imageUrl,
      "description": detail,
      "brand": {
        "@type": "Brand",
        "name": "Flexo"
      },
      "offers": {
        "@type": offer,
        "url": window.location.href,
        "priceCurrency": "INR",
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition"
      }
    };
  
    // Handle priceMin and priceMax
    if (priceMax === "none") {
      jsonLd.offers.price = priceMin;
    } else {
      jsonLd.offers.lowPrice = priceMin;
      jsonLd.offers.highPrice = priceMax;
    }
  
    if (isPlatformBrowser(this.platformId)) {
      const jsonLdScript = document.createElement('script');
      jsonLdScript.id = jsonLdId;
      jsonLdScript.type = 'application/ld+json';
      jsonLdScript.text = JSON.stringify(jsonLd);
  
      document.head.appendChild(jsonLdScript);
    }
  }
  


  onImageError(event: Event, imageAlt:string) {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/images/details_placeholder_image.jpg';
    target.alt = `${imageAlt} details_placeholder_image.jpg`;
  }

  ngOnChanges(): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class. 
  }

  /* getFaqsBySpaceBy(space_id) {
    this.spaceService.getFaqsBySpaceId(space_id).subscribe(
      (data) => {
        // this.faqs.next(data);
      },
      ({ error }) => { }
    );
  } */

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      $(document).ready(() => {
        const mindistance = $('#overview').offset()?.top + 250;
        const maxdistance = $('.similar-listing-title').offset()?.top + $('.similar-listing-title').height();

        $(window).scroll(() => {
          const scrollTop = $(window).scrollTop();

          if (scrollTop >= maxdistance) {
            $('.enquire-container-desktop').removeClass('booking-fixed');
          } else if (scrollTop >= mindistance && scrollTop < maxdistance) {
            $('.enquire-container-desktop').addClass('booking-fixed');
          } else {
            $('.enquire-container-desktop').removeClass('booking-fixed');
          }
        });
      });
    }
  }

  getOriginalUrlParam(value: string): string {
    return value?.replace(/-/g, ' ')?.replace(/\b\w/g, char => char?.toLowerCase());
  }


  scrollToSection(element_id) {
    if (element_id == 'overview') {
      this.list_tab = 1;
    } else if (element_id == 'price') {
      this.list_tab = 2;
    } else if (element_id == 'location') {
      this.list_tab = 3;
    } else {
      this.list_tab = 4;
    }
    if (isPlatformBrowser(this.platformId)) {
      document.getElementById(element_id).scrollIntoView();
    }
  }

  openFacebook() {

    if (isPlatformBrowser(this.platformId)) {
      window.open(
        'https://www.facebook.com/sharer/sharer.php?u=' +
        window.location.origin +
        '/coworking-space/' +
        this.space_details.link_name.toLowerCase(),
        'facebook-popup',
        'height=350,width=600'
      );
    }
  }

  openLinkedIn() {

    if (isPlatformBrowser(this.platformId)) {
      window.open(
        'https://www.linkedin.com/shareArticle?mini=true&url=' +
        window.location.origin +
        '/coworking-space/' +
        this.space_details.link_name.toLowerCase() +
        '&title=Share%Spaces',
        'linkedin-popup',
        'height=350,width=600'
      );
    }
  }

  openWhatsapp() {

    if (isPlatformBrowser(this.platformId)) {
      if (!this.isMobile) {
        window.open(
          `https://web.whatsapp.com/send?text=${window.location.origin}/coworking-space/` +
          this.space_details.link_name.toLowerCase(),
          'whatapp-popup',
          'height=650,width=650'
        );
      } else {
        window.open(
          `whatsapp://send?text=${window.location.origin}/coworking-space/${this.space_details.link_name}`
        );
      }
    }
  }

  openInstagram() {
    if (isPlatformBrowser(this.platformId)) {
      if (!this.isMobile) {
        window.open(
          `https://www.instagram.com/?url=${window.location.origin}/coworking-space/` +
          this.space_details.link_name.toLowerCase(),
          'instagram-popup',
          'height=650,width=650'
        );
      } else {
        window.open(
          `instagram://share?text=${window.location.origin}/coworking-space/${this.space_details.link_name.toLowerCase()}`
        );
      }
    }
  }

  openPinterest() {
    if (isPlatformBrowser(this.platformId)) {
      if (!this.isMobile) {
        window.open(
          `https://www.pinterest.com/pin/create/button/?url=${window.location.origin}/coworking-space/` +
          this.space_details.link_name.toLowerCase(),
          'pinterest-popup',
          'height=650,width=650'
        );
      } else {
        window.open(
          `pinterest://pin/create/bookmarklet/?url=${window.location.origin}/coworking-space/${this.space_details.link_name.toLowerCase()}`
        );
      }
    }
  }

  copyLink() {
    if (isPlatformBrowser(this.platformId)) {
      const link = `${window.location.origin}/${this.spaceType?.replace(/\s+/g, '-')}/${this.space_details.link_name.toLowerCase()}`;

      if (navigator.clipboard) {
        navigator.clipboard.writeText(link).then(() => {
          this.toastr.success('Link copied to clipboard', 'Success');
        }).catch(err => {
          this.toastr.error(err, 'Error');
        });
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = link;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
  
        this.toastr.success('Link copied to clipboard', 'Success');
      }
    }
  }
  

  updateShortList() {
    if (isPlatformBrowser(this.platformId)) {
      let isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn')) || null;
      if (isLoggedIn /* this.logged_in */) {
        this.addRemoveFavorite(this.space_id);
        this._memberService
          .addShortlists(this.space_id)
          .then(() => {
            if (!!this.is_shortlisted) {
              this.is_shortlisted = false;
              this.toastr.success('Removed from Favourite Workspaces', 'Success');
              // this._openSnackBar('Removed from Shortlist', 'Dismiss');
            } else {
              this.is_shortlisted = true;
              this.toastr.success('Added to Favourite Workspaces', 'Success');
              // this._openSnackBar('Added to Shortlist', 'Dismiss');
            }
          })
          .catch((error) => { });
      } else {
        this.openLoginDialog();
        localStorage.setItem('afterLogin', '8');
      }
    }
  }

  addRemoveFavorite(space_id) {

    if (isPlatformBrowser(this.platformId)) {
      let isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn')) || null;
      if (isLoggedIn /* this.logged_in */) {
        this.favouriteWorkSpaceService
          .addRemoveFavouriteWorkSpace(space_id)
          .subscribe(
            (result: any) => {
              setTimeout(() => {
                window.location.reload()
              }, 2000);
            },
            (error) => {
            }
          );
      } else {
        this.openLoginDialog();
        localStorage.setItem('afterLogin', '10');
      }
    }
  }

  onRatingReview() {

    if (isPlatformBrowser(this.platformId)) {
      let isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn')) || null;
      let userDetails = JSON.parse(localStorage.getItem('userDetails')) || null;
      if (isLoggedIn /* this.logged_in */) {

        if (userDetails != null && userDetails.id) {

          if (this.userGivenReview) {
            this.toastr.error('You have already given review for this space.', 'Error');
            return false;
          }

        }

        let actual_name = this.space_details.actual_name.replace(/ /g, '-');
        let location_name = this.space_details.location_name.replace(/ /g, '-');
        let link_name = `${actual_name}-${location_name}-${this.space_details.id}`;
        let config = new MatDialogConfig();
        config.viewContainerRef = this.workspaceRatingReview_viewContainerRef;
        config.panelClass = 'dialogClass';
        config.width = '550px';
        config.data = {
          space_id: this.space_id,
          link_name: link_name.toLowerCase(),
          userSpaceReviewDetails: this.userSpaceRating
            ? this.userSpaceRating
            : null,
        };

        this.workspaceRatingReview_dialogRef =
          this.workspaceRatingReview_dialog.open(
            WorkspaceRatingReviewComponent,
            config
          );
        this.workspaceRatingReview_dialogRef.componentInstance.ref =
          this.workspaceRatingReview_dialogRef;
        this.workspaceRatingReview_dialogRef.componentInstance.flag = 1;
        this.workspaceRatingReview_dialogRef.afterClosed().subscribe((result) => {
          if (result && result.success) {
            window.location.reload();
            localStorage.removeItem('afterLogin');
          }
          this.workspaceRatingReview_dialogRef = null;
        });
      } else {
        this.openLoginDialog();
        localStorage.setItem('afterLogin', '9');
      }
    }
  }

  goBack() {
    if (isPlatformBrowser(this.platformId)) {
      window.location.href = document.referrer;
    }
  }

  alterDescriptionText() {
    if (this.showShortDesciption) {
      this.show_less_facilities = Object.assign(
        [],
        this.space_details.facilities
      );
      this.showShortDesciption = false;
    } else {
      this.show_less_facilities = this.space_details.facilities.slice(0, 3);
      this.showShortDesciption = true;
    }
  }

  userGivenReview = false;
  ribbon: any;
  ribbon_color: any;


  getType(spaceType: string): string {
    const shortTermSpaces = [
      'coworking-cafe/restaurant', 'shoot studio', 'recording studio', 'podcast studio',
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
    } else {
      return "coworking";
    }
  }

  getSpaceDetails(country: any, city: any, spaceType: any, spaceId: any) {
    this.spaceService
      .getSpaceDetails(country, city, spaceType, spaceId)
      .then((res) => {
        if (!res.success) {
          this.router.navigate(['/error']);
        }
        const data = res.data
        const actual_name = data.actual_name?.toLowerCase()
        const buildingName = data.buildingName?.toLowerCase()
        const location_name = data.location_name?.toLowerCase()
        const spaceType = data.spaceType?.toLowerCase()
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
          data.imageAlt = `${actual_name} ${location_name} ${spaceType}`
          for (let i = 0; i < data.similar_spaces.length; i++) {
            data.similar_spaces[i].imageAlter = `${actual_name} ${location_name} ${spaceType}`;
          }
        } else {
          data.imageAlt = `${buildingName} ${location_name} ${spaceType}`
          for (let i = 0; i < data.similar_spaces.length; i++) {
          data.similar_spaces[i].imageAlter = `${buildingName} ${location_name} ${spaceType}`
          }
        }
        this.space_details = Object.assign({}, data);
        const type = this.getType(spaceType)
        const spaceStatus = this.space_details?.spaceStatus === "Furnished" ? "furnished" : "unfurnished"
        const cityName = this.space_details?.contact_city_name;
        this.city_param = this.space_details?.contact_city_name;
        const min = this.space_details?.originalPrice
        const imageUrl = this.space_details?.images.length ? this.space_details.images[0] : ''
        if (type === 'coworking') {
          const minPrice = this.space_details.flexible_desk_price
          const maxPrice = this.space_details.privatecabin_price;
          this.updateJsonLd(spaceType, imageUrl, `Book your workspace at ${actual_name}, a fully furnished coworking space in ${location_name}, ${cityName}. With flexible membership plans, premium facilities, and a collaborative environment, it's the perfect place for freelancers, startups, and teams.`, minPrice, maxPrice, location_name)
        } else if (type === 'shortterm') {
          this.updateJsonLd(spaceType, imageUrl, `Reserve this ${spaceType} at, located in ${location_name}, ${cityName}. Available by the hour, this space offers top-notch amenities, flexible bookings, and a professional setup perfect for your next project, event or activity.`, min, "none", location_name)
        } else {
          this.updateJsonLd(spaceType, imageUrl, `Rent your ${spaceType}, at ${location_name}, ${cityName}. This ${spaceStatus} office is listed at Rs. ${min}/month. Get in touch with Flexo now to schedule your visit`, min, "none", location_name)
        }

        this.ribbon = this.space_details.ribbon;
        this.ribbon_color = this.space_details.ribbon_color;

        this.marker = {
          position: {
            lat: this.space_details.latitude,
            lng: this.space_details.longitude,
          },
          title: this.space_details.name,
          options: { draggable: false, icon: 'assets/images/marker1.svg' },
          url: `https://www.google.com/maps/search/?api=1&query=${this.space_details.latitude},${this.space_details.longitude}`,
        };

        this.parkingOptionsValue = this.space_details?.parkingOptionsValue;

        this.isShortterm = this.space_details.isShortterm;
        if (isPlatformBrowser(this.platformId)) {
        sessionStorage.setItem('isShortterm', JSON.stringify(this.isShortterm));
        }

        this.isCoworking = this.space_details.isCoworking;
        if (isPlatformBrowser(this.platformId)) {
        sessionStorage.setItem('isCoworking', JSON.stringify(this.isCoworking));
        }

        this.isLongterm = this.space_details.isLongterm;
        if (isPlatformBrowser(this.platformId)) {
        sessionStorage.setItem('isLongterm', JSON.stringify(this.isLongterm));
        }

        this.is_shortlisted = res?.existingfavorite?.favourite ?? false;

        this.workingTimeValue = this.space_details?.working_time;

        localStorage.setItem("spaceDetail", JSON.stringify(this.space_details));

        this.serviceArray = this.space_details?.spaceServiceDetailsArray;
        this.ratingReviewBySpaceId();

        this.existingUpVote = res?.existingVote?.upvote ?? {};
        this.existingDownVote = res?.existingVote?.downvote ?? {};
        this.userGivenReview = res?.existingReview ? true : false;

        if (this.space_details?.youtube_url) {
          (this.space_details.youtube_url =
            this.sanitizer.bypassSecurityTrustResourceUrl(
              this.space_details?.youtube_url
            ))
        }

        if (this.workingTimeValue) {
          this.workingTime = this.workingTimeValue;

          if (this.workingTime[0]?.openingTime && this.workingTime[0]?.closingTime) {
            this.mon_opening_time = this.convert24to12(this.workingTime[0].openingTime);
            this.mon_closing_time = this.convert24to12(this.workingTime[0].closingTime);
          }

          if (this.workingTime[1]?.openingTime && this.workingTime[1]?.closingTime) {
            this.tue_opening_time = this.convert24to12(this.workingTime[1].openingTime);
            this.tue_closing_time = this.convert24to12(this.workingTime[1].closingTime);
          }

          if (this.workingTime[2]?.openingTime && this.workingTime[2]?.closingTime) {
            this.wed_opening_time = this.convert24to12(this.workingTime[2].openingTime);
            this.wed_closing_time = this.convert24to12(this.workingTime[2].closingTime);
          }

          if (this.workingTime[3]?.openingTime && this.workingTime[3]?.closingTime) {
            this.thu_opening_time = this.convert24to12(this.workingTime[3].openingTime);
            this.thu_closing_time = this.convert24to12(this.workingTime[3].closingTime);
          }

          if (this.workingTime[4]?.openingTime && this.workingTime[4]?.closingTime) {
            this.fri_opening_time = this.convert24to12(this.workingTime[4].openingTime);
            this.fri_closing_time = this.convert24to12(this.workingTime[4].closingTime);
          }

          if (this.workingTime[5]?.openingTime && this.workingTime[5]?.closingTime) {
            this.sat_opening_time = this.convert24to12(this.workingTime[5].openingTime);
            this.sat_closing_time = this.convert24to12(this.workingTime[5].closingTime);
          }

          if (this.workingTime[6]?.openingTime && this.workingTime[6]?.closingTime) {
            this.sun_opening_time = this.convert24to12(this.workingTime[6].openingTime);
            this.sun_closing_time = this.convert24to12(this.workingTime[6].closingTime);
          }

          if (this.workingTime[0]?.day == "Monday") {
            var mondayClosed = this.workingTime[0]?.isClosed;
            localStorage.setItem("mondayClosed", mondayClosed);

            if (!mondayClosed || mondayClosed) {
              var mondayOpenTime = this.workingTime[0]?.openingTime;
              var mondayCloseTime = this.workingTime[0]?.closingTime;
              localStorage.setItem("mondayOpenTime", mondayOpenTime);
              localStorage.setItem("mondayCloseTime", mondayCloseTime);
            }
          }

          if (this.workingTime[1]?.day == "Tuesday") {
            var tuesdayClosed = this.workingTime[1]?.isClosed;
            localStorage.setItem("tuesdayClosed", tuesdayClosed);

            if (!tuesdayClosed || tuesdayClosed) {
              var tuesdayOpenTime = this.workingTime[1]?.openingTime;
              var tuesdayCloseTime = this.workingTime[1]?.closingTime;
              localStorage.setItem("tuesdayOpenTime", tuesdayOpenTime);
              localStorage.setItem("tuesdayCloseTime", tuesdayCloseTime);
            }
          }

          if (this.workingTime[2]?.day == "Wednesday") {
            var wednesdayClosed = this.workingTime[2]?.isClosed;
            localStorage.setItem("wednesdayClosed", wednesdayClosed);

            if (!wednesdayClosed || wednesdayClosed) {
              var wednesdayOpenTime = this.workingTime[2]?.openingTime;
              var wednesdayCloseTime = this.workingTime[2]?.closingTime;
              localStorage.setItem("wednesdayOpenTime", wednesdayOpenTime);
              localStorage.setItem("wednesdayCloseTime", wednesdayCloseTime);
            }
          }

          if (this.workingTime[3]?.day == "Thursday") {
            var thursdayClosed = this.workingTime[3]?.isClosed;
            localStorage.setItem("thursdayClosed", thursdayClosed);

            if (!thursdayClosed || thursdayClosed) {
              var thursdayOpenTime = this.workingTime[3]?.openingTime;
              var thursdayCloseTime = this.workingTime[3]?.closingTime;
              localStorage.setItem("thursdayOpenTime", thursdayOpenTime);
              localStorage.setItem("thursdayCloseTime", thursdayCloseTime);
            }

          }

          if (this.workingTime[4]?.day == "Friday") {
            var fridayClosed = this.workingTime[4]?.isClosed;
            localStorage.setItem("fridayClosed", fridayClosed);

            if (fridayClosed || !fridayClosed) {
              var fridayOpenTime = this.workingTime[4]?.openingTime;
              var fridayCloseTime = this.workingTime[4]?.closingTime;
              localStorage.setItem("fridayOpenTime", fridayOpenTime);
              localStorage.setItem("fridayCloseTime", fridayCloseTime);
            }
          }

          if (this.workingTime[5]?.day == "Saturday") {
            var saturdayClosed = this.workingTime[5]?.isClosed;
            localStorage.setItem("saturdayClosed", saturdayClosed);

            if (!saturdayClosed || saturdayClosed) {
              var saturdayOpenTime = this.workingTime[5]?.openingTime;
              var saturdayCloseTime = this.workingTime[5]?.closingTime;
              localStorage.setItem("saturdayOpenTime", saturdayOpenTime);
              localStorage.setItem("saturdayCloseTime", saturdayCloseTime);
            }
          }

          if (this.workingTime[6]?.day == "Sunday") {
            var sundayClosed = this.workingTime[6]?.isClosed;
            localStorage.setItem("sundayClosed", sundayClosed);

            if (!sundayClosed || sundayClosed) {
              var sundayOpenTime = this.workingTime[6]?.openingTime;
              var sundayCloseTime = this.workingTime[6]?.closingTime;
              localStorage.setItem("sundayOpenTime", sundayOpenTime);
              localStorage.setItem("sundayCloseTime", sundayCloseTime);
            }
          }
        }

        //   make link
        var name = this.space_details.actual_name.replace(/ /g, '-');
        var location = this.space_details.location_name.replace(/ /g, '-');
        var link =
          'https://www.flexospaces.com/coworking-space/' +
          name +
          '-' +
          location +
          '-' +
          this.space_details.id;
        // this.viewMoreRatingReview = `coworking-space/view-more-review/${name.toLowerCase()}-${location.toLowerCase()}-${this.space_details.id}`;
        this.viewMoreRatingReview = `/view-more-review`;
        this.schema = {
          '@context': 'http://schema.org',
          '@type': 'CoWorking Spaces',
          name: `${this.space_details.actual_name +
            ' ' +
            this.space_details.location_name
            }`,
          telephone: `Call +91 95133 92400`,
          url: `${link}`,
          // image: `${this.aws_base_url +
          //   this.space_details?.id +
          //   '/' +
          //   this.space_details?.images[0]
          //   }`,
          address: {
            '@type': 'Address',
            location: `${this.space_details.location_name}`,
          },
          openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: {
              '@type': 'DayOfWeek',
              name: `${this.space_details.days_open_string}`,
            },
            opens: {
              'Mon - Fri': `${this.space_details.mon_friday_opening_time}`,
              Sat: `${this.space_details.saturday_opening_time}`,
            },
            close: {
              'Mon - Fri': `${this.space_details.mon_friday_closing_time}`,
              Sat: `${this.space_details.saturday_closing_time}`,
            },
          },
          offers: {
            '@type': 'AggregateOffer',
            price: `Rs. ${this.space_details.privatecabin_price}`,
          },
        };

        this.space_details.name = `${this.space_details.actual_name} ${this.space_details.location_name}`;
        if (this.space_details.facilities.length > 3) {
          this.show_less_facilities = this.space_details.facilities.slice(0, 3);
        }
        this.space_details.similar_spaces.forEach((element) => {
          element.rating_array = [];
          element.empty_star_array = [];
          element.rating_floor = Math.floor(element.rating);
          element.empty_rating_stars = 5 - element.rating;
          for (let k = 0; k < Math.floor(element.empty_rating_stars); k++) {
            element.empty_star_array.push(k);
          }
          for (let r = 0; r < Math.floor(element.rating); r++) {
            element.rating_array.push(r);
          }
        });
        this.rating_floor = Math.floor(this.space_details.rating);
        this.empty_rating_stars = 5 - this.space_details.rating;
        for (let k = 0; k < Math.floor(this.empty_rating_stars); k++) {
          this.empty_star_array.push(k);
        }
        /* for (let r = 0; r < Math.floor(this.space_details.rating); r++) {
          this.rating_array.push(r);
        } */
        // this.is_shortlisted =
        //   this.shortlists.indexOf(this.space_details.id) > -1 ? true : false;

      })
      .catch((error) => { });
  }

  get parkingOptionsString(): string {
    if (!this.parkingOptionsValue) {
      return '';
    }
    return this.parkingOptionsValue.join(', ');
  }

  convert24to12(time24h: string): string {
    const [hoursStr, minutesStr] = time24h.split(':');
    let hours = parseInt(hoursStr, 10);
    let period = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12 || 12; // Convert midnight (0) to 12 AM
    const hours12 = hours.toString().padStart(2, '0');
    const minutes = minutesStr.padStart(2, '0');

    return `${hours12}:${minutes} ${period}`;
  }

  getStars(rating: number): number[] {
    const roundedRating = Math.round(rating); // Round the rating to the nearest whole number
    return Array(roundedRating).fill(1);
  }

  ratingOffset = 0;
  ratingReviewBySpaceId() {
    let userDetails = JSON.parse(localStorage.getItem('userDetails')) || null;
    this.spaceService
      .getSpaceRatingReviewDetails(this.space_id)
      .subscribe((result: any) => {
        this.spaceRatingReviewList = [];
        if (result.data.success) {
          let reviewsData = result.data.reviews ? result.data.reviews : [];

          // Sorting the array based on user ID
          if (userDetails != null && userDetails.id) {
            reviewsData.sort((a, b) => {
              if (a.userId === userDetails.id && b.userId !== userDetails.id) {
                return -1; // Move objects with user ID 10 to the beginning
              } else if (a.userId !== userDetails.id && b.userId === userDetails.id) {
                return 1; // Move objects with user ID 10 to the end
              } else {
                return 0; // Maintain order for other objects
              }
            });
          }

          this.reviews = reviewsData;

          this.spaceRatingReviewList = this.reviews.slice(this.ratingOffset, 5);
          this.ratingOffset += 5;
          // let countFiveStar = 0;
          // let countFourStar = 0;
          // let countThreeStar = 0;
          // let countTwoStar = 0;
          // let countOneStar = 0;
          // let loginUserRatingArr = [];
          // let spaceRatingReviewsLength = 5;
          // Start Sorting array based on review date
          // reviews = reviews.sort(
          //   (a, b) =>
          //     new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          // );
          // End Sorting array based on review date
          // for (let i = 0; i < reviews.length; i++) {
          //   reviews[i].currentUser = false;
          //   if (userDetails != null && userDetails.id == reviews[i].userId) {
          //     this.userSpaceRating = {
          //       ratingId: reviews[i].ratingId ? reviews[i].ratingId : null,
          //       spaceId: reviews[i].spaceId,
          //       rating: reviews[i].rating,
          //       review: reviews[i].Review,
          //     };
          //     spaceRatingReviewsLength = spaceRatingReviewsLength - 1;
          //     reviews[i].currentUser = true;
          //     loginUserRatingArr.push(reviews[i]);
          //   }

          //   if (reviews[i].rating > 4 && reviews[i].rating <= 5) {
          //     countFiveStar = countFiveStar + 1;
          //   } else if (reviews[i].rating > 3 && reviews[i].rating <= 4) {
          //     countFourStar = countFourStar + 1;
          //   } else if (reviews[i].rating > 2 && reviews[i].rating <= 3) {
          //     countThreeStar = countThreeStar + 1;
          //   } else if (reviews[i].rating > 1 && reviews[i].rating <= 2) {
          //     countTwoStar = countTwoStar + 1;
          //   } else {
          //     countOneStar = countOneStar + 1;
          //   }
          //   if (this.spaceRatingReviewList.length < spaceRatingReviewsLength) {
          //     if (userDetails != null && userDetails.id == reviews[i].userId) {
          //     } else {
          //       this.spaceRatingReviewList.push(reviews[i]);
          //     }
          //   }
          // }

          // if (loginUserRatingArr.length > 0) {
          //   let newSpaceRatingReviewList = loginUserRatingArr.concat(
          //     this.spaceRatingReviewList
          //   );
          //   this.spaceRatingReviewList = newSpaceRatingReviewList;
          // }
          // if (this.ratingBreakDown.length > 0) {
          //   this.ratingBreakDown[0].value = countFiveStar;
          //   this.ratingBreakDown[1].value = countFourStar;
          //   this.ratingBreakDown[2].value = countThreeStar;
          //   this.ratingBreakDown[3].value = countTwoStar;
          //   this.ratingBreakDown[4].value = countOneStar;
          // }
        }
      });
  }

  nextReviewList() {
    if (this.reviews.length > this.spaceRatingReviewList.length) {
      const endIndex = Math.min(this.ratingOffset + 5, this.reviews.length);
      const nextReviews = this.reviews.slice(this.ratingOffset, endIndex);
      this.spaceRatingReviewList.push(...nextReviews);
      this.ratingOffset += 5;
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

  showStarIcon(index: number, rating) {
    if (rating >= index + 1) {
      return '<i class="ion-android-star"></i>';
    } else {
      return '<i class="ion-android-star-outline"></i>';
    }
  }

  toggleSeeMore(e: Event, value, ratingId) {
    e.stopPropagation();
    if (value == 1) {
      $(`see-more-h-${ratingId}`).removeClass('less-content');
    } else {
      $(`see-more-h-${ratingId}`).addClass('less-content');
    }
    this.is_see_more_visible = value;
  }

  openUrl() {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${this.space_details.latitude},${this.space_details.longitude}`
    );
  }

  openImagesDialog() {
    let config = new MatDialogConfig();
    config.viewContainerRef = this.login_viewContainerRef;
    config.panelClass = 'dialogClass';
    // config.height = '80%';
    // config.width = '450px';

    this.login_dialogRef = this.login_dialog.open(ViewMoreDialog, config);
    this.login_dialogRef.componentInstance.ref = this.login_dialogRef;
    this.login_dialogRef.componentInstance.images = this.space_details.images;
    this.login_dialogRef.componentInstance.imageAlt = this.space_details.imageAlt;
    this.login_dialogRef.componentInstance.id = this.space_details.id;
    this.login_dialogRef.afterClosed().subscribe((result) => {
      this.login_dialogRef = null;
    });
  }

  openLoginDialog() {
    let config = new MatDialogConfig();
    config.viewContainerRef = this.login_viewContainerRef;
    config.panelClass = 'dialogClass-l';
    // config.height = '520px';
    // config.width = '60%';

    this.login_dialogRef = this.login_dialog.open(LoginDialog, config);
    this.login_dialogRef.componentInstance.ref = this.login_dialogRef;
    this.login_dialogRef.componentInstance.flag = 1;
    // this.login_dialogRef.componentInstance.selected_teamcabin = teamcabin_obj;
    // this.login_dialogRef.componentInstance.action_type = action_type;
    this.login_dialogRef.afterClosed().subscribe((result) => {
      if ((result && result.success) || result) {
        // window.location.reload();

        let condition = localStorage.getItem('afterLogin');

        if (condition == '1') {
          this.openRequestBookPopup();
        } else if (condition == '2') {
          this.openRequetBuyPassPopup();
        } else if (condition == '3') {
          this.openScheduleVisitPopup();
        } else if (condition == '4') {
          this.openScheduleVisitIsCoworkingPopup();
        } else if (condition == '5') {
          this.openScheduleVisitIsCoworkingPopupTwo();
        } else if (condition == '6') {
          this.openAddReviewDialog();
        } else if (condition == '7') {
          let vote = localStorage.getItem('vote');
          this.voteDevoteSite(vote);
        } else if (condition == '8') {
          this.updateShortList();
        } else if (condition == '9') {
          this.onRatingReview();
        } else if (condition == '10') {
          window.location.reload();
          this.addRemoveFavorite(this.space_id);
        }
      }
      this.login_dialogRef = null;
    });
  }
  openRequestBookPopup() {
    let isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn')) || null;
    let userDetails = JSON.parse(localStorage.getItem('userDetails')) || null;
    if (isLoggedIn || userDetails?.accessToken) {
      let config = new MatDialogConfig();
      config.viewContainerRef = this.requestBooking_viewContainerRef;
      config.panelClass = 'dialogClass-c';
      config.width = '100%';
      config.data = {
        spaceId: this.space_id,
      };

      // Ensure that this.requestBooking_dialogRef is properly initialized
      // after calling this.requestBooking_dialog.open()
      this.requestBooking_dialogRef = this.requestBooking_dialog.open(
        RequestBookingComponent,
        config
      );

      // Make sure to check if this.requestBooking_dialogRef is not undefined
      // before accessing its properties or methods
      if (this.requestBooking_dialogRef) {
        this.requestBooking_dialogRef.componentInstance.ref =
          this.requestBooking_dialogRef;
        this.requestBooking_dialogRef.componentInstance.flag = 1;

        // Ensure proper handling of the afterClosed() subscription
        this.requestBooking_dialogRef.afterClosed().subscribe((result) => {
          if ((result && result.success) || result) {
            window.location.reload();
            localStorage.removeItem('afterLogin');
          }
          this.requestBooking_dialogRef = null;
        });
      }
    } else {
      this.openLoginDialog();
      localStorage.setItem('afterLogin', '1');
    }
  }
  openRequetBuyPassPopup() {
    let isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn')) || null;
    let userDetails = JSON.parse(localStorage.getItem('userDetails')) || null;
    let authToken = localStorage.getItem('authToken') || '';
    if (isLoggedIn || userDetails?.accessToken || authToken) {
      let config = new MatDialogConfig();
      config.viewContainerRef = this.buyPass_viewContainerRef;
      config.panelClass = 'dialogClass-c';
      config.width = '100%';
      config.data = {
        spaceId: this.space_id,
        country: this.country,
        city: this.city,
        spaceType: this.spaceType
      };

      // Ensure that this.requestBooking_dialogRef is properly initialized
      // after calling this.requestBooking_dialog.open()
      this.buyPass_dialogRef = this.buyPass_dialog.open(
        BuyPassComponent,
        config
      );

      // Make sure to check if this.buyPass_dialogRef is not undefined
      // before accessing its properties or methods
      if (this.buyPass_dialogRef) {
        this.buyPass_dialogRef.componentInstance.ref = this.buyPass_dialogRef;
        this.buyPass_dialogRef.componentInstance.flag = 1;

        // Ensure proper handling of the afterClosed() subscription
        this.buyPass_dialogRef.afterClosed().subscribe((result) => {
          if (result && result.success) {
            window.location.reload();
            localStorage.removeItem('afterLogin');
          }
          this.buyPass_dialogRef = null;
        });
      }
    } else {
      this.openLoginDialog();
      localStorage.setItem('afterLogin', '2');
    }
  }
  openScheduleVisitPopup() {
    let isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn')) || null;
    let userDetails = JSON.parse(localStorage.getItem('userDetails')) || null;
    let authToken = localStorage.getItem('authToken') || '';
    if (isLoggedIn || userDetails?.accessToken || authToken) {
      let config = new MatDialogConfig();
      config.viewContainerRef = this.scheduleVisit_viewContainerRef;
      config.panelClass = 'visit-scdule-mod';
      // config.width = '550px';
      config.data = {
        spaceId: this.space_id,
      };

      this.scheduleVisit_dialogRef = this.buyPass_dialog.open(
        ScheduleVisitComponent,
        config
      );
      this.scheduleVisit_dialogRef.componentInstance.ref =
        this.scheduleVisit_dialogRef;
      this.scheduleVisit_dialogRef.componentInstance.flag = 1;
      this.scheduleVisit_dialogRef.afterClosed().subscribe((result) => {
        if (result && result.success) {
          window.location.reload();
          localStorage.removeItem('afterLogin');
        }
        this.scheduleVisit_dialogRef = null;
      });
    } else {
      this.openLoginDialog();
      localStorage.setItem('afterLogin', '3');
    }
  }

  openInquiryPopUp() {
    let config = new MatDialogConfig();
    config.viewContainerRef = this.inquiryVisit_viewContainerRef;
    config.panelClass = 'enq-mod-c';
    // config.width = '550px';
    config.data = {
      spaceId: this.space_id,
      value: 'detail'
    };

    this.inquiryVisit_dialogRef = this.inquiryVisit_dialog.open(
      InquiryComponent,
      config
    );
    this.inquiryVisit_dialogRef.componentInstance.ref =
      this.inquiryVisit_dialogRef;
    this.inquiryVisit_dialogRef.componentInstance.flag = 1;
    this.inquiryVisit_dialogRef.afterClosed().subscribe((result) => {
      if (result && result.success) {
        window.location.reload();
      }
      this.inquiryVisit_dialogRef = null;
    });
  }

  openInquiryPopUp2(name) {
    let config = new MatDialogConfig();
    config.viewContainerRef = this.inquiryVisit_viewContainerRef;
    config.panelClass = 'enq-mod-c';
    // config.width = '550px';
    config.data = {
      spaceId: this.space_id,
      name: name
    };

    this.inquiryVisit_dialogRef = this.inquiryVisit_dialog.open(
      InquiryComponent,
      config
    );
    this.inquiryVisit_dialogRef.componentInstance.ref =
      this.inquiryVisit_dialogRef;
    this.inquiryVisit_dialogRef.componentInstance.flag = 1;
    this.inquiryVisit_dialogRef.afterClosed().subscribe((result) => {
      if (result && result.success) {
        window.location.reload();
      }
      this.inquiryVisit_dialogRef = null;
    });
  }
  // openScheduleVisitIsCoworkingPopup(){
  //   let isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn')) || null;
  //   if (isLoggedIn) {
  //     let config = new MatDialogConfig();
  //     config.viewContainerRef = this.scheduleVisitCoworking_viewContainerRef;
  //     config.panelClass = 'dialogClass';
  //     config.width = '550px';
  //     config.data = {
  //       spaceId: this.space_id
  //     }

  //     this.scheduleVisitCoworking_dialogRef = this.buyPass_dialog.open(CoWorkingVisitScheduleComponent, config);
  //     this.scheduleVisitCoworking_dialogRef.componentInstance.ref = this.scheduleVisitCoworking_dialogRef;
  //     this.scheduleVisitCoworking_dialogRef.componentInstance.flag = 1;
  //     this.scheduleVisitCoworking_dialogRef.afterClosed().subscribe((result) => {
  //       if (result && result.success) {
  //         window.location.reload();
  //       }
  //       this.scheduleVisitCoworking_dialogRef = null;
  //     });
  //   } else {
  //     this.openLoginDialog();
  //   }
  // }
  // openScheduleVisitIsCoworkingPopup() {
  //   let isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn')) || null;
  //   if (isLoggedIn) {
  //     let config = new MatDialogConfig();
  //     config.viewContainerRef = this.scheduleVisitCoworking_viewContainerRef;
  //     config.panelClass = 'dialogClass';
  //     config.width = '550px';
  //     config.data = {
  //       spaceId: this.space_id
  //     }

  //     // Open the first dialog
  //     this.scheduleVisitCoworking_dialogRef = this.dialog.open(CoWorkingVisitScheduleComponent, config);

  //     // Subscribe to the afterClosed() event to open the second dialog when the first one is closed
  //     this.scheduleVisitCoworking_dialogRef.afterClosed().subscribe((result) => {
  //       if (result && result.success) {
  //         // Open the second dialog when the first one is closed
  //         this.openScheduleVisitIsCoworkingPopupTwo();
  //       }
  //       this.scheduleVisitCoworking_dialogRef = null;
  //     });
  //   } else {
  //     this.openLoginDialog();
  //   }
  // }
  openScheduleVisitIsCoworkingPopup() {
    let isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn')) || null;
    let userDetails = JSON.parse(localStorage.getItem('userDetails')) || null;
    if (isLoggedIn || userDetails?.accessToken) {
      if (!this.modal.isOpen) {
        this.modal.openModal();
      }
    } else {
      this.openLoginDialog();
      localStorage.setItem('afterLogin', '4');
    }
  }

  hideSchedule() {
    this.showSchedule = false;
  }

  // Add this function to open the second dialog
  openScheduleVisitIsCoworkingPopupTwo() {
    let isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn')) || null;
    if (isLoggedIn) {
      let config = new MatDialogConfig();
      config.viewContainerRef = this.scheduleVisitCoworking_viewContainerRef;
      config.panelClass = 'dialogClass';
      config.width = '550px';
      config.data = {
        spaceId: this.space_id,
      };

      // Open the second dialog
      this.scheduleVisitCoworking2_dialogRef = this.dialog.open(
        CoWorkingVisitScheduleTwoComponent,
        config
      );

      // Subscribe to the afterClosed() event if you need to perform any action when the second dialog is closed
      this.scheduleVisitCoworking2_dialogRef
        .afterClosed()
        .subscribe((result) => {
          if (result && result.success) {
            // Do something when the second dialog is closed
            window.location.reload();
            localStorage.removeItem('afterLogin');
          }
          this.scheduleVisitCoworking2_dialogRef = null;
        });
    } else {
      this.openLoginDialog();
      localStorage.setItem('afterLogin', '5');
    }
  }

  // openFirstDialog() {
  //   // ... your existing code
  //   const config = new MatDialogConfig();
  //   this.scheduleVisitCoworking_dialogRef = this.buyPass_dialog.open(CoWorkingVisitScheduleComponent, config);

  //   // Listen for the formSubmitted event
  //   this.scheduleVisitCoworking_dialogRef.componentInstance.formSubmitted.subscribe(() => {
  //     // Close the first dialog
  //     this.scheduleVisitCoworking_dialogRef.close();

  //     // Open the second dialog
  //     this.openSecondDialog();
  //   });
  // }
  // openSecondDialog() {
  //   let isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn')) || null;
  //   if (isLoggedIn) {
  //     let config = new MatDialogConfig();
  //     config.viewContainerRef = this.scheduleVisitCoworking_viewContainerRef;
  //     config.panelClass = 'dialogClass';
  //     config.width = '550px';
  //     config.data = {
  //       spaceId: this.space_id
  //     }

  //     this.scheduleVisitCoworking2_dialogRef = this.buyPass_dialog.open(CoWorkingVisitScheduleTwoComponent, config);
  //     this.scheduleVisitCoworking2_dialogRef.componentInstance.ref = this.scheduleVisitCoworking2_dialogRef;
  //     this.scheduleVisitCoworking2_dialogRef.componentInstance.flag = 1;
  //     this.scheduleVisitCoworking2_dialogRef.afterClosed().subscribe((result) => {
  //       if (result && result.success) {
  //         window.location.reload();
  //       }
  //       this.scheduleVisitCoworking2_dialogRef = null;
  //     });
  //   } else {
  //     this.openLoginDialog();
  //   }
  // }
  private _openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  map: google.maps.Map | undefined;
  loadGoogleMapsScript(): void {
    const scriptId = 'google-maps-script';
    if (isPlatformBrowser(this.platformId)) {
      // Avoid adding the script multiple times
      if (document.getElementById(scriptId)) {
        this.initializeMap();
        return;
      }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.mapKey}&callback=initMap&libraries=places`;
    script.defer = true;
    script.async = true;

    // Append the script to the head
    document.head.appendChild(script);

    // Define the initMap function
    (window as any).initMap = () => {
      this.initializeMap();
    };
  }
  }

  initializeMap(): void {
    if (isPlatformBrowser(this.platformId)) {
      const mapDiv = document.getElementById('map');
      if (mapDiv) {
        this.map = new google.maps.Map(mapDiv, {
          center: { lat: 40.712776, lng: -74.005974 }, // Example: New York
          zoom: 12
        });
      } else {
        console.error('Map div is not available.');
      }
    }
  }


  openAddReviewDialog() {
    let isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn')) || null;
    let userDetails = JSON.parse(localStorage.getItem('userDetails')) || null;
    if (isLoggedIn || userDetails?.accessToken) {

      // check user is given review or not
      if (userDetails != null && userDetails.id) {

        if (this.userGivenReview) {
          this.toastr.error('You have already given review for this space.', 'Error', { timeOut: 10000 });
          return false;
        }
      }

      let config = new MatDialogConfig();
      config.viewContainerRef = this.requestBooking_viewContainerRef;
      config.panelClass = 'dialogClass-l';
      // config.width = '100%';
      config.data = {
        spaceId: this.space_id,
      };

      // Ensure that this.requestBooking_dialogRef is properly initialized
      // after calling this.requestBooking_dialog.open()
      this.addReview_dialogRef = this.addReview_dialog.open(
        AddReviewDialogComponent,
        config
      );

      // Make sure to check if this.requestBooking_dialogRef is not undefined
      // before accessing its properties or methods
      if (this.addReview_dialogRef) {
        this.addReview_dialogRef.componentInstance.ref =
          this.addReview_dialogRef;
        this.addReview_dialogRef.componentInstance.flag = 1;

        // Ensure proper handling of the afterClosed() subscription
        this.addReview_dialogRef.afterClosed().subscribe((result) => {
          if ((result && result.success) || result) {
            window.location.reload();
            localStorage.removeItem('afterLogin');
          }
          this.addReview_dialogRef = null;
        });
      }
    } else {
      this.openLoginDialog();
      localStorage.setItem('afterLogin', '6');
    }
  }

  voteDevoteSite(type: string) {
    let isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn')) || null;
    let userDetails = JSON.parse(localStorage.getItem('userDetails')) || null;
    localStorage.setItem('vote', type);

    if (isLoggedIn || userDetails?.accessToken) {
      this.isLoading = true
      let data = {
        voteType: type,
      };
      // let dataType = type=='upvote'? 'Liked':'Disliked'
      this.spaceService
        .voteDevoteSpace(data, this.space_id)
        .subscribe((res: any) => {
          if (res?.result?.success) {

            this.space_details.downvote = res?.result?.space.downvote;
            this.space_details.upvote = res?.result?.space.upvote;
            // this.toastr.success(`Space ${type} successfully `)

            this.existingUpVote = res?.result?.existingVote.upvote
            this.existingDownVote = res?.result?.existingVote.downvote

            this.isLoading = false
          } else {
            this.isLoading = false
          }
        });
    } else {
      this.openLoginDialog();
      localStorage.setItem('afterLogin', '7');
    }

  }
}
