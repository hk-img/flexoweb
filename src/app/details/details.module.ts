import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CdkAccordionModule } from '@angular/cdk/accordion';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatLegacyChipsModule as MatChipsModule } from '@angular/material/legacy-chips';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { MatLegacySliderModule as MatSliderModule } from '@angular/material/legacy-slider';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { LoginDialog } from '../login/login-dialog.component';
import { WorkspaceRatingReviewComponent } from '../workspace-rating-review/workspace-rating-review.component';
import { ListItemModule } from '../shared/component/list-item/list-item.module';
import { SharedModule } from '../shared/shared/shared.module';
import { DetailsRoutingModule } from './details-routing.module';
import { DetailsComponent } from './details.component';
import { ViewMoreDialog } from './view-more/view-more.component';
import { ViewMoreReviews } from './view-more-reviews/view-more-reviews.component'
import { NgxJsonLdModule } from '@ngx-lite/json-ld';
import { ScheduleVisitComponent } from '../schedule-visit/schedule-visit.component';
import { RequestBookingComponent } from './request-booking/request-booking.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BuyPassComponent } from './buy-pass/buy-pass.component';
import { CoWorkingVisitScheduleComponent } from './co-working-visit-schedule/co-working-visit-schedule.component';
import { CoWorkingVisitScheduleTwoComponent } from './co-working-visit-schedule-two/co-working-visit-schedule-two.component';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { AddReviewDialogComponent } from './add-review-dialog/add-review-dialog.component';
import { InquiryComponent } from './inquiry/inquiry.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
    declarations: [DetailsComponent, ViewMoreDialog, WorkspaceRatingReviewComponent, ScheduleVisitComponent, ViewMoreReviews, RequestBookingComponent, BuyPassComponent, CoWorkingVisitScheduleComponent, CoWorkingVisitScheduleTwoComponent, AddReviewDialogComponent, InquiryComponent],
    providers: [InquiryComponent,CoWorkingVisitScheduleComponent,DatePipe,{ provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },],
    imports: [
        NgSelectModule,
        CommonModule,
        DetailsRoutingModule,
        SlickCarouselModule,
        GoogleMapsModule,
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
        ScrollingModule,
        MatChipsModule,
        CdkAccordionModule,
        MatExpansionModule,
        SharedModule,
        RouterModule,
        NgxJsonLdModule,
        MatDatepickerModule,
        NgxIntlTelInputModule
    ]
})
export class DetailsModule {}
