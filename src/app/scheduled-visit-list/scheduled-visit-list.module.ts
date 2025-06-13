import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginDialog } from '../login/login-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterDialog } from '../shared/component/filter-component/filter-dialog.component';
import { RouterModule, Routes } from '@angular/router';
import { ScheduledVisitListComponent } from './scheduled-visit-list.component';
import { SharedModule } from '../shared/shared/shared.module'

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
        SharedModule
    ],
    providers: []
})
export class ScheduledVisitListModule {}