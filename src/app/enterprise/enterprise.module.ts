import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EnterpriseComponent } from './enterprise.component';

const routes: Routes = [{ path: '', component: EnterpriseComponent }];

@NgModule({
  declarations: [EnterpriseComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class EnterpriseModule {}
