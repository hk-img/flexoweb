import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginDialog } from '../login/login-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterDialogModule } from '../shared/component/filter-component/filter-dialog.module';
import { RouterModule, Routes } from '@angular/router';
import { ScheduledVisitListComponent } from './scheduled-visit-list.component';

const routes: Routes = [
  { path: '', component: ScheduledVisitListComponent },
];

@NgModule({
    declarations: [ScheduledVisitListComponent],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        FilterDialogModule
    ],
    providers: []
})
export class ScheduledVisitListModule {}