import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileManagementComponent } from './profile-management.component';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule, GoogleMap } from '@angular/google-maps';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacySliderModule as MatSliderModule } from '@angular/material/legacy-slider';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ListItemModule } from '../shared/component/list-item/list-item.module';
import { FilterItemModule } from '../shared/component/filter-item/filter-item.module';
import { FilterDialog } from '../shared/component/filter-component/filter-dialog.component';
import { SharedModule } from '../shared/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../services/auth.guard';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { ShimmerLoadingComponent } from '../shared/component/shimmer-loading/shimmer-loading.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

const routes:Routes = [
    {
        path: '',
        component: ProfileManagementComponent,
        canActivate: [AuthGuard],
    },
]

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
    declarations: [ProfileManagementComponent],
    imports: [
        CommonModule,
        FormsModule,
        MatInputModule,
        MatDialogModule,
        MatSnackBarModule,
        GoogleMapsModule,
        ReactiveFormsModule,
        ShimmerLoadingComponent,
        MatFormFieldModule,
        MatSliderModule,
        MatSelectModule,
        MatSlideToggleModule,
        NgxIntlTelInputModule,
        ListItemModule,
        NgSelectModule,
        FilterItemModule,
        SharedModule,
        RouterModule.forChild(routes),
        MatDatepickerModule,
        MatProgressSpinnerModule,
        NgxIntlTelInputModule,
        BsDropdownModule
    ],
    providers: [
        DatePipe,
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ]
})
export class ProfileManagementModule {}
