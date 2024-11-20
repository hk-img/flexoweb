import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShortlistedSpacesComponent } from './shortlisted-spaces.component';

const routes: Routes = [
  { path: '', component: ShortlistedSpacesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShortlistedSpacesRoutingModule { }
