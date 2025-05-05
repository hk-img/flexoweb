import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { BookingDetailComponent } from './booking-detail/booking-detail.component';
import { BookingListComponent } from './booking-list/booking-list.component';
import { CareersComponent } from './careers/careers.component';
import { ContactComponent } from './contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EnterpriseComponent } from './enterprise/enterprise.component';
import { HomeComponent } from './home/home.component';
import { JoyOfGivingComponent } from './joy-of-giving/joy-of-giving.component';
import { ListWithUsComponent } from './list-with-us/list-with-us.component';
import { PaymentsComponent } from './payments/payments.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { AuthGuard } from './services/auth.guard';
import { _404Component } from './shared/shared/_404/_404.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { RefundPolicyComponent } from './refund-policy/refund-policy.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'in',
    loadChildren: () =>
      import('./city-listing/city-listing.module').then(
        (m) => m.CityListingModule
      ),
  },
  {
    path: 'booking-Detail/:id',
    component: BookingDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./details/details.module').then((m) => m.DetailsModule),
  },
  // {
  //   path: 'in/',
  //   loadChildren: () =>
  //     import('./city-listing/city-listing.module').then(
  //       (m) => m.CityListingModule
  //     ),
  // },
  // {
  //   path: 'in',
  //   loadChildren: () =>
  //     import('./city-listing/city-listing.module').then(
  //       (m) => m.CityListingModule
  //     ),
  // },
  // {
  //   path: 'in/spaces',
  //   loadChildren: () =>
  //     import('./area-listing/area-listing.module').then(
  //       (m) => m.AreaListingModule
  //     ),
  // },
  {
    path: 'contact-form',
    loadChildren: () =>
      import('./contact-form/contact-form.module').then(
        (m) => m.ContactFormModule
      ),
  },
  {
    path: 'my-shortlists',
    loadChildren: () =>
      import('./shortlisted-spaces/shortlisted-spaces.module').then(
        (m) => m.ShortlistedSpacesModule
      ),
  },
  
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'joy-of-giving',
    component: JoyOfGivingComponent,
  },
  {
    path: 'careers',
    component: CareersComponent,
  },
  {
    path: 'enterprise',
    component: EnterpriseComponent,
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent,
  },
  {
    path:'refund-policy',
    component: RefundPolicyComponent
  },
  {
    path: 'terms-conditions',
    component: TermsConditionsComponent,
  },
  {
    path: 'list-with-us',
    component: ListWithUsComponent,
  },

  // {
  //   path: 'in/coworking-space/delhi',
  //   redirectTo: '/in/coworking/new-delhi',
  //   pathMatch: 'full',
  // },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'booking-management',
    component: BookingListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'payments/:id/:timestamp',
    component: PaymentsComponent,
  },
  {
    path: 'visit-scheduling',
    canActivate: [AuthGuard],
    loadChildren: () => 
    import('./scheduled-visit-list/scheduled-visit-list.module').then(
      (m) => m.ScheduledVisitListModule
    ),
  },
  {
    path: 'workspace-review-rating-list',
    // component: WorkspaceRatingReviewListComponent,
    canActivate: [AuthGuard],
    loadChildren: () =>
    import('./workspace-rating-review-list/workspace-rating-review-list.module').then(
      (m) => m.WorkspaceRatingReviewListModule
    ),
  },
  {
    path: 'profile-management',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./profile-management/profile-management.module').then(
        (m) => m.ProfileManagementModule
      ),
  },
  {
    path: 'favourite-workspace',
    // component: FavouriteWorkSpaceComponent,
    canActivate: [AuthGuard],
    loadChildren: () =>
    import('./favourite-workspace/favourite-workspace.module').then(
      (m) => m.FavouriteWorkSpaceModule
    ),
  },
  {
    path: 'booking-request-inquires',
    // component: DashboardComponent,
    canActivate: [AuthGuard],
    loadChildren: () => 
      import('./booking-request-inquiries-list/booking-request-inquiries-list.module').then(
      (m) => m.BookingRequestInquiriesListModule
    ),
  },
  { path: '**', component: _404Component },
];

export const navigatableComponents = [
  HomeComponent,
  BookingListComponent,
  BookingDetailComponent,
  AboutComponent,
  ContactComponent,
  JoyOfGivingComponent,
  EnterpriseComponent,
  CareersComponent,
  TermsConditionsComponent,
  PrivacyPolicyComponent,
  ListWithUsComponent,
];
