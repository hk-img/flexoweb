import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AreaListingRoutingModule } from './area-listing-routing.module';
import { AreaListingComponent } from './area-listing.component';
import { LoginDialog } from '../login/login-dialog.component';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule, GoogleMap } from '@angular/google-maps';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacySliderModule as MatSliderModule } from '@angular/material/legacy-slider';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { ListItemModule } from '../shared/component/list-item/list-item.module';
import { FilterDialog } from '../shared/component/filter-component/filter-dialog.component';
import { FilterItemModule } from '../shared/component/filter-item/filter-item.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SharedModule } from '../shared/shared/shared.module';
import { ShimmerLoadingComponent } from '../shared/component/shimmer-loading/shimmer-loading.component';

@NgModule({
    declarations: [AreaListingComponent],
    imports: [
        CommonModule,
        AreaListingRoutingModule,
        GoogleMapsModule,
        FormsModule,
        MatSliderModule,
        ReactiveFormsModule,
        MatSelectModule,
        FilterItemModule,
        MatSlideToggleModule,
        MatInputModule,
        ShimmerLoadingComponent,
        MatDialogModule,
        MatSnackBarModule,
        MatFormFieldModule,
        ListItemModule,
        SlickCarouselModule,
        SharedModule,
    ]
})
export class AreaListingModule {}
