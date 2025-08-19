import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RefundPolicyComponent } from './refund-policy.component';

const routes: Routes = [{ path: '', component: RefundPolicyComponent }];

@NgModule({
  declarations: [RefundPolicyComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class RefundPolicyModule {}
