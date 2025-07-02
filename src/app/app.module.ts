import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyDialogModule as MatDialogModule, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { MatLegacyRadioModule as MatRadioModule } from '@angular/material/legacy-radio';
import { MatStepperModule } from '@angular/material/stepper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ToastrModule } from 'ngx-toastr';
import { navigatableComponents, routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { AppGlobals } from './services/app-globals';
import { MemberService } from './services/member.service';
import { SpaceService } from './services/space.service';
import { DialogConfirmationPopUp } from './shared/component/dialog-confirmation-popup/dialog-confirmation-popup.component';
import { FilterDialog } from './shared/component/filter-component/filter-dialog.component';
import { ListItemModule } from './shared/component/list-item/list-item.module';
import { SharedModule } from './shared/shared/shared.module';

// import {  GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider, GoogleSigninButtonModule, SocialAuthServiceConfig, SocialLoginModule, } from '@abacritt/angularx-social-login';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxJsonLdModule } from '@ngx-lite/json-ld';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { environment } from 'src/environments/environment';
import { HttpRequestInterceptor } from './login/tokanInterceptor';
import { PaymentsComponent } from './payments/payments.component';
import { ShimmerLoadingComponent } from './shared/component/shimmer-loading/shimmer-loading.component';
import { ThankyopopupComponent } from './thankyopopup/thankyopopup.component';
import { ErrorInterceptor } from './interceptors/error.interceptor';


export const MY_FORMATS = {
    parse: {
        dateInput: 'LL',
    },
    display: {
        dateInput: 'LL',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};



export function loadGoogleMaps(): () => Promise<void> {
  return () =>
    new Promise((resolve, reject) => {
      if (!document.getElementById('googleMapsScript')) {
        const script = document.createElement('script');
        script.id = 'googleMapsScript';
        script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.mapKey}&libraries=places`;
        script.async = true;
        script.defer = true;

        script.onload = () => resolve();
        script.onerror = () => reject('Google Maps API could not be loaded.');

        document.head.appendChild(script);
      } else {
        resolve(); // Script already loaded
      }
    });
}


// SocialLoginModule,
// GoogleSigninButtonModule,
@NgModule({
  declarations: [AppComponent,FilterDialog,ThankyopopupComponent, DialogConfirmationPopUp, ...navigatableComponents, PaymentsComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    GoogleSigninButtonModule,
    GoogleMapsModule,
    SocialLoginModule,
    MatInputModule,
    MatProgressBarModule,
    FormsModule,
    MatRadioModule,
    ShimmerLoadingComponent,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MaterialModule,
    MatDialogModule,
    MatStepperModule,
    MatCardModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      maxOpened: 1,
      timeOut: 3000,
    }),
    SlickCarouselModule,
    ListItemModule,
    NgxIntlTelInputModule,
    NgxJsonLdModule,
    SharedModule,
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
      scrollPositionRestoration: 'enabled'
    }),
    NgSelectModule,
    NgxSliderModule,
  ],
    providers: [
      {
        provide: APP_INITIALIZER,
        useFactory: loadGoogleMaps,
        multi: true,
      },
        DatePipe,
        {
            provide: MatDialogRef,
            useValue: {},
        },
        SpaceService,
        MemberService,
        SlickCarouselModule,
        AppGlobals,
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
        },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
{
            provide: 'SocialAuthServiceConfig',
            useValue: {
              autoLogin: false,
              providers: [
                {
                  id: GoogleLoginProvider.PROVIDER_ID,
                  provider: new GoogleLoginProvider(environment.clientId, {
                    oneTapEnabled: false,
                    prompt: 'select_account'
                  }),
                },
              ],
            } as SocialAuthServiceConfig,
          },
            {
              provide: HTTP_INTERCEPTORS,
              useClass: HttpRequestInterceptor,
              multi: true,
            },
            {
              provide: HTTP_INTERCEPTORS,
              useClass: ErrorInterceptor,
              multi: true,
            },
    ],
    bootstrap: [AppComponent],
    
})
export class AppModule { }
