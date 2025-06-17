import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, NgZone, PLATFORM_ID, ViewChild, ViewContainerRef, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { ToastrService } from 'ngx-toastr';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { GlobalVariables } from '../global/global-variables';
import { SpaceService } from '../services/space.service';
declare var google: any;
declare let localStorage: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  public workspace_type;
  public isMobile = false;
  public s3_base_url =
    'https://' +
    environment.s3_bucket_path +
    '.s3.ap-south-1.amazonaws.com/banner_images/';
  public autocomplete: google.maps.places.Autocomplete;
  public geolocation: { lat: any; lng: any };
  public testimonials = GlobalVariables.testimonials;
  andheriEast = 'https://flexospaces-images.s3.ap-south-1.amazonaws.com/img/category/Andheri-East.webp';
  lowerParel = 'https://flexospaces-images.s3.ap-south-1.amazonaws.com/img/category/LowerParel.webp';
  powai = 'https://flexospaces-images.s3.ap-south-1.amazonaws.com/img/category/Powai.webp';
  thane = 'https://flexospaces-images.s3.ap-south-1.amazonaws.com/img/category/Thane.webp';
  bkc = 'https://flexospaces-images.s3.ap-south-1.amazonaws.com/img/category/BKC.webp';
  backgrounds: string[] = [
    'https://flexospaces-images.s3.ap-south-1.amazonaws.com/img/coworking-spaces.webp',
    'https://flexospaces-images.s3.ap-south-1.amazonaws.com/img/managed-offices.webp',
    'https://flexospaces-images.s3.ap-south-1.amazonaws.com/img/meeting-rooms.webp',
    'https://flexospaces-images.s3.ap-south-1.amazonaws.com/img/desk-spaces.webp',
    'https://flexospaces-images.s3.ap-south-1.amazonaws.com/img/private-cabins.webp',
    'https://flexospaces-images.s3.ap-south-1.amazonaws.com/img/private-offices.webp',
    'https://flexospaces-images.s3.ap-south-1.amazonaws.com/img/workspaces.webp',
  ];

  texts: string[] = [
    'Coworking Spaces',
    'Managed Offices',
    'Meeting Rooms',
    'Desk Spaces',
    'Private Cabins',
    'Private Offices',
    'Workspaces',
  ];

  currentImageIndex: number = 0;
  currentTextIndex: number = 0;
  isTextFadingOut: boolean = false;

  imageDuration: number = 5000; // Duration for image (in ms)
  textDelay: number = 900; // Delay for text fade in/out (in ms)

  intervalId: any;
  hostWebUrl: any = environment.HOST_WEBLINK;

  @ViewChild('slickReviewsModal', { static: false })
  slickReviewsModal: SlickCarouselComponent;
  public reviewsConfig = {
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    variableHeight: false,
    autoplay: true,
    autoplaySpeed: 1500,
    dots: false,
    swipeToSlide: true,
    infinite: true,
    responsive: [
      {
        breakpoint: 1167,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  @ViewChild('slickReviewsModal2', { static: false })
  slickReviewsModal2: SlickCarouselComponent;
  public reviewsConfig1 = {
    slidesToShow: 1,
    slidesToScroll: 1,
    loop: true,
    arrows: false,
    variableHeight: false,
    autoplay: true,
    autoplaySpeed: 8000,
    dots: false,
    swipeToSlide: true,
    infinite: true,
    responsive: [
      {
        breakpoint: 1167,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  @ViewChild('slickReviewsModal3', { static: false })
  slickReviewsModal3: SlickCarouselComponent;
  public reviewsConfig3 = {
    slidesToShow: 5,
    slidesToScroll: 1,
    loop: true,
    arrows: false,
    variableHeight: false,
    autoplay: true,
    autoplaySpeed: 8000,
    dots: false,
    swipeToSlide: true,
    infinite: true,
    responsive: [
      {
        breakpoint: 1167,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  locations: string[] = [];
  control = new FormControl('');
  filteredPlaces: any;

  @ViewChild('slickTestimonialModal', { static: false })
  slickTestimonialModal: SlickCarouselComponent;
  public testimonialConfig = {
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    loop: true,
    prevArrow: '<button class="slick-prev"><</button>',
    nextArrow: '<button class="slick-next">></button>',
    variableHeight: false,
    autoplay: true,
    autoplaySpeed: 3000,
    dots: false,
    swipeToSlide: true,
    infinite: true,
    responsive: [
      {
        breakpoint: 1167,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
           arrows: false,
           dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          arrows: false,
           dots: true,
        },
      },
    ],
  };

  @ViewChild('citySlickSlider', { static: false })
  citySlickSlider: SlickCarouselComponent;
  public cityConfig = {
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: '<button class="slick-prev"><</button>',
    nextArrow: '<button class="slick-next">></button>',
    variableHeight: false,
    autoplay: false,
    autoplaySpeed: 1000,
    speed: 500,
    dots: false,
    swipeToSlide: true,
    infinite: true,
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 1167,
        settings: {
          slidesToShow: 3,
          arrows: true,
          dots: false,

        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  @ViewChild('workSpaceSlider', { static: false })
  workSpaceSlider: SlickCarouselComponent;
  public workSpaceConfig = {
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: '<button class="slick-prev"><</button>',
    nextArrow: '<button class="slick-next">></button>',
    variableHeight: false,
    autoplay: false,
    autoplaySpeed: 1000,
    dots: false,
    swipeToSlide: true,
    infinite: true,
    responsive: [
      {
        breakpoint: 1167,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  @ViewChild('companyModal', { static: false })
  companyModal: SlickCarouselComponent;
  public companyConfig = {
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false,
    variableHeight: false,
    autoplay: true,
    autoplaySpeed: 0,
    pauseOnHover: false,
    pauseOnFocus: false,
    swipeToSlide: true,
    infinite: true,
    speed: 5000,
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 1167,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  @ViewChild('coworkBrandSlider', { static: false })
  coworkBrandSlider: SlickCarouselComponent;
  public brandConfig = {
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: '<button class="slick-prev"><</button>',
    nextArrow: '<button class="slick-next">></button>',
    variableHeight: false,
    autoplay: false,
    autoplaySpeed: 1000,
    speed: 500,
    dots: false,
    swipeToSlide: true,
    infinite: true,
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 1167,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  @ViewChild('spaceListSlider', { static: false })
  spaceListSlider: SlickCarouselComponent;
  public spaceListConfig = {
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    variableHeight: false,
    autoplay: true,
    autoplaySpeed: 1000,
    dots: true,
    swipeToSlide: true,
    infinite: true,
    responsive: [
      {
        breakpoint: 1167,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  user_lat: number;
  user_long: number;
  spaces = [];
  spaceType: any;
  location: any;
  locationObj: any;
  getLocationObjForSearch: any;
  searchTerm: string;
  city: any;

  next() {
    this.slickReviewsModal.slickNext();
  }

  prev() {
    this.slickReviewsModal.slickPrev();
  }

  constructor(
    private router: Router,
    public viewContainerRef: ViewContainerRef,
    private titleService: Title,
    private elementRef: ElementRef,
    private metaService: Meta,
    private ngZone: NgZone,
    private spaceService: SpaceService,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: any,
    private toastr: ToastrService
  ) {
    this.titleService.setTitle(
      `Find Coworking & Office Spaces Across India | Flexo`
    );
    this.metaService.updateTag({
      name: 'description',
      content: `Discover top coworking spaces, managed offices, and commercial properties. Find your perfect office with Flexo. Trusted by leading companies - Flexo`,
    });
    this.metaService.updateTag({
      name: 'keywords',
      content: ``,
    });
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeComponent();
      this.homeJsonLd();
    }
  }

  private initializeComponent(): void {
    this.startCarousel();
    this.getCoords();
    this.getSpacecategory();
    this.checkMobileView();
    this.initializeWorkspace();
    this.initializeGeolocation();
    this.initializeAutocomplete();
  }

  private checkMobileView(): void {
    if (window.innerWidth < 500) {
      this.isMobile = true;
      this.cdr.markForCheck();
    }
  }

  private initializeWorkspace(): void {
    this.workspace_type = 0;
    this.initializeFilteredPlaces();
  }

  private initializeFilteredPlaces(): void {
    this.filteredPlaces = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
      takeUntil(this.destroy$)
    );

    this.filteredPlaces.subscribe((data: any) => {
      this.cdr.markForCheck();
    });
  }

  private initializeGeolocation(): void {
    this.geolocate();
  }

  private initializeAutocomplete(): void {
    // Initialize autocomplete if needed
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    clearInterval(this.intervalId);
    this.cleanupZohoScript();
  }

  private cleanupZohoScript(): void {
    const existingScript = document.getElementById("zsiqscript");
    if (existingScript) {
      existingScript.remove();
    }
  }

  startCarousel(): void {
    this.intervalId = setInterval(() => {
      this.ngZone.run(() => {
        this.isTextFadingOut = true;

        setTimeout(() => {
          this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
          this.isTextFadingOut = false;
          this.cdr.markForCheck();
        }, this.textDelay);

        this.currentImageIndex = (this.currentImageIndex + 1) % this.backgrounds.length;
        this.cdr.markForCheck();
      });
    }, this.imageDuration);
  }

  getSpacecategory() {
    this.spaceService.getSpaceCategory()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: any) => {
        this.spaces = res;
        this.cdr.markForCheck();
      });
  }

  getVal(event: any) {
    if (event === '') {
      this.spaceType = '';
    } else {
      this.spaceType = event;
      this.getAllLocation(this.spaceType);
    }
  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    this.filteredPlaces = this.locations.filter(street => this._normalizeValue(street).includes(filterValue));

    return this.filteredPlaces;
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  onInputChange(value: string) {
    this.searchTerm = value.toLowerCase().trim().split(' ')[0];
    this.filterLocations();
  }

  filterLocations() {
    if (this.searchTerm) {
      this.filteredPlaces = this.locations.filter(val =>
        val.toLowerCase().startsWith(this.searchTerm)
      );
    }
  }

  getHighlightedSegments(value: string) {
    if (!this.searchTerm) return [{ text: value, highlight: false }];

    const segments = [];
    let lastIndex = 0;
    const searchTermLower = this.searchTerm.toLowerCase();
    let index = value.toLowerCase().indexOf(searchTermLower);

    while (index !== -1) {
      if (index > lastIndex) {
        segments.push({ text: value.substring(lastIndex, index), highlight: false });
      }
      segments.push({
        text: value.substring(index, index + searchTermLower?.length
        ), highlight: true
      });
      lastIndex = index + searchTermLower?.length
        ;
      index = value.toLowerCase().indexOf(searchTermLower, lastIndex);
    }

    if (lastIndex < value?.length
    ) {
      segments.push({ text: value.substring(lastIndex), highlight: false });
    }

    return segments;
  }

  getLocationValue(event: any) {
    this.location = event.option.value;

    this.locationObj.filter((place: any) => {
      if (place.label === this.location) {
        this.getLocationObjForSearch = place;
        this.city = this.getLocationObjForSearch.city;

        localStorage.setItem('lat', this.getLocationObjForSearch.lat);
        localStorage.setItem('long', this.getLocationObjForSearch.long);
      }
    })
  }

  getAllLocation(spaceType: any) {
    this.spaceService.getAllLocations2(spaceType)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: any) => {
        this.filteredPlaces = res.map((location: any) => location.label);
        this.locationObj = res;
        this.locations = res.map((location: any) => location.label);
        this.cdr.markForCheck();
      });
  }

  getCoords() {
    if (isPlatformBrowser(this.platformId)) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.user_lat = position.coords.latitude;
        this.user_long = position.coords.longitude;
      });
    }
  }

  public geolocate() {
    if (isPlatformBrowser(this.platformId)) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.geolocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          let circle = new google.maps.Circle({
            center: this.geolocation,
            radius: position.coords.accuracy,
          });
          this.autocomplete?.setBounds(circle.getBounds());
          //this.autocomplete_1.setBounds(circle.getBounds());
        });
      }
    }
  }

  onSearchSubmit() {
    let url = '';
    this.spaceType = this.spaceType.toLowerCase();
    localStorage.setItem("location", this.getLocationObjForSearch.label)

    let isCityLevel = this.filteredPlaces.find(place => place.trim().endsWith('(City)'));

    let citySlug = this.city.replace(/\s+/g, '-').toLowerCase();
    let spaceTypeSlug = this.spaceType.toLowerCase().replace(/\s+/g, '-').replace('/', '-');

    if(spaceTypeSlug == 'coworking-space'){
      spaceTypeSlug = 'coworking'
    }

    if (isCityLevel) {
      url = `in/${spaceTypeSlug}/${citySlug}`;
    } else {
      let placesSlug = this.filteredPlaces
        .map(place => place.split(',')[0].trim())
        .join('-');
      url = `in/${spaceTypeSlug}/${citySlug}/${placesSlug}`;
    }
    this.router.navigate([this.formatUrl(url)]);
  }

  navigateToCity(city: any, locationValue: any) {
    let url = "";
    url = `in/coworking/` + `${(city).replace(' ', '-').toLowerCase()}`;
    localStorage.setItem("location", locationValue)
    this.router.navigate([this.formatUrl(url)]);
  }

  formatUrl(value: string): string {
    return value?.trim()?.toLowerCase().replace(/\s+/g, '-');
  }

  onNearmeClicked() {
    this.spaceService.getCityInfo(this.user_lat, this.user_long).subscribe(
      (response) => {
        const { cityName, areaName } = response;

        this.router.navigate([`/in/spaces/`, cityName, areaName]);
      },
      (err) => {
      }
    );
  }

  onSpaceSearch() {
    this.spaceType
  }

  getCityAndLocationDetails2(address_components) {
    let address_length = address_components?.length
      ;
    let main_address_component = address_components[0];
    let is_city = false;
    let city_name = '';
    let location_name = '';

    switch (address_length) {
      case 3:
        city_name = main_address_component.long_name;
        is_city = true;
        break;
      case 4:
        if (
          main_address_component.types[0] == 'locality' &&
          address_components[1].types[0] == 'administrative_area_level_2'
        ) {
          if (
            main_address_component.long_name == address_components[1].long_name
          ) {
            is_city = true;
            city_name = main_address_component.long_name;
          } else {
            location_name = main_address_component.long_name;
            city_name = address_components[1].long_name;
          }
        }
        break;
      default:
        location_name = main_address_component.long_name;
        address_components.forEach((address) => {
          if (address.types[0] == 'locality') {
            city_name = address.long_name;
          }
          if (address.types[0] == 'administrative_area_level_2') {
            city_name = address.long_name;
          }
        });
        break;
    }

    return {
      is_city,
      city_name,
      location_name,
    };
  }

  isScriptLoaded: boolean = false;

  loadZohoScript2() {
    this.cleanupZohoScript();

    setTimeout(() => {
      window['$zoho'] = window['$zoho'] || {};
      window['$zoho'].salesiq = {
        widgetcode: "0fc4dfe126a900d08cd66965a527bbcfebd987ea8870090a53afd7a22440aa53",
        values: {},
        ready: function () {
        },
      };
      setTimeout(() => {
        this.clickZohoChatButton();
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

  public companyLogos = [
    { src: 'https://flexospaces-images.s3.ap-south-1.amazonaws.com/img/client-logo/Accord-logo.webp', alt: 'Accord Logo' },
    { src: 'https://flexospaces-images.s3.ap-south-1.amazonaws.com/img/client-logo/amethyst-revised-logo.webp', alt: 'Amethyst Logo' },
    { src: 'https://flexospaces-images.s3.ap-south-1.amazonaws.com/img/client-logo/arvind-mafatlal-logo.webp', alt: 'Arvind Mafatlal Logo' },
    { src: 'https://flexospaces-images.s3.ap-south-1.amazonaws.com/img/client-logo/beerbiceps.webp', alt: 'BeerBiceps Logo' },
    { src: 'https://flexospaces-images.s3.ap-south-1.amazonaws.com/img/client-logo/bg3.webp', alt: 'BG3 Logo' },
    { src: 'https://flexospaces-images.s3.ap-south-1.amazonaws.com/img/client-logo/eicher.webp', alt: 'Eicher Logo' },
    { src: 'https://flexospaces-images.s3.ap-south-1.amazonaws.com/img/client-logo/inmobi.webp', alt: 'Inmobi Logo' },
    { src: 'https://flexospaces-images.s3.ap-south-1.amazonaws.com/img/client-logo/jtb.webp', alt: 'JTB Logo' },
    { src: 'https://flexospaces-images.s3.ap-south-1.amazonaws.com/img/client-logo/khaitan.webp', alt: 'Khaitan Logo' },
    { src: 'https://flexospaces-images.s3.ap-south-1.amazonaws.com/img/client-logo/livespace.webp', alt: 'Livespace Logo' },
    { src: 'https://flexospaces-images.s3.ap-south-1.amazonaws.com/img/client-logo/mirae-asset.webp', alt: 'Mirae Asset Logo' },
    { src: 'https://flexospaces-images.s3.ap-south-1.amazonaws.com/img/client-logo/nb.webp', alt: 'NB Logo' },
    { src: 'https://flexospaces-images.s3.ap-south-1.amazonaws.com/img/client-logo/pcr.webp', alt: 'PCR Logo' },
    { src: 'https://flexospaces-images.s3.ap-south-1.amazonaws.com/img/client-logo/pi.webp', alt: 'PI Logo' },
    { src: 'https://flexospaces-images.s3.ap-south-1.amazonaws.com/img/client-logo/prepe.webp', alt: 'Prepe Logo' },
    { src: 'https://flexospaces-images.s3.ap-south-1.amazonaws.com/img/client-logo/roche.webp', alt: 'Roche Logo' },
    { src: 'https://flexospaces-images.s3.ap-south-1.amazonaws.com/img/client-logo/scentido.webp', alt: 'Scentido Logo' },
    { src: 'https://flexospaces-images.s3.ap-south-1.amazonaws.com/img/client-logo/shop101.webp', alt: 'Shop101 Logo' },
    { src: 'https://flexospaces-images.s3.ap-south-1.amazonaws.com/img/client-logo/sterimax.webp', alt: 'Sterimax Logo' },
    { src: 'https://flexospaces-images.s3.ap-south-1.amazonaws.com/img/client-logo/Thyssenkrupp.webp', alt: 'Thyssenkrupp Logo' },
    { src: 'https://flexospaces-images.s3.ap-south-1.amazonaws.com/img/client-logo/tlc.webp', alt: 'TLC Logo' },
    { src: 'https://flexospaces-images.s3.ap-south-1.amazonaws.com/img/client-logo/triniti.webp', alt: 'Triniti Logo' }
  ];

  // TrackBy functions for ngFor optimizations
  trackByBackground(index: number, item: string): string {
    return item;
  }

  trackByText(index: number, item: string): string {
    return item;
  }

  trackBySpace(index: number, item: any): string {
    return item.spaceType;
  }

  trackByLocation(index: number, item: string): string {
    return item;
  }

  trackByLogo(index: number, item: any): string {
    return item.src;
  }

  homeJsonLd(): void {
    const jsonLdId = 'json-ld-home';

    if (isPlatformBrowser(this.platformId)) {
      const existingScript = document.getElementById(jsonLdId);
      if (existingScript) {
        existingScript.remove();
      }

      const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Flexo",
        "url": "https://www.flexospaces.com",
        "logo": "https://www.flexospaces.com/assets/images/logo.png",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+91-9513392400",
          "contactType": "Customer Service",
          "areaServed": "IN",
          "availableLanguage": ["English"]
        },
        "sameAs": [
          "https://www.linkedin.com/company/flexospaces",
          "https://twitter.com/flexospaces",
          "https://www.instagram.com/flexospaces"
        ]
      };

      const script = document.createElement('script');
      script.id = jsonLdId;
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  }
}