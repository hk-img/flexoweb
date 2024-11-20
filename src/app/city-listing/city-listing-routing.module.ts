import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityListingComponent } from './city-listing.component';


const routes: Routes = [
  { path: '', component: CityListingComponent },
  { path: ':spaceType/:city', component: CityListingComponent },
  { path: ':spaceType/:city/:area', component: CityListingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CityListingRoutingModule { }
