import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemComponent } from './list-item.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [CommonModule, SlickCarouselModule, RouterModule,SharedModule],
  declarations: [ListItemComponent],
  exports: [ListItemComponent],
})
export class ListItemModule {}
