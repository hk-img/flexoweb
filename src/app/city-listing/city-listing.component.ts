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
  providers: [TitleCasePipe]
})
export class CityListingComponent implements OnInit {
  constructor(private titleService: Title){
    this.titleService.setTitle('Flexo Demo - City Listing');
  }
  ngOnInit(): void {
  }

}

