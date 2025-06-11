import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { BookingListComponent } from './booking-list.component';

const routes: Routes = [{ path: '', component: BookingListComponent }];

@NgModule({
  declarations: [BookingListComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule, RouterModule.forChild(routes)],
  providers: [DatePipe]
})
export class BookingListModule {}
