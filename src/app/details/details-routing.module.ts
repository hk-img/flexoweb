import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DetailsComponent } from './details.component';
import { ViewMoreReviews } from './view-more-reviews/view-more-reviews.component';

const routes: Routes = [
  { path: 'view-more-review/:space-name', component: ViewMoreReviews },
  { path: ':spaceType/:spaceName', component: DetailsComponent },
  { path: ':spaceType/:cityName/:location/:spaceId', component: DetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailsRoutingModule { }
