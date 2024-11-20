import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginDialog } from '../login/login-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterDialog } from '../shared/component/filter-component/filter-dialog.component';
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
        ReactiveFormsModule
    ],
    providers: []
})
export class ScheduledVisitListModule {}