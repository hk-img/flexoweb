import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { JoyOfGivingComponent } from './joy-of-giving.component';

const routes: Routes = [{ path: '', component: JoyOfGivingComponent }];

@NgModule({
  declarations: [JoyOfGivingComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class JoyOfGivingModule {}
