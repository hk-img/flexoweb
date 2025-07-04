import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Input,
  NgZone,
  OnInit,
  PLATFORM_ID,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import {
  MatLegacyDialog as MatDialog,
  MatLegacyDialogRef as MatDialogRef,
} from '@angular/material/legacy-dialog';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MemberService } from '../services/member.service';
import { SpaceService } from '../services/space.service';
// import { LoaderService } from '../services/loader.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { isPlatformBrowser, TitleCasePipe } from '@angular/common';
import { MatDialogConfig } from '@angular/material/dialog';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import * as _ from 'lodash';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { InquiryComponent } from '../details/inquiry/inquiry.component';
import { FavouriteWorkSpaceService } from '../favourite-workspace/favourite-workspace.service';
import { GlobalVariables } from '../global/global-variables';
import { LoginDialog } from '../login/login-dialog.component';
import { AppGlobals } from '../services/app-globals';
declare var geolocation: any;
declare var google: any;
declare var $zoho: any;
@Component({
  selector: 'app-city-listing',
  templateUrl: './city-listing.component.html',
  styleUrls: ['./city-listing.component.css'],
  providers: [TitleCasePipe],

  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ height: 0, opacity: 0 }),
        animate('0.1s ease-out', style({ height: 300, opacity: 1 })),
      ]),
      transition(':leave', [
        style({ height: 300, opacity: 1 }),
        animate('0.1s ease-in', style({ height: 0, opacity: 0 })),
      ]),
    ]),
  ],
})
export class CityListingComponent implements OnInit, AfterViewInit {
  @ViewChild('faqsChild', { static: false })
  private faqsChild: ElementRef<HTMLDivElement>;
  isTestDivScrolledIntoView: boolean;
  _showMap: boolean = false;
  nearBySpaces = new BehaviorSubject<any>([]);
  faqs = new BehaviorSubject([]);
  isFaqsVisible: any;
  spaceType: string;
  @Input() spaceDetails: any;
  public space_id;
  isCoworking: any;
  staticValue: string;
  type: string;
  areaName: string;
  nearByLocationsList: any;
  areaLat: any;
  areaLong: any;
  currentArea: any;
  areaLocation: any;
  isloader: boolean = false;

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
    // responsive: [
    //   {
    //     breakpoint: 900,
    //     settings: {
    //       slidesToShow: 1,
    //       variableHeight: false,
    //     },
    //   },
    // ],
  };
  mapType: string;
  cityForMetaTag: any;
  open_spaceType: any;
  open_location: any;
  arrayOfSubpart: string;
  location_latitude: any;
  location_longitude: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private spaceService: SpaceService,
    private titleService: Title,
    private titleCasePipe: TitleCasePipe,
    public login_dialogRef: MatDialogRef<any>,
    // private loaderService: LoaderService,
    public login_viewContainerRef: ViewContainerRef,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public viewContainerRef: ViewContainerRef,
    private _memberService: MemberService,
    public login_dialog: MatDialog,
    private metaService: Meta,
    private ngZone: NgZone,
    private cdRef: ChangeDetectorRef,
    private _appGlobals: AppGlobals,
    @Inject(PLATFORM_ID) private platformId: any,
    private favouriteWorkSpaceService: FavouriteWorkSpaceService,
    public inquiryVisit_viewContainerRef: ViewContainerRef,
    public inquiryVisit_dialogRef: MatDialogRef<any>,
    public inquiryVisit_dialog: MatDialog,
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this._appGlobals.userDetails.subscribe((user_details) => {
      this.logged_in = user_details.is_logged_in;
      this.shortlists = user_details.shortlists;
    });

    this.open_spaceType = JSON.parse(sessionStorage.getItem('open_spaceType'));
    this.open_location = JSON.parse(sessionStorage.getItem('open_location'));
  }
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;
  @ViewChild('mapMarker') mapMarker: MapMarker;
  // @ViewChild('autocomplete', { static: false }) autocompleteElement: ElementRef;
  // public autocomplete: google.maps.places.Autocomplete;
  public selected_marker_window;
  public center;
  public city_param;
  // public distance = 10;
  // public capacity = null;
  // public geocoder = new google.maps.Geocoder();
  public city_lat;
  public city_long;
  public shortlists = [];
  public space_count;
  public page = 1;
  // public min_price = null;
  // public max_price = null;
  public isMobile = false;
  public zoom = 12;
  // public type = null;
  public pages = [];
  public page_start = 1;
  public page_size = 30;
  // public amenities = [];
  public page_end;
  public spaces_list: any[] = [];
  public spaces_list_length;
  public recommended_spaces: any[] = [];
  public recommended_spaces_length;
  public total_pages;
  public logged_in;
  public active_page = 1;
  public shimming: boolean = false;
  public resource_types = GlobalVariables.resource_types;
  userId: any;
  public filter = {
    capacity: null,
    // distance: 20,
    // type: null,
    min_price: null,
    max_price: null,
    amenities: [],
  };
  public options: google.maps.MapOptions = {
    scrollwheel: false,
    maxZoom: 0,
    mapTypeControl: false,
    minZoom: 2,
    clickableIcons: true,
  };
  public markersData = [];
  public aws_base_url =
    'https://s3.ap-south-1.amazonaws.com/' +
    environment.s3_bucket_path +
    '/details_images/';

  // @HostListener('window:scroll', ['$event'])
  // isScrolledIntoView() {
  //   if (this.faqsChild) {
  //     const rect = this.faqsChild.nativeElement.getBoundingClientRect();
  //     const topShown = rect.top >= 0;
  //     const bottomShown = rect.bottom <= window.innerHeight;
  //     this.isTestDivScrolledIntoView = topShown && bottomShown;
  //   }
  // }


  next(evt: any) {
    evt.stopPropagation()
    this.slickMainCarousel.slickNext();
  }

  prev(evt: any) {
    evt.stopPropagation()
    this.slickMainCarousel.slickPrev();
  }


  getOriginalUrlParam(value: string): string {
    return value?.replace(/-/g, ' ').replace(/\b\w/g, char => char?.toLowerCase());
  }

  hoveredSpaceId: string | null = null;

  onHoverSpace(name: string) {
    this.hoveredSpaceId = name;
    this.updateMarkerPriceColor(name, 'black');
  }

  onLeaveSpace(name: string) {
    this.hoveredSpaceId = null;
    this.updateMarkerPriceColor(name, 'white');
  }

  ngOnInit(): void {
    this.loadZohoScript2();
    this.getAllQuestions();
    const selectedValues = [
      "Private Office",
      "Managed Office",
      "Dedicated Desk",
      "Flexible Desk",
      "Virtual Office",
      "Day Pass"
    ];
    sessionStorage.setItem('selectedValues', JSON.stringify(selectedValues));
    this.removeLoaction()
    this.route.params.subscribe((params: ParamMap) => {
      this.spaceType = params['spaceType'] === "coworking" ? 'coworking space' : this.getOriginalUrlParam(params['spaceType']);
      if (this.spaceType == 'coworking cafe restaurant') {
        this.spaceType = 'Coworking Café/Restaurant';
      }
      if (this?.spaceType == 'coworking cafe restaurant') {
        this.city_param = this.getOriginalUrlParam(params['area']);
      } else {
        this.city_param = this.getOriginalUrlParam(params['city']);
      }
      this.areaName = this.getOriginalUrlParam(params['area'])
      if (!this.areaName) {
        if (this.spaceType === 'coworking space') {
          this.titleService.setTitle(`Best Coworking Space in ${this.getOriginalUrlParam(params['city']).toUpperCase()} (${new Date().getFullYear()}) | Compare & Book`);
          this.metaService.updateTag({
            name: "description",
            content: `Book coworking spaces in ${this.getOriginalUrlParam(params['city']).toUpperCase()} with flexible pricing and premium amenities at prime locations. Find your shared office fast and FREE with Flexo.`,
          });
        } else if (
          this.spaceType === 'coworking café/restaurant' ||
          this.spaceType === 'shoot studio' ||
          this.spaceType === 'recording studio' ||
          this.spaceType === 'podcast studio' ||
          this.spaceType === 'activity space' ||
          this.spaceType === 'sports turf' ||
          this.spaceType === 'sports venue' ||
          this.spaceType === 'party space' ||
          this.spaceType === 'banquet hall' ||
          this.spaceType === 'gallery' ||
          this.spaceType === 'classroom' ||
          this.spaceType === 'private cabin' ||
          this.spaceType === 'meeting room' ||
          this.spaceType === 'training room' ||
          this.spaceType === 'event space'
        ) {
          this.titleService.setTitle(`Book ${this.spaceType} in ${this.getOriginalUrlParam(params['city']).toUpperCase()} from Rs.20000 /hour`);
          this.metaService.updateTag({
            name: "description",
            content: `Book ${this.spaceType} in ${this.getOriginalUrlParam(params['city']).toUpperCase()} starting from Rs.20000 /hour. View images, amenities, pricing to find the best fit.Explore and book now!.`,
          });
        } else {
          this.titleService.setTitle(`Office Space for Rent in ${this.getOriginalUrlParam(params['city']).toUpperCase()} | Managed Offices`);
          this.metaService.updateTag({
            name: "description",
            content: `Explore offices for rent in ${this.getOriginalUrlParam(params['city']).toUpperCase()}. Choose from a wide range of furnished, unfurnished, built-to-suit and managed office options.`,
          });
        }
      } else if (this.areaName) {
        if (this.spaceType === 'coworking space') {
          this.titleService.setTitle(`Best Coworking Space in ${this.getOriginalUrlParam(params['area']).toUpperCase()} | Book A Shared Office`);
          this.metaService.updateTag({
            name: "description",
            content: `Book coworking spaces in ${this.getOriginalUrlParam(params['area']).toUpperCase()}, ${this.getOriginalUrlParam(params['city']).toUpperCase()}.Compare prices and amenities of coworking spaces and get quotes. Free, fast and easy! .`,
          });
        } else if (
          this.spaceType === 'coworking café/restaurant' ||
          this.spaceType === 'shoot studio' ||
          this.spaceType === 'recording studio' ||
          this.spaceType === 'podcast studio' ||
          this.spaceType === 'activity space' ||
          this.spaceType === 'sports turf' ||
          this.spaceType === 'sports venue' ||
          this.spaceType === 'party space' ||
          this.spaceType === 'banquet hall' ||
          this.spaceType === 'gallery' ||
          this.spaceType === 'classroom' ||
          this.spaceType === 'private cabin' ||
          this.spaceType === 'meeting room' ||
          this.spaceType === 'training room' ||
          this.spaceType === 'event space'
        ) {
          this.titleService.setTitle(`${this.spaceType} in ${this.getOriginalUrlParam(params['area']).toUpperCase()} | Book Now`);
          this.metaService.updateTag({
            name: "description",
            content: `Book ${this.spaceType} in ${this.getOriginalUrlParam(params['area'])}, ${this.getOriginalUrlParam(params['city']).toUpperCase()} Starting from Rs.20000 /hour. Compare prices, services and amenities. Explore available options now.`,
          });
        } else {
          this.titleService.setTitle(`Office Space for Rent in ${this.getOriginalUrlParam(params['area']).toUpperCase()}, ${this.getOriginalUrlParam(params['city']).toUpperCase()}`);
          this.metaService.updateTag({
            name: "description",
            content: `Find office space for rent in ${this.getOriginalUrlParam(params['area']).toUpperCase()}, ${this.getOriginalUrlParam(params['city']).toUpperCase()}. Choose from a variety of furnished, unfurnished, and custom-built options to suit your needs.`,
          });
        }
      }

      // const titleCase = (str) => str.replace(/\b\S/g, (t) => t.toUpperCase());

      // const fullPath = this.route.snapshot.url.map(segment => segment.path).join('/');
      // const segments = fullPath.split('/');
      // this.spaceType = segments[segments.indexOf('coworking') + 1];

      const url = window.location.href;  // Get the full URL
      const segments2 = url.split('/');

      // Find 'in' in the URL and extract the next static segment ('longTerm')
      const inIndex = segments2.indexOf('in');
      if (inIndex !== -1 && segments2.length > inIndex + 1) {
        this.staticValue = segments2[inIndex + 1];
        if (this.staticValue == 'coworking-space' || this.staticValue == 'coworking') {
          this.staticValue = "Coworking"
        }else if(this.staticValue == 'coworking-cafe-restaurant' || this.staticValue == 'shoot-studio' || this.staticValue == 'recording-studio' || this.staticValue == 'podcast-studio' || this.staticValue == 'activity-space' || this.staticValue == 'sports-turf' || this.staticValue == 'sports-venue' || this.staticValue == 'party-space' || this.staticValue == 'banquet-hall' || this.staticValue == 'gallery' || this.staticValue == 'classroom' || this.staticValue == 'private-cabin' || this.staticValue == 'meeting-room' || this.staticValue == 'training-room' || this.staticValue == 'event-space'){
          this.staticValue = 'Shortterm';
        } else {
          this.staticValue = 'Longterm';
        }
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('staticValue', this.staticValue);
        }
      }
    });

    this.zoom = 12;
    if (window.innerWidth < 700) {
      this.isMobile = true;
    }
    this.getSpacesByCity();
    // this.geocode();
    this.spaceService.filteredSpaces$.subscribe(
      (message) => {
        this.recommended_spaces = []
        this.spaces_list = []
        this.recommended_spaces = message
      }
    );
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('userDetails')) {
        this.isCoworking = sessionStorage.getItem('isCoworking')
        const userDetail = localStorage.getItem('userDetails');
        const userDetailObj = JSON.parse(userDetail);
        this.userId = userDetailObj.id
      } else {
        this.userId = 0
      }
    }
  }


  updateJsonLd(
    spaceType: string,
    cityName: string,
    imageUrl: string,
    location_name: string,
    detail: string,
    priceMin: number,
    priceMax: number,
    location?: string
  ) {
    const jsonLdId = 'json-ld-product';
    if (isPlatformBrowser(this.platformId)) {
      const existingScript = document.getElementById(jsonLdId);
      if (existingScript) {
        existingScript.remove();
      }
    }
    const jsonLd = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": this.areaName ? `${spaceType} in ${location_name}, ${cityName}` : `${spaceType} in ${cityName}`,
      "image": imageUrl,
      "description": detail,
      "brand": {
        "@type": "Brand",
        "name": "Flexo"
      },
      "offers": {
        "@type": "AggregateOffer",
        "url": window.location.href,
        "priceCurrency": "INR",
        "lowPrice": priceMin,
        "highPrice": priceMax,
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition"
      }
    };

    if (isPlatformBrowser(this.platformId)) {
      const jsonLdScript = document.createElement('script');
      jsonLdScript.id = jsonLdId;
      jsonLdScript.type = 'application/ld+json';
      jsonLdScript.text = JSON.stringify(jsonLd);

      document.head.appendChild(jsonLdScript);
    }
  }


  updatefaqsJsonLd(res:any){
    const jsonLdId = 'json-ld-faqs';
    if (isPlatformBrowser(this.platformId)) {
      const existingScript = document.getElementById(jsonLdId);
      if (existingScript) {
        existingScript.remove();
      }
    }
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": res.map((faq:any) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": this.stripTags(faq.answer)
        }
      }))
    };

    if (isPlatformBrowser(this.platformId)) {
      const jsonLdScript = document.createElement('script');
      jsonLdScript.id = jsonLdId;
      jsonLdScript.type = 'application/ld+json';
      jsonLdScript.text = JSON.stringify(jsonLd);

      document.head.appendChild(jsonLdScript);
    }
  }

  stripTags(html: string): string {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  }

  openInquiryPopUp() {
    if (isPlatformBrowser(this.platformId)) {
      this.isCoworking = sessionStorage.getItem('isCoworking');
    }
    let config = new MatDialogConfig();
    config.viewContainerRef = this.inquiryVisit_viewContainerRef;
    config.panelClass = 'enq-mod-c';
    // config.width = '550px';
    config.data = {
      spaceId: this.space_id,
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
  }

  onIntersection(e) {
    this.isFaqsVisible = e.visible;
  }

  getArray(length: number): number[] {
    if (length === 0) {
      length = 5
    }
    return Array(length).fill(0);
  }
  openMapInfoWindow(marker: MapMarker, info: any) {
    this.selected_marker_window = this.spaces_list.find((arr) => arr.id === info.id);
    this.infoWindow.open(marker);
  }


  handleImageError(event: any) {
    const imgElement = event.target as HTMLImageElement
    imgElement.src = 'assets/images/details_placeholder_image.jpg';
    imgElement.alt = 'Failed to Load Image';
  }


  ngAfterViewInit(): void {
    // this.initAutocomplete();
    if (isPlatformBrowser(this.platformId)) {
      // this.geocoder = new google.maps.Geocoder();
      // this.geocode();
    }
  }

  showHideMap(e) {
    this._showMap = e;
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  // geocode() {
  //   this.spaceService.getLatlong(this.city_param).then((res) => {
  //     if (res.results) {
  //       let location = res.results[0]?.geometry?.location;
  //       this.city_lat = location?.lat;
  //       this.city_long = location?.lng;
  //       this.center = {
  //         lat: this.city_lat,
  //         lng: this.city_long,
  //       };
  //       this.getSpacesByCity();

  //     }
  //   });
  // };

  openFiltersDialog(obj) {
    this.filter = obj.filter;
    this.getSpacesByCity();
  }

  formatLabel(value: number) {
    return value;
  }


  calculateCenter(markers) {
    let totalLat = 0;
    let totalLng = 0;
    let numMarkers = markers.length;

    markers.forEach(marker => {
      totalLat += marker.position.lat;
      totalLng += marker.position.lng;
    });

    const centerLat = totalLat / numMarkers;
    const centerLng = totalLng / numMarkers;

    return { lat: centerLat, lng: centerLng };
  }

  getSpacesByCity() {

    if (isPlatformBrowser(this.platformId)) {

      this.isloader = true;

      if (this.spaceType?.toLowerCase() == 'coworking space') {
        this.type = "coworking";

      } else if ((this.spaceType?.toLowerCase() == 'coworking café/restaurant') || (this.spaceType?.toLowerCase() == 'shoot studio') || (this.spaceType?.toLowerCase() == 'recording studio') || (this.spaceType?.toLowerCase() == 'podcast studio') || (this.spaceType?.toLowerCase() == 'activity space') || (this.spaceType?.toLowerCase() == 'sports turf') || (this.spaceType?.toLowerCase() == 'sports venue') || (this.spaceType?.toLowerCase() == 'party space') || (this.spaceType?.toLowerCase() == 'banquet hall') || (this.spaceType?.toLowerCase() == 'gallery') || (this.spaceType?.toLowerCase() == 'classroom') || (this.spaceType?.toLowerCase() == 'private cabin') || (this.spaceType?.toLowerCase() == 'meeting room') || (this.spaceType?.toLowerCase() == 'training room') || (this.spaceType?.toLowerCase() == 'event space')) {
        this.type = "shortterm";

      } else if ((this.spaceType?.toLowerCase() == 'managed office' || this.spaceType?.toLowerCase() == 'private office' || this.spaceType?.toLowerCase() == 'shared office' || this.spaceType?.toLowerCase() == 'virtual office')) {
        this.type = "longTerm";

      } else {
        this.type = "coworking";
      }


      let city_name = this.city_param;
      const subpart = sessionStorage.getItem('selectedValues');
      if (subpart == null) {
      }
      let typeObj = [
        'Private Office',
        'Managed Office',
        'Dedicated Desk',
        'Flexible Desk',
        'Virtual Office',
        'Day Pass'
      ]
      let api_params: any = {
        city_name,
        spaceType: (this.spaceType === 'coworking space') ? (subpart == null ? typeObj : JSON.parse(subpart)) : (this.spaceType === 'none' ? [] : [this.spaceType]),
        type: this.type,
        userId: this.userId,
      };
      _.extend(api_params, this.filter);

      if (this.areaName) {
        api_params.location_name = this.areaName
        const details = {
          cityId: this.city_param,
          spaceType: this.spaceType
        }
        this.spaceService.getNearBySpaces(details).pipe(finalize(() => { this.isloader = false })).subscribe(
          (response) => {
            if (this.areaName && response.length) {
              let isExist = response?.some((val) => val.location_name.toLowerCase() === this.areaName)
              let matchedLocation = response?.find(
                (val:any) => val.location_name.toLowerCase() === this.areaName
              );
              
              if (matchedLocation) {
                this.location_latitude = matchedLocation.lat;
                this.location_longitude = matchedLocation.longi;
              
                console.log("Latitude:", this.location_latitude);
                console.log("Longitude:",this.location_longitude);
              }
              if (!isExist) {
                this.router.navigate(['/error'])
              }
              const currentArea = response.find(val => val.location_name.toLowerCase() === this.areaName)
              //  api_params.city_lat = String(currentArea?.lat)
              //  api_params.city_long = String(currentArea?.longi)
              api_params.city_lat = 0
              api_params.city_long = 0
              api_params.location_lat = this.location_latitude ? this.location_latitude : 0
              api_params.location_longi = this.location_longitude ? this.location_longitude : 0
            }


            this.spaceService.getSpacesByCity(api_params, this.page).pipe(finalize(() => { this.isloader = false })).subscribe((res) => {
              this.nearBySpaces.next(res.faqs);
              this.spaces_list = Object.assign([], res.data);
              if (this.spaces_list.length) {
                const spaceType = this.spaces_list[0].spaceType
                const cityName = this.spaces_list[0].contact_city_name
                const location = this.spaces_list[0].location_name
                const location_name = this.spaces_list[0].location_name
                const imageUrl = this.spaces_list[0].images.length ? this.spaces_list[0].images[0] : ''
                const min = Math.min(...this.spaces_list.map(item => item.originalPrice).filter(price => price !== null));
                const max = Math.max(...this.spaces_list.map(item => item.originalPrice).filter(price => price !== null));
                if (this.type === 'coworking') {
                  const minPrice = Math.min(...this.spaces_list.map(item => item.flexible_desk_price).filter(price => price !== null && price !== 0));
                  const maxPrice = Math.max(...this.spaces_list.map(item => item.privatecabin_price).filter(price => price !== null));
                  this.updateJsonLd(spaceType, cityName, imageUrl, location_name, `Book coworking spaces in ${location}, ${cityName} that offer fully serviced offices with flexible terms, high-speed internet, and community-driven workspaces. Enjoy a productive environment with a range of coworking options on Flexo, from open desks to private cabins.`, minPrice, maxPrice)
                } else if (this.type === 'shortterm') {
                  this.updateJsonLd(spaceType, cityName, imageUrl, location_name, `Book the best ${spaceType} in ${location}, ${cityName} with premium equipments and modern amenities. Find spaces available for reservation by the hour with a variety of setups for your needs. Create, collaborate and celebrate with Flexo.`, min, max)
                } else {
                  this.updateJsonLd(spaceType, cityName, imageUrl, location_name, `Explore ${spaceType} for rent in ${location}, ${cityName} with options ranging from furnished and unfurnished offices to managed spaces. Expert advise and local knowledge make it easy to find your perfect office.`, min, max)
                }
              }else{
                  this.router.navigate(['/error'])
              }
              this.recommended_spaces = Object.assign([], res.recommended_spaces);
              this.space_count = res.space_count;
              if (this.spaces_list.length) {
                this.page_end =
                  this.space_count < this.page_size * this.page
                    ? this.space_count
                    : this.page_size * this.page;
                this.total_pages = Math.ceil(this.space_count / this.page_size);
                this.pages.splice(0, this.pages.length);
                for (let i = 1; i <= this.total_pages; i++) {
                  this.pages.push(i);
                }
                this.markersData = [];
                this.spaces_list.forEach((element) => {
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
                  let price;

                  if (this.type === 'coworking') {
                    if (element.flexible_desk_price === null || element.flexible_desk_price === 0) {
                      price = element.privatecabin_price
                    } else if(element.privatecabin_price === null || element.privatecabin_price === 0){
                      price = element.flexible_desk_price
                    } else {
                      price = element?.privatecabin_price > element.flexible_desk_price ? element.flexible_desk_price : element.privatecabin_price
                    }
                  } else {
                    price = this.formatCurrency(element.originalPrice)
                  }
                  // let duration = this.type === 'longterm' ? 'month' : this.type === 'shortterm' ? 'hour' : this.type === 'coworking' && element?.originalPrice > 0 ? 'day': 'seat'
                  let obj = {
                    position: {
                      lat: element.lat,
                      lng: element.longi,
                    },
                    title: element.name,
                    options: {
                      price: price,
                      // duration:duration,
                      draggable: false,
                      icon: {
                        url: this.createPriceTagIcon(`₹${price}`, 'white'),
                        scaledSize: {
                          width: `₹${price}`.length * 10 + 20,
                          height: 30,
                        }
                      }
                    },
                    info: {
                      map_image_url:
                        this.aws_base_url + element.id + '/' + element.images[0],
                      name: element.name,
                      id: element.id,
                      url: '/details/' + element.link_name,
                    },
                  };
                  this.markersData.push(obj);
                });
                this.center = this.calculateCenter(this.markersData)
              } else {
                this.recommended_spaces_length = this.recommended_spaces.length;
                this.recommended_spaces.forEach((element) => {
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
              }
              if (this.shortlists && this.shortlists.length) {
                this.spaces_list.forEach((element) => {
                  element.is_shortlisted = false;
                  if (this.shortlists && this.shortlists.length > 0) {
                    for (let j = 1; j <= this.shortlists.length; j++) {
                      if (this.shortlists[j] == element.id) {
                        element.is_shortlisted = true;
                      }
                    }
                  }
                });
              }
              this.ngZone.run(() => this.cdRef.detectChanges());
              this.shimming = false;
            });
          })


      } else {
        // api_params.city_lat = localStorage.getItem("lat")
        // api_params.city_long= localStorage.getItem("long")
        api_params.city_lat = localStorage.getItem("locationLat") ?? 0
        api_params.city_long = localStorage.getItem("locationLong") ?? 0
        api_params.location_lat = 0;
        api_params.location_longi = 0;

        this.spaceService.getSpacesByCity(api_params, this.page).pipe(finalize(() => { this.isloader = false })).subscribe((res) => {
          this.nearBySpaces.next(res.faqs);
          this.spaces_list = Object.assign([], res.data);
          if (this.spaces_list.length) {
            const spaceType = this.spaces_list[0].spaceType
            const cityName = this.spaces_list[0].contact_city_name
            const location_name = this.spaces_list[0].location_name
            const imageUrl = this.spaces_list[0].images.length ? this.spaces_list[0].images[0] : ''
            const min = Math.min(...this.spaces_list.map(item => item.originalPrice).filter(price => price !== null));
            const max = Math.max(...this.spaces_list.map(item => item.originalPrice).filter(price => price !== null));
            if (this.type === 'coworking') {
              const minPrice = Math.min(...this.spaces_list.map(item => item.flexible_desk_price).filter(price => price !== null && price !== 0));
              const maxPrice = Math.max(...this.spaces_list.map(item => item.privatecabin_price).filter(price => price !== null));
              this.updateJsonLd(spaceType, cityName, imageUrl, location_name, `'Book premium coworking space in ${cityName} with flexible pricing options, prime locations, and modern amenities. Explore top coworking brands on Flexo for shared offices, private cabins, and collaborative work environments designed for businesses of all sizes'.`, minPrice, maxPrice)
            } else if (this.type === 'shortterm') {
              this.updateJsonLd(spaceType, cityName, imageUrl, location_name, `Book the best ${spaceType} in ${cityName} with premium equipments and modern amenities. Find spaces available for reservation by the hour with a variety of setups for your needs. Create, collaborate and celebrate with Flexo.`, min, max)
            } else {
              this.updateJsonLd(spaceType, cityName, imageUrl, location_name, `Explore a variety of ${spaceType} for rent in ${cityName}. Choose from fully furnished, unfurnished, or built-to-suit options designed to accommodate growing businesses. Find the perfect office with Flexo today.`, min, max)
            }
          }
          this.recommended_spaces = Object.assign([], res.recommended_spaces);
          this.space_count = res.space_count;
          if (this.spaces_list.length) {
            this.page_end =
            this.space_count < this.page_size * this.page
            ? this.space_count
            : this.page_size * this.page;
            const rawPages = this.space_count / this.page_size;
            const decimalPart = rawPages - Math.floor(rawPages);
            this.total_pages = decimalPart > 0 ? Math.floor(rawPages) + 1 : Math.floor(rawPages);
            this.pages.splice(0, this.pages.length);
            for (let i = 1; i <= this.total_pages; i++) {
              this.pages.push(i);
            }
            this.markersData = [];
            this.spaces_list.forEach((element) => {
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
              let price;

              if (this.type === 'coworking') {
                if (element.flexible_desk_price === null) {
                  price = element.privatecabin_price
                } else {
                  price = element?.privatecabin_price < element.flexible_desk_price ? element.flexible_desk_price : element.privatecabin_price
                }
              } else {
                price = this.formatCurrency(element.originalPrice)
              }
              // let duration = this.type === 'longterm' ? 'month' : this.type === 'shortterm' ? 'hour' : this.type === 'coworking' && element?.originalPrice > 0 ? 'day' : 'seat' 
              let obj = {
                position: {
                  lat: element.lat,
                  lng: element.longi,
                },
                title: element.name,
                options: {
                  price: price,
                  // duration:duration,
                  draggable: false,
                  icon: {
                    url: this.createPriceTagIcon(`₹${price}`, 'white'),
                    scaledSize: {
                      width: `₹${price}`.length * 10 + 20,
                      height: 30,
                    }
                  }
                },
                info: {
                  map_image_url:
                    this.aws_base_url + element.id + '/' + element.images[0],
                  name: element.name,
                  id: element.id,
                  url: '/details/' + element.link_name,
                },
              };
              this.markersData.push(obj);
            });
            this.center = this.calculateCenter(this.markersData)
          } else {
            this.recommended_spaces_length = this.recommended_spaces.length;
            this.recommended_spaces.forEach((element) => {
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
          }
          if (this.shortlists && this.shortlists.length) {
            this.spaces_list.forEach((element) => {
              element.is_shortlisted = false;
              if (this.shortlists && this.shortlists.length > 0) {
                for (let j = 1; j <= this.shortlists.length; j++) {
                  if (this.shortlists[j] == element.id) {
                    element.is_shortlisted = true;
                  }
                }
              }
            });
          }
          this.ngZone.run(() => this.cdRef.detectChanges());
          this.shimming = false;
        });
      }

    }
  }

  updateMarkerPriceColor(name: string, color: string) {
    console.log(this.markersData)
    const markerIndex = this.markersData.findIndex(marker => marker?.info?.id === name);

    if (markerIndex !== -1) {
      const newIconUrl = this.createPriceTagIcon(`₹${this.markersData[markerIndex].options.price}`, color);

      this.markersData[markerIndex] = {
        ...this.markersData[markerIndex],
        options: {
          ...this.markersData[markerIndex].options,
          icon: {
            url: newIconUrl,
            scaledSize: {
              width: `₹${this.markersData[markerIndex].options.price}`.length * 10 + 20,
              height: 30,
            }
          }
        }
      };
    }
  }

  createPriceTagIcon(price: string, textColor: string): string {
    const textLength = price.length;
    const dynamicWidth = textLength * 10 + 20;
    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${dynamicWidth}" height="30">
      <rect x="0" y="0" width="${dynamicWidth}" height="30" rx="20" style="fill:#F76900;" />
      <text x="50%" y="50%" alignment-baseline="central" text-anchor="middle"
            font-size="14" dominant-baseline="middle" font-weight="600"  letter-spacing="1.5px" fill="${textColor}" font-family="Poppins, sans-serif">${price}</text>
    </svg>
  `;

    return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
  }

  formatCurrency(value) {
    if (isNaN(value)) return 'Invalid number';
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  shortList(obj, e?: MouseEvent) {

    if (isPlatformBrowser(this.platformId)) {

      // e.stopPropagation()
      let isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn')) || null;
      if (isLoggedIn /* this.logged_in */) {
        this.addRemoveFavorite(obj.id)
        this._memberService.addShortlists(obj.id).then((data) => {
          // this.openSnackBar(data.message, 'Dismiss');
          // obj.is_shortlisted = !!!obj.is_shortlisted;
          this.spaces_list.forEach((element) => {
            if (element.id == obj.id) {
              element.is_shortlisted = data.new_shortlist;
            }
          });
        });
        setTimeout(() => {
          window.location.reload()
        }, 1000);
      } else {
        this.openLoginDialog();
      }
    }
  }

  addRemoveFavorite(space_id) {
    this.favouriteWorkSpaceService.addRemoveFavouriteWorkSpace(space_id).subscribe((result: any) => {
      this.openSnackBar(result.message, 'Dismiss');
    }, error => {
    })
  }

  pagination(num) {
    this.page_start = num * this.page_size - (this.page_size - 1);
    this.page_end =
      this.space_count < num * this.page_size
        ? this.space_count
        : num * this.page_size;
    this.active_page = num;
    this.page = num;
    this.getSpacesByCity();
  }

  openLoginDialog() {
    let config = new MatDialogConfig();
    config.viewContainerRef = this.login_viewContainerRef;
    config.panelClass = 'dialogClass';
    config.width = '600px';

    this.login_dialogRef = this.login_dialog.open(LoginDialog, config);
    this.login_dialogRef.componentInstance.ref = this.login_dialogRef;
    this.login_dialogRef.componentInstance.flag = 1;
    // this.login_dialogRef.componentInstance.selected_teamcabin = teamcabin_obj;
    // this.login_dialogRef.componentInstance.action_type = action_type;
    this.login_dialogRef.afterClosed().subscribe((result) => {
      if (result && result.success) {
        window.location.reload();
      }
      this.login_dialogRef = null;
    });
  }


  removeLoaction() {

    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem("locationLat")
      localStorage.removeItem("locationLong")
    }
  }
  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.removeLoaction()
      let arr = ["range", "distance", "min_price", "max_price"]
      for (let index = 0; index < arr.length; index++) {
        localStorage.removeItem(arr[index])
      }
    }
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

  isScriptLoaded: boolean = false;

  loadZohoScript2() {

    const existingScript = document.getElementById("zsiqscript");
    if (existingScript) {
      existingScript.remove();
    }

    setTimeout(() => {
      window['$zoho'] = window['$zoho'] || {};
      window['$zoho'].salesiq = {
        widgetcode: "0fc4dfe126a900d08cd66965a527bbcfebd987ea8870090a53afd7a22440aa53",
        values: {},
        ready: function () {
        },
      };
      setTimeout(() => {
        if (this.spaceType != "event space" && this.spaceType != 'Coworking Café/Restaurant' && this.spaceType != 'shoot studio' && this.spaceType != 'recording studio' && this.spaceType != 'podcast studio' && this.spaceType != 'activity space' && this.spaceType != 'sports turf' && this.spaceType != 'sports venue' && this.spaceType != 'party space' && this.spaceType != 'banquet hall' && this.spaceType != 'gallery' && this.spaceType != 'classroom' && this.spaceType != 'private cabin' && this.spaceType != 'meeting room' && this.spaceType != 'training room') {
          this.clickZohoChatButton();
        }
      }, 1000);
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.id = "zsiqscript";
      script.defer = true;
      script.src = "https://salesiq.zoho.in/widget";
      document.body.appendChild(script);

    }, 200);
  }

  clickZohoChatButton() {
    const interval = setInterval(() => {
      const chatButton = document.getElementById("zsiq_agtpic");
      if (chatButton) {
        chatButton.click();
        clearInterval(interval);
      }
    }, 100);
  }

  shortQuestions: any[] = [];
  briefQuestions: any[] = [];

  getAllQuestions() {
    this.spaceService.faqsSubject.subscribe((res: any) => {
      this.shortQuestions = res.filter((x) => x.type == 1);
      this.briefQuestions = res.filter((x) => x.type == 2);

      const allFaqs = [...this.shortQuestions, ...this.briefQuestions];
      console.log(allFaqs)
  
      this.updatefaqsJsonLd(allFaqs);
    });
  }

}

