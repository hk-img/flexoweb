import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, NgZone, PLATFORM_ID, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { ToastrService } from 'ngx-toastr';
import { map, startWith } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { GlobalVariables } from '../global/global-variables';
import { SpaceService } from '../services/space.service';
declare var google: any;
declare let localStorage: any;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  public workspace_type;
  public isMobile = false;
  public s3_base_url =
    'https://' +
    environment.s3_bucket_path +
    '.s3.ap-south-1.amazonaws.com/banner_images/';
  public autocomplete: google.maps.places.Autocomplete;
  public geolocation: { lat: any; lng: any };
  public testimonials = GlobalVariables.testimonials;
  andheriEast = 'assets/images/category/Andheri-East.jpg';
  lowerParel = 'assets/images/category/LowerParel.jpg';
  powai = 'assets/images/category/Powai.jpg';
  thane = 'assets/images/category/Thane.jpg';
  bkc = 'assets/images/category/BKC.jpg';
  backgrounds: string[] = [
    'assets/images/coworking-spaces.webp',
    'assets/images/managed-offices.webp',
    'assets/images/meeting-rooms.webp',
    'assets/images/desk-spaces.webp',
    'assets/images/private-cabins.webp',
    'assets/images/private-offices.webp',
    'assets/images/workspaces.webp',
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
  hostWebUrl:any=environment.HOST_WEBLINK;


 
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
    loop:true,
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
    loop:true,
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

  // @ViewChild('slickTestimonialModal', { static: false })
  // slickTestimonialModal: SlickCarouselComponent;
  
  // public testimonialConfig = {
  //   slidesToShow: 3, 
  //   arrows: true,
  //   prevArrow: '<button class="slick-prev">></button>',
  //   nextArrow: '<button class="slick-next"><</button>',
  //   variableHeight: false,
  //   autoplay: true,
  //   autoplaySpeed: 3000, 
  //   dots: false,
  //   swipeToSlide: true,
  //   infinite: true,
  //   responsive: [
  //     {
  //       breakpoint: 1167, 
  //       settings: {
  //         slidesToShow: 3,
  //         slidesToScroll: 1,
  //       },
  //     },
  //     {
  //       breakpoint: 1024, 
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 1,
  //         arrows: true,
  //       },
  //     },
  //     {
  //       breakpoint: 768, 
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 1,
  //       },
  //     },
  //     {
  //       breakpoint: 480, 
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //       },
  //     },
  //   ],
  // };

  @ViewChild('slickTestimonialModal', { static: false })
  slickTestimonialModal: SlickCarouselComponent;
  public testimonialConfig = {
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    loop:true,
    prevArrow: '<button class="slick-prev">></button>',
    nextArrow: '<button class="slick-next"><</button>',
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
  

  @ViewChild('citySlickSlider', { static: false })
  citySlickSlider: SlickCarouselComponent;
  public cityConfig = {
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: '<button class="slick-prev">></button>',
    nextArrow: '<button class="slick-next"><</button>',
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
    prevArrow: '<button class="slick-prev">></button>',
    nextArrow: '<button class="slick-next"><</button>',
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
    prevArrow: '<button class="slick-prev">></button>',
    nextArrow: '<button class="slick-next"><</button>',
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



  // nextTestimonial() {
  //   this.slickTestimonialModal.slickNext();
  // }

  // prevTestimonial() {
  //   this.slickTestimonialModal.slickPrev();
  // }

  constructor(
    private router: Router,
    public viewContainerRef: ViewContainerRef,
    private titleService: Title,
    private elementRef: ElementRef,
    private metaService: Meta,
    private ngZone: NgZone,
    private spaceService: SpaceService,
    @Inject(PLATFORM_ID) private platformId: any,
    private toastr: ToastrService
  ) {
    this.titleService.setTitle(
      `One Stop Shop For Coworking Spaces | Flexible and Shared Offices`
    );
    this.metaService.updateTag({
      name: 'description',
      content: `Flexo™ is your one stop shop for coworking spaces and shared offices. Use our free service to find your perfect office now. We are flexible office space experts. `,
    });
    this.metaService.updateTag({
      name: 'keywords',
      content: ``,
    });
  }

  ngOnInit() {

    if (isPlatformBrowser(this.platformId)) {
      this.startCarousel();
      this.getCoords();
      this.getSpacecategory();
      if (window.innerWidth < 500) {
        this.isMobile = true;
      }
      this.workspace_type = 0;
      this.geolocate();

      this.filteredPlaces = this.control.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );

      this.filteredPlaces.subscribe(data => console.log('Filtered places:', data));
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId); // Cleanup on component destroy
  }

  startCarousel(): void {
    this.intervalId = setInterval(() => {
      // Step 1: Trigger text fade-out
      this.isTextFadingOut = true;

      // Step 2: Wait for textDelay before updating text
      setTimeout(() => {
        this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
        this.isTextFadingOut = false;
      }, this.textDelay);

      // Step 3: Update image index after full duration
      this.currentImageIndex = (this.currentImageIndex + 1) % this.backgrounds.length;
    }, this.imageDuration);
  }

  getSpacecategory() {
    this.spaceService.getSpaceCategory().subscribe((res: any) => {
      this.spaces = res;
      console.log(this.spaces)
    })
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
    this.searchTerm = value.toLowerCase().trim().replace(/\s/g, '');
    this.filterLocations();
  }

  filterLocations() {
    if (this.searchTerm) {
      this.filteredPlaces = this.locations.filter(val =>
        val.toLowerCase().startsWith(this.searchTerm[0])
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
      segments.push({ text: value.substring(index, index + searchTermLower?.length
), highlight: true });
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
    this.spaceService.getAllLocations2(spaceType).subscribe((res: any) => {
      this.filteredPlaces = res.map((location: any) => location.label);
      this.locationObj = res;
      this.locations = res.map((location: any) => location.label);
    })
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

    // if ((this.spaceType == 'coworking space')) {
    //   url = `in/${this.spaceType}/` + `${(this.city).replace(' ', '-').toLowerCase()}`;

    // } else if ((this.spaceType == 'coworking cafe/restaurant') || (this.spaceType == 'shoot studio') || (this.spaceType == 'recording studio') || (this.spaceType == 'podcast studio') || (this.spaceType == 'activity space') || (this.spaceType == 'sports turf') || (this.spaceType == 'sports venue') || (this.spaceType == 'party space') || (this.spaceType == 'banquet hall') || (this.spaceType == 'gallery') || (this.spaceType == 'classroom') || (this.spaceType == 'private cabin') || (this.spaceType == 'meeting room') || (this.spaceType == 'training room') || (this.spaceType == 'event space')) {
    //   url = `in/${this.spaceType}/` + `${(this.city).replace(' ', '-').toLowerCase()}`;

    // } else if((this.spaceType == 'managed office' || this.spaceType == 'private office' || this.spaceType == 'shared office' || this.spaceType == 'virtual office')){

    // }
    if ((this.spaceType == 'coworking space')) {
      if(this.filteredPlaces.find(place => place.trim().endsWith('(City)'))){
        url = `in/coworking/` + `${(this.city).replace(' ', '-').toLowerCase()}`;
      }else{
        url = `in/coworking-space/` + `${(this.city).replace(' ', '-').toLowerCase() + '/' + this?.filteredPlaces.map(place => place.split(',')[0].trim()).join('-')}`;
      }
    }else {
      url = `in/${this.spaceType}/` + `${(this.city).replace(' ', '-').toLowerCase()}`;
    }
    console.log(url)
    // if (is_city) {
    // }else {
    // url = `in/coworking-space` + '/' + city_name + '/' + location_name;
    // }

    // //url change
    // if (city_name ==  'konkan-division' ) {
    //   url ='/in/coworking-space/' + city_Change + '/'+ location_name;
    // }

    // let area_param = location_name.toLowerCase();
    // let city_param = city_name.toLowerCase();
    // if (area_param && city_param) {
    //   area_param = area_param.replace(' ', '-');
    //   city_param = city_param.replace(' ', '-');
    // }
    // let area = area_param + ',' + city_param;
    // this.geocoder.geocode({ 'address': `${area}`, }, (results, status) => {
    //   if (status == google.maps.GeocoderStatus.OK) {
    //     let location = results[0].geometry.location;
    //     // this.area_lat = location.lat();
    //     // this.area_long = location.lng();
    //     localStorage.setItem('area_lat', `${location.lat()}`);
    //     localStorage.setItem('area_long', `${location.lng()}`);

    //   }
    // })
    // setTimeout(() => {
    // console.log({ url, query_params });
    this.router.navigate([this.formatUrl(url)]);
    // }, 500);
  }


  formatUrl(value: string): string {
    return value.trim()?.toLowerCase()?.replace(/\s+/g, '-');
  }

  onNearmeClicked() {
    this.spaceService.getCityInfo(this.user_lat, this.user_long).subscribe(
      (response) => {
        const { cityName, areaName } = response;

        this.router.navigate([`/in/spaces/`, cityName, areaName]);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onSpaceSearch() {
    this.spaceType
    // this.location

    // this.router.navigate([url], { queryParams: query_params });
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
}
