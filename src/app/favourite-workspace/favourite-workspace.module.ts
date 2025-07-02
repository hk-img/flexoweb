import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavouriteWorkSpaceComponent } from './favourite-workspace.component';
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
import { FilterItemModule } from '../shared/component/filter-item/filter-item.module';
import { FilterDialog } from '../shared/component/filter-component/filter-dialog.component';
import { SharedModule } from '../shared/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ShimmerLoadingComponent } from '../shared/component/shimmer-loading/shimmer-loading.component';

const routes: Routes = [
  { path: '', component: FavouriteWorkSpaceComponent },
];

@NgModule({
    declarations: [FavouriteWorkSpaceComponent],
    imports: [
        CommonModule,
        FormsModule,
        SlickCarouselModule,
        MatInputModule,
        MatDialogModule,
        MatSnackBarModule,
        RouterModule.forChild(routes),
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
    ],
    providers: []
})
export class FavouriteWorkSpaceModule {}
