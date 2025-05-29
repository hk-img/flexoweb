import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { MatLegacySliderModule as MatSliderModule } from '@angular/material/legacy-slider';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { DetailsComponent } from '../details/details.component';
import { InquiryComponent } from '../details/inquiry/inquiry.component';
import { LoginDialog } from '../login/login-dialog.component';
import { FilterItemModule } from '../shared/component/filter-item/filter-item.module';
import { ListItemModule } from '../shared/component/list-item/list-item.module';
import { ShimmerLoadingComponent } from '../shared/component/shimmer-loading/shimmer-loading.component';
import { SharedModule } from '../shared/shared/shared.module';
import { CityListingRoutingModule } from './city-listing-routing.module';
import { CityListingComponent } from './city-listing.component';

@NgModule({
    declarations: [CityListingComponent, LoginDialog],
    imports: [
        NgSelectModule,
        CommonModule,
        GoogleSigninButtonModule,
        FormsModule,
        MatInputModule,
        MatDialogModule,
        MatSnackBarModule,
        CityListingRoutingModule,
        GoogleMapsModule,
        ReactiveFormsModule,
        ShimmerLoadingComponent,
        MatFormFieldModule,
        MatSliderModule,
        MatSelectModule,
        MatSlideToggleModule,
        ListItemModule,
        FilterItemModule,
        SharedModule,
        NgxIntlTelInputModule,
        NgSelectModule,
        NgSelectModule,
        MatProgressSpinnerModule,
        SlickCarouselModule
    ],
    providers: [InquiryComponent,DetailsComponent]
})
export class CityListingModule {}
