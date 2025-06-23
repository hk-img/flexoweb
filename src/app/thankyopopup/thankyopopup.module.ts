import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThankyopopupComponent } from './thankyopopup.component';
import { SharedModule } from '../shared/shared/shared.module';

@NgModule({
  declarations: [ThankyopopupComponent],
  imports: [CommonModule, SharedModule],
  exports: [ThankyopopupComponent]
})
export class ThankyopopupModule {}
