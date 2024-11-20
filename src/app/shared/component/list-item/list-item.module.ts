import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemComponent } from './list-item.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, SlickCarouselModule, RouterModule],
  declarations: [ListItemComponent],
  exports: [ListItemComponent],
})
export class ListItemModule {}
