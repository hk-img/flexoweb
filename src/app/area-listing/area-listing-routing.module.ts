import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AreaListingComponent } from './area-listing.component';

const routes: Routes = [
  { path: '', component: AreaListingComponent },
  { path: ':type/:city', component: AreaListingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AreaListingRoutingModule {}
