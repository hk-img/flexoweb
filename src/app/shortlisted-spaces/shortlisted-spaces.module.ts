import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { MatLegacySliderModule as MatSliderModule } from '@angular/material/legacy-slider';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { LoginDialog } from '../login/login-dialog.component';
import { ListItemModule } from '../shared/component/list-item/list-item.module';
import { ShortlistedSpacesRoutingModule } from './shortlisted-spaces-routing.module';
import { ShortlistedSpacesComponent } from './shortlisted-spaces.component';

@NgModule({
    declarations: [ShortlistedSpacesComponent],
    imports: [
        CommonModule,
        FormsModule,
        MatInputModule,
        MatDialogModule,
        MatSnackBarModule,
        GoogleMapsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSliderModule,
        MatSelectModule,
        MatSlideToggleModule,
        ListItemModule,
        ShortlistedSpacesRoutingModule,
    ],
    providers: []
})
export class ShortlistedSpacesModule {}
