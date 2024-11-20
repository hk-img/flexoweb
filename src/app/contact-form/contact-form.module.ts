import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactFormComponent } from './contact-form.component';
import { ContactFormRoutingModule } from './contact-form-routing.module';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatIconModule } from '@angular/material/icon';
import { LoginDialog } from '../login/login-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule, GoogleMap } from '@angular/google-maps';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import {MatLegacyRadioModule as MatRadioModule} from '@angular/material/legacy-radio';
import {MatLegacyListModule as MatListModule} from '@angular/material/legacy-list';
// import {MatSliderModule} from '@angular/material/slider';
// import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatLegacyDialogModule as MatDialogModule } from "@angular/material/legacy-dialog";
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { ConfirmedValidator } from '../confirmed.validator';
import { MatStepperModule } from '@angular/material/stepper';
import {MatLegacyProgressBarModule as MatProgressBarModule} from '@angular/material/legacy-progress-bar';
// import { MatSnackBar } from '@angular/material/snack-bar';

@NgModule({
  declarations: [ContactFormComponent],
  imports: [
    CommonModule,
    ContactFormRoutingModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatRadioModule,
    MatProgressBarModule,
    MatListModule,
    // MatSnackBar,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatStepperModule,
    MatIconModule
  ]
})
export class ContactFormModule { }
