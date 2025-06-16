import { isPlatformBrowser, TitleCasePipe } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Inject, Input, OnInit, Output, PLATFORM_ID, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatLegacyDialog as MatDialog, MatLegacyDialogConfig as MatDialogConfig, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { map, startWith } from 'rxjs/operators';
import { GlobalVariables } from 'src/app/global/global-variables';
import { SpaceService } from 'src/app/services/space.service';
import { environment } from '../../../../environments/environment';
import { FilterDialog } from '../filter-component/filter-dialog.component';
import { CityListingComponent } from 'src/app/city-listing/city-listing.component';

@Component({
  selector: 'filter-item',
  templateUrl: './filter-item.component.html',
  styleUrls: ['./filter-item.component.css'],
  providers: [TitleCasePipe]
})
export class FilterItemComponent implements OnInit {
  _showMap: boolean = false;
  showCard = false;
  @Output() showMap = new EventEmitter<boolean>(false);
  @ViewChild('selectedValueDiv') selectedValueDiv: ElementRef | undefined;
  clickListener: any;
  @Input() nearByLocations: Observable<any>;
  nearByLocationsList: any = [];
  public loadAPI: Promise<any>;
  public aws_base_url =
    'https://s3.ap-south-1.amazonaws.com/' +
    environment.s3_bucket_path +
    '/details_images/';
  public schema: any;
  user_lat: number;
  user_long: number;
  webDomain = environment.webDomain;
  currentUrl: string = '';
  searchCoworking: string = 'coworking';
  isCoworkingInURL: boolean = false;
  type: string;
  show=true
  nearByLocation: string;
  spaceType: string;

  constructor(
    public login_dialogRef: MatDialogRef<any>,
    private router: Router,
    public login_dialog: MatDialog,
    public login_viewContainerRef: ViewContainerRef,
    private route: ActivatedRoute,
    private _router: Router,
    private spaceService: SpaceService,
    private fb: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: any,
    private elRef: ElementRef,
    private titleCasePipe: TitleCasePipe,
    private snackBar : MatSnackBar,
    private cityListing: CityListingComponent
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.clickListener = (event: Event) => this.onClick(event);
      document.addEventListener('click', this.clickListener);
    }
  }

  @HostListener('click', ['$event'])
  onClick(event: Event): void {
    if (this.selectedValueDiv && !this.selectedValueDiv.nativeElement.contains(event.target)) {
      this.showCard = false
    }
  }
  @ViewChild('autocomplete', { static: false }) autocompleteElement: ElementRef;
  public autocomplete: google.maps.places.Autocomplete;
  @Input() isMobile: boolean;
  @Input() filter;
  @Input() area_name;
  @Input() city_name;
  @Input() find_near_me;
  @Input() is_city: boolean;
  cityName: any;
  areaName: any;
  public city_name_display = '';
  public area_name_display = '';
  private getCityAndLocationDetails = GlobalVariables.getCityAndLocationDetails;
  public open_location: boolean = false;
  open_spaceType: boolean = false;
  nearBySpaces: any[] = [];
  @Output() filterItemEvent = new EventEmitter<any>();
  locations: string[] = [];
  control = new FormControl(localStorage.getItem("location"));
  filteredPlaces: any;
  location_name: any;
  cityId: any;
  location: any;
  locationObj: any=[];
  getLocationObjForSearch: any;
  spaces = [];
  filteredSpaces: any = [];
  url: any;
  lat: any;
  long: any;
  searchTerm: string;
  params: any;
  filteredSpacesByLocations: any;

  getOriginalUrlParam(value: string): string {
    return value?.replace(/-/g, ' ')?.replace(/\b\w/g, char => char?.toLowerCase());
  }

  getOriginalCityName(city: string): string {
    switch (city?.toLowerCase()) {
      case 'delhi': return 'delhi';
      case 'bangalore': return 'Bengaluru';
      default: return this.getOriginalUrlParam(city);
    }
  }



  ngOnInit(): void {
    this.lat = localStorage.getItem('lat');
    this.long = localStorage.getItem('long');
    this.getCoords();
    localStorage.setItem("city_name", this.city_name);
    this.city_name_display = this.city_name?.charAt(0)?.toUpperCase() + this.city_name?.slice(1);
    this.area_name_display = this.area_name.charAt(0).toUpperCase() + this.area_name?.slice(1);
    this.city_name_display = this.city_name_display?.replace(/-/g, ' ');
    this.area_name_display = this.area_name_display?.replace(/-/g, ' ');

    if (window.innerWidth < 700) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }

    setTimeout(() => {
      this.schema = {
        '@context': 'http://schema.org',
        '@type': 'CoWorking Spaces',
        'name': `${'Coworking spaces in' + (this.area_name_display === '0' ? '' : (' ' + this.area_name_display)) + ' ' + this.city_name_display}`,
        'telephone': `Call +91 95133 92400`,
        'url': `${'https://www.flexospaces.com' + this._router.url}`
      }
    }, );

    this.filteredPlaces = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    // this.filteredPlaces.subscribe(data => console.log('Filtered places:', data));
    
    this.route.params.subscribe({
      next: (params) => {
        this.cityName = this.getOriginalCityName(params['city']);
        this.spaceType = params['spaceType'] === "coworking" ? 'coworking space' : this.getOriginalUrlParam(params['spaceType']);
        this.nearByLocation = this.getOriginalUrlParam(params['area']);
      }
    });
    this.getSpaces();
    if(this.cityName){
      this.getNearByLocations()
    }
    if(this.nearByLocation){
      this.control.setValue(localStorage.getItem("areaLocation") ?? localStorage.getItem("location"))
    }
    
  }

  staticSpaces = [{
    spaceType: 'Co-working',
    subpart: [
      { spaceType: 'Private Office', selected: false },
      { spaceType: 'Managed Office', selected: false },
      { spaceType: 'Dedicated Desk', selected: false },
      { spaceType: 'Flexible Desk', selected: false },
      { spaceType: 'Virtual Office', selected: false },
      { spaceType: 'Day Pass', selected: false }
    ]
  }]

  getSpaces() {
    this.spaceService
      .getSpaceCategory()
      .subscribe((res: any) => {
        const updatedRes = res.filter(val => val.spaceType?.toLowerCase() !== "coworking space")
        this.spaces = [...this.staticSpaces, ...updatedRes];
        this.selectedValues = this.spaces[0]?.subpart?.map(sub => sub.spaceType);
        if (this.spaceType?.toLowerCase() === "coworking space") {
          const newArr = this.staticSpaces.map(space => ({
            ...space,
            subpart: space.subpart.map(sub => ({
              ...sub,
              selected: true
            }))
          }));
          this.spaces = [...newArr, ...updatedRes]
          this.selectedRadio = this.titleCasePipe.transform(this.spaceType)
        }
        this.selectedRadio = this.spaceType?.toLowerCase() === "coworking space" ? "Co-working" : this.titleCasePipe.transform(this.spaceType)
        let spaceType = this.selectedRadio === 'Co-working' ? "Coworking Space" : this.selectedRadio
        this.getAllLocation(spaceType)
        // this.getNearByLocations()
        
        
        
        this.currentUrl = this.router.url;
        this.isCoworkingInURL = this.currentUrl.includes(this.searchCoworking);
        
        if (this.isCoworkingInURL) {
          
          this.filteredSpaces = this.spaces
          .filter(option => (option?.value === this.spaceType && option?.type === 'Co-working'))
          .map(option => option.name);
        } else if (this.spaceType === 'CoworkingSpace') {
          this.filteredSpaces = this.spaces
          .filter(option => option?.type === 'Co-working')
          .map(option => option.name);
        } else {
          this.filteredSpaces = this.spaces
          .filter(option => option?.value === this.spaceType)
          .map(option => option.name);
        }
      });
      // this.onSelectionChange()
    }
    
  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    this.filteredPlaces = this.locations?.filter(street => this._normalizeValue(street).includes(filterValue));
    return this.filteredPlaces;
  }

  private _normalizeValue(value: string): string {
    return value?.toLowerCase()?.replace(/\s/g, '');
  }

  onInputChange(value: string) {
    this.searchTerm = value?.toLowerCase()?.trim()?.replace(/\s/g, '');
    this.filteredPlaces = this.locations?.filter(street => this._normalizeValue(street).includes(this.searchTerm));
    this.filterLocations();
  }

  filterLocations() {
    if (this.searchTerm) {
      this.filteredPlaces = this.locations.filter(val =>
        val.toLowerCase().startsWith(this.searchTerm)
      );
    }
  }

  getCoords() {
    if (isPlatformBrowser(this.platformId)) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.user_lat = position.coords.latitude;
        this.user_long = position.coords.longitude;
      });
    }
  }

  // getLocationValue(event: any) {
  
    // this.show = true
    // localStorage.setItem("areaLocation", event.option.value)
    //   this.locationObj.filter((place: any) => {
    //     if (place.label === this.location) {
    //       this.getLocationObjForSearch = place;
    //       this.lat = place.lat;
    //       this.long = place.long;
    //     }
    //   })
    

    //   this.getNearByLocations(true)
    // this.filteredSpaces = this.selectedValues.length ? this.selectedValues : [this.selectedRadio];
    //   this.getParams();
      
   
    

      // this.spaceService.getSpacesFilter(this.params).subscribe((res: any) => {
        
      //   this.spaceService.sendFilteredSpace(res.data);
      // })
      
  // }


  getLocationValue(event: any) {
    localStorage.removeItem("locationLat")
    localStorage.removeItem("locationLong")
    localStorage.setItem("location", event.option.value)
    const selected = this.locationObj.find(val => val.label === event.option.value)
    localStorage.setItem("lat", selected.lat)
    localStorage.setItem("long", selected.long)
    let url;
    const splitLocation = event.option.value.split(",");
    const location = splitLocation.at(-3)?.trim();
    const location_name = splitLocation.at(-4)?.trim();
    const spaceType = this.selectedRadio === null ? 'coworking space' : this.selectedRadio === 'Co-working' ? 
    'coworking space' : this.selectedRadio?.toLowerCase();
    
    if (!location) {
      console.error("Location is undefined or invalid");
      return;
    }
    if (spaceType === 'coworking space' && !location_name) {
      url = `in/${spaceType}/${location?.replace(' ', '-')?.toLowerCase()}`;
    }else if (spaceType === 'coworking space' && location_name){
      url = `in/${spaceType}/${location?.replace(' ', '-')?.toLowerCase()}/${location_name}`;
    } else if (['shoot studio', 'recording studio', 'podcast studio', 'activity space',
      'sports turf', 'sports venue', 'party space', 'banquet hall', 'gallery',
      'classroom', 'private cabin', 'meeting room', 'training room', 'event space'
    ].includes(spaceType)) {
      if(location_name){
        url = `in/${spaceType}/${location?.replace(' ', '-')?.toLowerCase()}/${location_name}`;
      }else{
        url = `in/${spaceType}/${location?.replace(' ', '-')?.toLowerCase()}`;
      }
    } else if ([
      'managed office', 'private office', 'shared office', 'virtual office'
    ].includes(spaceType)) {
      if(location_name){
        url = `in/${spaceType}/${location?.replace(' ', '-')?.toLowerCase()}/${location_name}`;
      }else{
        url = `in/${spaceType}/${location?.replace(' ', '-')?.toLowerCase()}`
      }
    } else if(['coworking café/restaurant'].includes(spaceType)){
      url = `in/coworking-cafe-restaurant/${location?.replace(' ', '-')?.toLowerCase()}`
    }

    if (url) {
      this.router.navigate([this.formatUrl(url)]);
    } else {
      console.error("URL was not properly constructed");
    }
  }



  

  onSelectionChange(nearMe?:boolean) {
    this.filteredSpaces = this.selectedValues.length ? this.selectedValues : [this.selectedRadio];
    this.getParams(nearMe);
    this.spaceService.getSpacesFilter(this.params).subscribe((res: any) => {
      this.spaceService.sendFilteredSpace(res.data);
    })


    if (isPlatformBrowser(this.platformId)) {
      if ((this.spaceType == 'coworking') || (this.spaceType == 'privateoffice') || (this.spaceType == 'managedoffice') || (this.spaceType == 'dedicateddesk') || (this.spaceType == 'flexibledesk') || (this.spaceType == 'virtualoffice') || (this.spaceType == 'daypass')) {
        sessionStorage.setItem('isCoworking', 'true');

      } else {
        sessionStorage.setItem('isCoworking', 'false');
      }
    }
  }

  shouldDisable(item: any): boolean {
    const anyItemSelected = this.filteredSpaces.length > 0;

    if (item.type === 'Co-working') {
      return false;
    }

    return anyItemSelected && !this.filteredSpaces.includes(item.name);
  }

  getParams(nearMe?:boolean) {
    if ((this.selectedRadio?.toLowerCase() == 'coworking space')) {
      this.type = "coworking";
    } else if ((this.selectedRadio?.toLowerCase() == 'coworking-café') || (this.selectedRadio?.toLowerCase() == 'shoot studio') || (this.selectedRadio?.toLowerCase() == 'recording studio') || (this.selectedRadio?.toLowerCase() == 'podcast studio') || (this.selectedRadio?.toLowerCase() == 'activity space') || (this.selectedRadio?.toLowerCase() == 'sports turf') || (this.selectedRadio?.toLowerCase() == 'sports venue') || (this.selectedRadio?.toLowerCase() == 'party space') || (this.selectedRadio?.toLowerCase() == 'banquet hall') || (this.selectedRadio?.toLowerCase() == 'gallery') || (this.selectedRadio?.toLowerCase() == 'classroom') || (this.selectedRadio?.toLowerCase() == 'private cabin') || (this.selectedRadio?.toLowerCase() == 'meeting room') || (this.selectedRadio?.toLowerCase() == 'training room') || (this.selectedRadio?.toLowerCase() == 'event space')) {
      this.type = "shortterm";
    } else if ((this.selectedRadio?.toLowerCase() == 'managed office' || this.selectedRadio?.toLowerCase() == 'private office' || this.selectedRadio?.toLowerCase() == 'shared office' || this.selectedRadio?.toLowerCase() == 'virtual office')) {
      this.type = "longterm";
    }
    else {
      this.type = "coworking";
    }
    
    this.params = {
      location_name: this.getLocationObjForSearch?.location_name || this.nearByLocation,
      city_name: this.getLocationObjForSearch?.city || localStorage.getItem("city_name"),
      spaceType: this.filteredSpaces || [],
      type: this.type,
      amenities: '',
      customer_rating: '',
      distance: nearMe ? 10 : '',
      price_range: '',
      city_lat: nearMe ? this.user_lat :  0,
      city_long: nearMe ? this.user_long : 0
      // city_lat: nearMe ? this.user_lat :  this.lat,
      // city_long: nearMe ? this.user_long : this.long
    }
 
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



  getAllLocation(spaceType: any) {
    this.spaceService.getAllLocations2(spaceType).subscribe((res: any) => {
      this.locationObj = res;
      this.locations = res.map((location: any) => location.label);
      this.filteredPlaces = this.locations
    })
  }

  getNearByLocations(isLocationChange?: boolean) {
    if (this.location) {
        var locationArray_ = this.location.split(",");
        var location_ = locationArray_.at(-3)?.trim();
    }

    // Mapping location to the desired format
    const mappedLocation = location_ === 'delhi' ? 'delhi' : location_ === 'bangalore' ? 'bengaluru' : location_;

    // Define subparts that can be selected
    const allSubParts = [
        'Private Office',
        'Managed Office',
        'Dedicated Desk',
        'Flexible Desk',
        'Virtual Office',
        'Day Pass'
    ];

    // Filter subparts to only include those present in selectedValues
    const subPart = allSubParts.filter(part => this.selectedValues.includes(part));

    // Prepare details object for the request
    const details = {
      cityId: isLocationChange ? mappedLocation : this.city_name_display,
      spaceType: (this.selectedRadio === "Co-working" || this.selectedValues.length) 
    ? "coworking space" 
    : (this.selectedRadio || this.spaceType)
}

    // Call service to get nearby spaces
    this.spaceService.getNearBySpaces(details).subscribe(
        (response) => {
            this.nearByLocationsList = response.map((val) => {
                return {
                    ...val,
                    city: details.cityId,
                    type: this.type
                }
            });
            // Update the city_name_display based on location change
            this.city_name_display = isLocationChange ? this.location.split(",").at(-3)?.trim() : this.cityName;
        },
        ({ message }) => {
            // Handle error (if needed)
        }
    );
}


  onSearchSubmit(is_near_me_selected) {
    let query_params = {};
    let location_name = '';
    let city_name = '';
    let is_city = false;
    let address_components =
      (this.autocomplete &&
        this.autocomplete.getPlace() &&
        this.autocomplete.getPlace().address_components) ||
      [];

    if (!is_near_me_selected && address_components.length) {
      // route_params += place_data.address_components[0].long_name + '-';
      let address_details = this.getCityAndLocationDetails(address_components);
      is_city = address_details.is_city;
      location_name = address_details.location_name.split(' ').join('-');
      city_name = address_details.city_name.split(' ').join('-');
      // let area_lat = place_data.geometry.location.lat();
      // let area_long = place_data.geometry.location.lng();
      // query_params = {};
      // let area_name = place_data.address_components[0].long_name;
    }

    if (is_near_me_selected) {
      query_params = { ...query_params, find_near_me: true };
    }

    let url = '';
    if (is_city) {
      url = 'in/coworking/' + city_name?.toLowerCase();
    } else {
      url =
        'in/coworking-space' +
        '/' +
        city_name?.toLowerCase() +
        '/' +
        location_name?.toLowerCase();
    }

    this.router.navigate([url], { queryParams: query_params });
    //   }
    // })
  }

  openLocation() {
    this.open_location = this.open_location ? false : true;
    sessionStorage.setItem('open_location', this.open_location.toString());
  }

  openSpaceType() {
    this.open_spaceType = this.open_spaceType ? false : true;
    sessionStorage.setItem('open_spaceType', this.open_spaceType.toString());
  }

  showHideMap() {
    this.showMap.emit(this._showMap);
  }

  openFiltersDialog() {
    let type = this.getType(this.router.url.split("/")[2]) 
    let config = new MatDialogConfig();
    config.viewContainerRef = this.login_viewContainerRef;
    config.panelClass = 'dialogClass';
    config.width = '100%';
    config.maxWidth = '40vw';
    config.data = {type};
    if (this.isMobile) {
      config.height = '100%';
    } else {
      config.height = '90%';
    }

    this.login_dialogRef = this.login_dialog.open(FilterDialog, config);
    this.login_dialogRef.componentInstance.ref = this.login_dialogRef;
    this.login_dialogRef.componentInstance.filter = this.filter;
    this.login_dialogRef.componentInstance.isMobile = this.isMobile;
    this.login_dialogRef.componentInstance.is_city = this.is_city;
    this.login_dialogRef.afterClosed().subscribe((result) => {
      if (result && result.success) {
        this.filter = result.filter;
        this.getParams();

        // this.filter.city_name = this.params?.city_name;
        // this.filter.location_name = this.params?.location_name;
        // this.filter.type = this.params?.type;
        this.filter.city_lat = localStorage.getItem("locationLat") ?? 0;
        this.filter.city_long = localStorage.getItem("locationLat") ?? 0;
        
        this.params.amenities = this.filter?.amenities;
        this.params.distance = this.filter?.distance;
        // this.params.customer_rating = this.filter?.customer_rating;
        this.params.spaceType = [this.spaceType];
        this.params.min_price = this.filter?.min_price;
        this.params.max_price = this.filter?.max_price;
        this.params.sortBy = this.filter.priceSort;
        this.filterItemEvent.emit({ filter: this.params });
      }
      this.login_dialogRef = null;
    });
  }

  // popupOpen(category,title1): void {
  //   let payload = {
  //       component: "favourite-workspace",
  //       title: title1,
  //       category: category,
  //       message: 'Are you sure you want to Unfavourite this workspace?'
  //   }
  //   this.dialog.open(ThankyopopupComponent, { data: payload ,width: '500px'});
  // }

  returnSpaceName(space) {
    return space?.location_name?.replace(' ', '-')?.toLowerCase();
  }

  onNearmeClicked() {
    if(this.user_lat && this.user_long){
      this.onSelectionChange(true)
      localStorage.setItem("locationLat", String(this.user_lat))
      localStorage.setItem("locationLong", String(this.user_long))
    } else {
      this.openSnackBar("You did't allow your location.")
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, "Dismiss", {
      duration: 5000,
    });
  }

  public replaceSpace(location: string) {
    var url = location?.toLowerCase()?.split(' ')?.join('-');
    return url;
  }


  selectedValues: string[] = [];
  selectedRadio: string | null = null;



  onRadioChange(selectedList: any) {
    this.selectedValues = [];
    this.selectedRadio = selectedList.spaceType;
    if (selectedList.subpart) {
      selectedList.subpart.forEach(item => {
        item.selected = true;
        this.selectedValues.push(item.spaceType);
      });
    }
    this.spaces.forEach(list => {
      if (list !== selectedList && list.subpart) {
        list.subpart.forEach(item => {
          item.selected = false;
        });
      }
    });
    this.show = false
    this.control.setValue("")
    // this.onSelectionChange()
    let spaceType = this.selectedRadio === 'Co-working' ? "Coworking Space" : this.selectedRadio
    this.getAllLocation(spaceType)
    this.getNearByLocations()
  }

  onCheckboxChange(item: any, listValue: string) {
    item.selected = !item.selected;
    if (item.selected) {
      if (!this.selectedValues.includes(item.spaceType)) {
        this.selectedValues.push(item.spaceType);
      }
    } else {
      this.selectedValues = this.selectedValues.filter(val => val !== item.spaceType);
    }
    sessionStorage.setItem('selectedValues', JSON.stringify(this.selectedValues));
    this.cityListing.getSpacesByCity();
    const coWorkingList = this.spaces.find(p => p.spaceType === 'Co-working');
    if (coWorkingList) {
      const allSubpartsSelected = coWorkingList.subpart.every(sub => sub.selected);
      if (allSubpartsSelected) {
        this.selectedRadio = 'Co-working';
      }
    }
    this.show =false
    this.control.setValue("")
    // this.onSelectionChange()
    this.getAllLocation("Coworking Space")
    this.getNearByLocations()

  }
  formatUrl(value: string): string {
    return value?.trim()?.toLowerCase().replace(/\s+/g, '-');
  }

  openNearByList(list:any){
    window.open(
      `in/${this.formatUrl(list.spaceType)}/${this.formatUrl(list.city)}/${this.formatUrl(list.location_name)}`,
      '_blank'
    );
  }



  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      document.removeEventListener('click', this.clickListener);
      let arr = ["areaLocation"]
      for (let index = 0; index < arr.length; index++) {
        localStorage.removeItem(arr[index])
      }
    }
  }
}
