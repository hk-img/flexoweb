import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ListWithUsComponent } from './list-with-us.component';

const routes: Routes = [{ path: '', component: ListWithUsComponent }];

@NgModule({
  declarations: [ListWithUsComponent],
  imports: [CommonModule, SlickCarouselModule, RouterModule.forChild(routes)]
})
export class ListWithUsModule {}
