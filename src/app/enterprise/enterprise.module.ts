import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EnterpriseComponent } from './enterprise.component';
import { SharedModule } from '../shared/shared/shared.module';

const routes: Routes = [{ path: '', component: EnterpriseComponent }];

@NgModule({
  declarations: [EnterpriseComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)]
})
export class EnterpriseModule {}
