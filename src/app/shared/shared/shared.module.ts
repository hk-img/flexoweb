import { CdkAccordionModule } from '@angular/cdk/accordion';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { FaqsComponent } from './faqs/faqs.component';
import { InViewportModule } from 'ng-in-viewport';
import { NgxJsonLdModule } from '@ngx-lite/json-ld';

@NgModule({
  imports: [
    CommonModule,
    CdkAccordionModule,
    MatExpansionModule,
    MatIconModule,
    NgxJsonLdModule,
  ],
  declarations: [FaqsComponent],
  exports: [FaqsComponent, MatIconModule, InViewportModule],
})
export class SharedModule {}
