import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginDialog } from '../login/login-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { FilterDialogModule } from '../shared/component/filter-component/filter-dialog.module';
import { RouterModule, Routes } from '@angular/router';
import { BookingRequestInquiriesListComponent } from './booking-request-inquiries-list.component';

const routes: Routes = [
  { path: '', component: BookingRequestInquiriesListComponent },
];

@NgModule({
    declarations: [BookingRequestInquiriesListComponent],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        MatTableModule,
        FilterDialogModule
    ],
    providers: []
})
export class BookingRequestInquiriesListModule {}