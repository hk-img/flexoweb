import { Routes } from '@angular/router';
import { BookingDetailComponent } from './booking-detail/booking-detail.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './services/auth.guard';
import { _404Component } from './shared/shared/_404/_404.component';

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
    loadChildren: () => import('./about/about.module').then(m => m.AboutModule),
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule),
  },
  {
    path: 'joy-of-giving',
    loadChildren: () => import('./joy-of-giving/joy-of-giving.module').then(m => m.JoyOfGivingModule),
  },
  {
    path: 'careers',
    loadChildren: () => import('./careers/careers.module').then(m => m.CareersModule),
  },
  {
    path: 'enterprise',
    loadChildren: () => import('./enterprise/enterprise.module').then(m => m.EnterpriseModule),
  },
  {
    path: 'privacy-policy',
    loadChildren: () => import('./privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyModule),
  },
  {
    path:'refund-policy',
    loadChildren: () => import('./refund-policy/refund-policy.module').then(m => m.RefundPolicyModule)
  },
  {
    path: 'terms-conditions',
    loadChildren: () => import('./terms-conditions/terms-conditions.module').then(m => m.TermsConditionsModule),
  },
  {
    path: 'list-with-us',
    loadChildren: () => import('./list-with-us/list-with-us.module').then(m => m.ListWithUsModule),
  },

  // {
  //   path: 'in/coworking-space/delhi',
  //   redirectTo: '/in/coworking/new-delhi',
  //   pathMatch: 'full',
  // },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: 'booking-management',
    canActivate: [AuthGuard],
    loadChildren: () => import('./booking-list/booking-list.module').then(m => m.BookingListModule),
  },
  {
    path: 'payments/:id/:timestamp',
    loadChildren: () => import('./payments/payments.module').then(m => m.PaymentsModule),
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
  BookingDetailComponent,
  _404Component,
];
