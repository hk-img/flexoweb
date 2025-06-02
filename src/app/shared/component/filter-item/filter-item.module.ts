import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterItemComponent } from './filter-item.component';
import { GoogleMapsModule, GoogleMap } from '@angular/google-maps';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { RouterModule } from '@angular/router';
import { NgxJsonLdModule } from '@ngx-lite/json-ld';
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete';
import {MatRadioModule} from '@angular/material/radio';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    GoogleMapsModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    RouterModule,
    NgxJsonLdModule,
    MatAutocompleteModule,
    MatRadioModule,
    NgSelectModule,
    SharedModule
  ],
  declarations: [FilterItemComponent],
  exports: [FilterItemComponent],
})
export class FilterItemModule {}
