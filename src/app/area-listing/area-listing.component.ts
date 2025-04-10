import { animate, style, transition, trigger } from '@angular/animations';
import { isPlatformBrowser, TitleCasePipe } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  NgZone,
  OnInit,
  PLATFORM_ID,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import {
  MatLegacyDialog as MatDialog,
  MatLegacyDialogConfig as MatDialogConfig,
  MatLegacyDialogRef as MatDialogRef,
} from '@angular/material/legacy-dialog';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import * as _ from 'lodash';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

import { FavouriteWorkSpaceService } from '../favourite-workspace/favourite-workspace.service';
import { GlobalVariables } from '../global/global-variables';
import { LoginDialog } from '../login/login-dialog.component';
import { AppGlobals } from '../services/app-globals';
import { MemberService } from '../services/member.service';
import { SpaceService } from '../services/space.service';

// import { LoaderService } from '../services/loader.service';
declare let localStorage: any;

@Component({
  selector: 'app-area-listing',
  templateUrl: './area-listing.component.html',
  styleUrls: ['./area-listing.component.css'],
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
export class AreaListingComponent implements OnInit, AfterViewInit {
  _showMap: boolean = false;
  location: any;
  faqs = new BehaviorSubject([]);
  isFaqsVisible = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private spaceService: SpaceService,
    private titleService: Title,
    public login_dialogRef: MatDialogRef<any>,
    // private loaderService: LoaderService,
    public titleCasePipe: TitleCasePipe,
    public login_viewContainerRef: ViewContainerRef,
    public snackBar: MatSnackBar,
    private _memberService: MemberService,
    private metaService: Meta,
    public dialog: MatDialog,
    public viewContainerRef: ViewContainerRef,
    public login_dialog: MatDialog,
    private ngZone: NgZone,
    private cdRef: ChangeDetectorRef,
    private _appGlobals: AppGlobals,
    private favouriteWorkSpaceService: FavouriteWorkSpaceService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this._appGlobals.userDetails.subscribe((user_details) => {
      this.logged_in = user_details.is_logged_in;
      this.shortlists = user_details.shortlists;
    });
  }

  @ViewChild(MapInfoWindow, { static: false }) mapInfoWindow: MapInfoWindow;
  @ViewChild('mapMarker', { static: false }) mapMarker: MapMarker;
  // @ViewChild('autocomplete', { static: false }) autocompleteElement: ElementRef;
  // public autocomplete: google.maps.places.Autocomplete;
  public selected_marker_window;
  public center;
  public area_param;
  public logged_in;
  // public geocoder = new google.maps.Geocoder();
  public area_lat;
  public area_long;
  public user_lat;
  public user_long;
  public api_params: any = {};
  public space_count;
  public isMobile = false;
  public page = 1;
  public pages = [];
  public page_start = 1;

  public page_end;
  public spaces_list;
  public spaces_list_length;
  public total_pages;
  public active_page = 1;
  public price = null;
  public zoom = 12;
  public recommended_spaces;
  public page_size = 24;
  public area_name_for_find_near_me = null;
  public city_name_for_find_near_me = null;
  public city_param;
  public show_location_message = false;
  public shortlists = [];
  public shimming: boolean = true;
  public recommended_spaces_length;
  request = {};
  public options: google.maps.MapOptions = {
    scrollwheel: false,
    mapTypeControl: false,
    maxZoom: 15,
    minZoom: 9,
  };
  public filter = {
    capacity: null,
    distance: 5,
    type: null,
    min_price: null,
    max_price: null,
    amenities: [],
  };
  public resource_types = GlobalVariables.resource_types;
  public markersData = [];

  public aws_base_url =
    'https://s3.ap-south-1.amazonaws.com/' +
    environment.s3_bucket_path +
    '/details_images/';
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.user_lat = position.coords.latitude;
        this.user_long = position.coords.longitude;

        if (
          this.user_lat &&
          this.user_long &&
          !this.area_param &&
          !this.city_param
        ) {
          this.getNearBySpaces();
        }
        var self = {} as any;
        var location = new google.maps.LatLng(10.112293, 76.35268450000001);

        self.map = new google.maps.Map(document.getElementById('map'), {
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          center: location,
          zoom: 15,
        });
        this.location = new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );
        this.request = {
          location: this.location,
          radius: '5000',
          types: this.resource_types,
        };
        var service = new google.maps.places.PlacesService(self.map);
        service.nearbySearch(this.request, this.fetchedResult);
      });
    }
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.area_param = params.get('area');

      this.city_param = params.get('city');
      const changeTile = () => {
        // console.trace();
        const titleCase = (str) => str.replace(/\b\S/g, (t) => t.toUpperCase());

        const areaParam = titleCase(this.area_param);
        const cityParam = titleCase(this.city_param);
        // this.titleService.setTitle(
        //   `Coworking Spaces in ${areaParam.replaceAll(
        //     '-',
        //     ' '
        //   )} | Flexible Offices for Rent`
        // );
        this.titleService.setTitle(
          `Best Coworking Spaces in ${areaParam.replace(
            '-',
            ' '
          )}, ${cityParam} with Pricing | Flexible Offices - FLEXO`
        );
      };

      changeTile();

      // this.metaService.updateTag({
      //   name: 'description',
      //   content: `Find the best coworking space in ${this.area_param.replace(
      //     '-',
      //     ' '
      //   )}. Use our free service to explore options for shared offices and coworking spaces. Prime locations available. Contact Flexo(tm) - your office space expert. `,
      // });
      const titleCase = (str) => str.replace(/\b\S/g, (t) => t.toUpperCase());

      const areaParam = titleCase(this.area_param);
      const cityParam = titleCase(this.city_param);
      this.metaService.updateTag({
        name: 'description',
        content: `Find, compare and book coworking spaces in ${areaParam.replace(
          '-',
          ' '
        )}, ${cityParam}. View pricing, amenities and gallery. Get a FREE consultation from a coworking advisor today.`,
      });
      this.metaService.updateTag({
        name: 'keywords',
        content: ``,
      });
    });

    if (this.area_param && this.city_param) {
      this.area_param = this.area_param.replace(' ', '-');
      this.city_param = this.city_param.replace(' ', '-');
    }
    if (
      !this.area_param &&
      !this.city_param &&
      !this.user_lat &&
      !this.user_long
    ) {
      this.show_location_message = true;
    }
    if (isPlatformBrowser(this.platformId)) {
    if (window.innerWidth < 700) {
      this.isMobile = true;
    }
  }
    this.zoom = 13;
    // this.populateData();
    // this.area_long = Number(localStorage.getItem('area_long'));
    // this.area_lat = Number(localStorage.getItem('area_lat'));
    // this.geocode();
    // this.geocoder = new google.maps.Geocoder();
    this.geocode();
    if (isPlatformBrowser(this.platformId)) {
    }
  }

  fetchedResult(results, status) { }
  openMapInfoWindow(mapMarker: MapMarker, marker_info) {
    this.selected_marker_window = marker_info;
    this.mapInfoWindow.open(mapMarker);
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
    }

    // this.initAutocomplete();
  }

  getNearBySpaces() {
    const location = `${this.user_lat},${this.user_long}`;
    this.spaceService
      .getNearbySpaces('co-working space', location, 5000, 'property')
      .subscribe(
        (response) => { },
        (error) => { }
      );
  }

  geocode() {
    let area = this.area_param + ',' + this.city_param;
    // this.geocoder.geocode({ address: `${area}` }, (results, status) => {
    //   if (status == google.maps.GeocoderStatus.OK) {
    //     let location = results[0].geometry.location;
    //     this.area_lat = location.lat();
    //     this.area_long = location.lng();
    //     if (!this.area_param && !this.city_param) {
    //       this.center = {
    //         lat: parseFloat(this.user_lat),
    //         lng: parseFloat(this.user_long),
    //       };
    //     } else {
    //       this.center = {
    //         lat: this.area_lat,
    //         lng: this.area_long,
    //       };
    //     }
    //     this.populateData();
    //   }
    // });
    this.spaceService.getLatlong(area).then((res) => {
      if (res.results) {
        let location = res?.results[0]?.geometry?.location;
        this.area_lat = location.lat;
        this.area_long = location.lng;
        if (!this.area_param && !this.city_param) {
          this.center = {
            lat: parseFloat(this.user_lat),
            lng: parseFloat(this.user_long),
          };
        } else {
          this.center = {
            lat: this.area_lat,
            lng: this.area_long,
          };
        }
        this.populateData();
      }
    });
    if (
      this.area_lat &&
      this.area_lat !== undefined &&
      this.area_long &&
      this.area_long !== undefined
    ) {
      this.populateData();
    }
  }

  filters() {
    // this.populateData();
  }

  openFiltersDialog(obj) {
    this.filter = obj.filter;
    // this.populateData();
  }

  formatLabel(value: number) {
    return value;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  shortList(obj) {
    if (isPlatformBrowser(this.platformId)) {
      let isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn')) || null;
    if (isLoggedIn /* this.logged_in */) {
      this.addRemoveFavorite(obj.id);
      this._memberService.addShortlists(obj.id).then((data) => {
        this.openSnackBar(data.message, 'Dismiss');
      });
      if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        window.location.reload()
      }, 1000);
    }
    } else {
      this.openLoginDialog();
    }
  }
  }

  addRemoveFavorite(space_id){
    this.favouriteWorkSpaceService.addRemoveFavouriteWorkSpace(space_id).subscribe((result: any) => {
    }, error => { 
    })
  }

  showHideMap(e: any) {
    this._showMap = e;
  }
  populateData = () => {
    let params = {};
    let area_long = this.area_long;
    let area_lat = this.area_lat;
    // let area_long = 72.9059747
    // let area_lat = 19.1175993
    //     let area_long = 72.8295287
    // let area_lat = 19.0595596
    if (!this.area_param && !this.city_param) {
      this.center = {
        lat: parseFloat(this.user_lat),
        lng: parseFloat(this.user_long),
      };
    } else {
      this.center = {
        lat: area_lat,
        lng: area_long,
      };
    }
    if (this.area_param && this.city_param) {
      params = { area_lat, area_long };
    }
    if (
      this.user_lat &&
      this.user_long &&
      !this.area_param &&
      !this.city_param
    ) {
      params = { user_lat: this.user_lat, user_long: this.user_long };
      this.titleService.setTitle(`Coworking Spaces near you`);
    }
    _.extend(params, this.filter);

    this.api_params = Object.assign({}, params);
    this.ngZone.run(() => this.populateAreaSpaces());
    // if (this.area_lat && this.area_long) {
    // this.populateAreaSpaces();
    // }
  };

  populateAreaSpaces() {
    _.extend(this.api_params, this.filter);
    this.spaceService.getInRadius(this.api_params, this.page).then((res) => {
      // window.scrollTo(0, 0);

      // this.faqs.next(res.faqs || []);
      this.spaces_list = Object.assign([], res.data);
      this.recommended_spaces = Object.assign([], res.recommended_spaces);

      this.space_count = res.space_count;
      this.spaces_list_length = this.spaces_list.length;
      if (this.spaces_list_length) {
        this.page_end =
          this.space_count < this.page_size * this.page
            ? this.space_count
            : this.page_size * this.page;
        this.total_pages =
          this.space_count % 2 == 0
            ? this.space_count / this.page_size
            : Math.floor(this.space_count / this.page_size) + 1;
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
          let obj = {
            position: {
              lat: element.lat,
              lng: element.longi,
            },
            title: element.name,
            options: { draggable: false, icon: 'assets/images/marker1.svg' },
            info: {
              map_image_url:
                this.aws_base_url + element.id + '/' + element.images[0],
              name: element.name,
              url: '/coworking-space/' + element.link_name,
            },
          };
          this.markersData.push(obj);
        });
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

    // this.spaceService
    //   .getQuestionByRadius(
    //     this.api_params.area_lat || this.api_params.user_lat,

    //     this.api_params.area_long || this.api_params.user_long
    //   )
    //   .subscribe(
    //     (response) => {
    //
    //       this.faqs.next(response || []);
    //     },
    //     ({ err }) => {
    //
    //     }
    //   );

    this.spaceService.getQuestionByLocationName(this.area_param).subscribe(
      (response) => {
        // this.faqs.next(response || []);
      },
      ({ message }) => { }
    );
  }

  pagination(num) {
    this.page_start = num * this.page_size - (this.page_size - 1);
    this.page_end =
      this.space_count < num * this.page_size
        ? this.space_count
        : num * this.page_size;
    this.active_page = num;
    this.page = num;
    if (isPlatformBrowser(this.platformId)) {
    window.scrollTo(0, 0);
    }
    this.populateData();
  }
  onIntersection(e) {
    this.isFaqsVisible = e.visible;
  }

  openLoginDialog() {
    let config = new MatDialogConfig();
    config.viewContainerRef = this.login_viewContainerRef;
    config.panelClass = 'dialogClass';
    config.width = '380px';

    this.login_dialogRef = this.login_dialog.open(LoginDialog, config);
    this.login_dialogRef.componentInstance.flag = 1;
    this.login_dialogRef.componentInstance.ref = this.login_dialogRef;
    this.login_dialogRef.afterClosed().subscribe((result) => {
      if (result && result.success) {
        window.location.reload();
      }
      this.login_dialogRef = null;
    });
  }
}
