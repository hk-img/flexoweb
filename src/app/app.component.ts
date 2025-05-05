import { SocialAuthService } from '@abacritt/angularx-social-login';
import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  Inject,
  PLATFORM_ID,
  Renderer2,
  ViewContainerRef,
} from '@angular/core';
import {
  MatLegacyDialog as MatDialog,
  MatLegacyDialogConfig as MatDialogConfig,
  MatLegacyDialogRef as MatDialogRef,
} from '@angular/material/legacy-dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginDialog } from './login/login-dialog.component';
import { AppGlobals } from './services/app-globals';
import { LoginRegisterService } from './services/login-register.service';
import { MemberService } from './services/member.service';
import { SEOService } from './services/seo.service';
import { UserService } from './services/user.service';


declare global {
  interface Window { initMap: any; }
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public isMobile: boolean = false;
  public userDetails: any = null;
  public isLoggedIn: any = false;
  public routeUrl: any = '';


  public sideBarList: any = [
    {
      title: 'My Profile',
      page: '/profile-management',
    },
    {
      title: 'My Bookings',
      page: '/booking-management',
    },
    {
      title: 'My Booking Requests',
      page: '/booking-request-inquires',
    },
    {
      title: 'My Visits',
      page: '/visit-scheduling',
    },
    {
      title: 'My Favorites',
      page: '/favourite-workspace',
    },
    // {
    //   title: 'Dashboard',
    //   page: '/dashboard',
    // },
    {
      title: 'My Reviews',
      page: '/workspace-review-rating-list',
    }
  ]

  constructor(
    public login_viewContainerRef: ViewContainerRef,
    public login_dialog: MatDialog,
    public login_dialogRef: MatDialogRef<any>,
    public route: ActivatedRoute,
    private router: Router,
    private _memberService: MemberService,
    private _appGlobals: AppGlobals,
    private userService: UserService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private seoService: SEOService,
    private loginRegisterService: LoginRegisterService,
    private toastr: ToastrService,
    private renderer: Renderer2,
    private socialAuthService: SocialAuthService
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.basicInfo();
      let user = localStorage.getItem('userDetails');
      this.userDetails = user ? JSON.parse(user) : ''
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.routeUrl = this.router.url;
          if (event.url === '/in/coworking-space/Mumbai/Bandra-Kurla-Complex')
            this.router.navigate([
              '/in/coworking-space/mumbai/bandra-kurla-complex',
            ]);

          if (event.url === '/in/coworking-space/Mumbai/Powai')
            this.router.navigate(['/in/coworking-space/mumbai/powai']);
          if (event.url === '/in/coworking-space/Mumbai/Andheri-East')
            this.router.navigate(['/in/coworking-space/mumbai/andheri-east']);
          if (event.url === '/in/coworking-space/Mumbai/Thane')
            this.router.navigate(['/in/coworking-space/mumbai/thane']);
          if (event.url === '/in/coworking-space/Mumbai/Lower-Parel')
            this.router.navigate(['/in/coworking-space/mumbai/lower-parel']);

          if (event.url === '/in/coworking/andheri')
            this.router.navigate(['/in/coworking-space/mumbai/andheri']);
          if (event.url === '/in/coworking-space/mumbai-suburban/andheri')
            this.router.navigate(['/in/coworking-space/mumbai/andheri']);
          if (event.url === '/in/coworking-space/mumbai-suburban/andheri-east')
            this.router.navigate(['/in/coworking-space/mumbai/andheri-east']);
          if (event.url === '/in/coworking-space/mumbai-suburban/andheri-west')
            this.router.navigate(['/in/coworking-space/mumbai/andheri-west']);
          if (event.url === '/in/coworking-space/mumbai-suburban/bandra')
            this.router.navigate(['/in/coworking-space/mumbai/bandra']);
          if (
            event.url ===
            '/in/coworking-space/mumbai-suburban/bandra-kurla-complex'
          )
            this.router.navigate([
              '/in/coworking-space/mumbai/bandra-kurla-complex',
            ]);
          if ((event.url).toLowerCase() === ('/in/coworking-space/mumbai-suburban/bandra-west') || (event.url).toLowerCase() === ('/in/coworking-space/mumbai/bandra-west'))
            this.router.navigate(['/in/coworking-space/mumbai/bandra']);
          if (event.url === '/in/coworking-space/mumbai-suburban/bhandup')
            this.router.navigate(['/in/coworking-space/mumbai/bhandup']);
          if (event.url === '/in/coworking-space/mumbai-suburban/bkc')
            this.router.navigate(['/in/coworking-space/mumbai/bkc']);
          if (event.url === '/in/coworking-space/mumbai-suburban/borivali')
            this.router.navigate(['/in/coworking-space/mumbai/borivali']);
          if (event.url === '/in/coworking-space/mumbai-suburban/borivali-east')
            this.router.navigate(['/in/coworking-space/mumbai/borivali-east']);
          if (event.url === '/in/coworking-space/mumbai-suburban/borivali-west')
            this.router.navigate(['/in/coworking-space/mumbai/borivali-west']);
          if (event.url === '/in/coworking-space/mumbai-suburban/chembur')
            this.router.navigate(['/in/coworking-space/mumbai/chembur']);
          if (event.url === '/in/coworking-space/mumbai-suburban/churchgate')
            this.router.navigate(['/in/coworking-space/mumbai/churchgate']);
          if (event.url === '/in/coworking-space/mumbai-suburban/colaba')
            this.router.navigate(['/in/coworking-space/mumbai/colaba']);
          if (event.url === '/in/coworking-space/mumbai-suburban/dadar')
            this.router.navigate(['/in/coworking-space/mumbai/dadar']);
          if (event.url === '/in/coworking-space/mumbai-suburban/dahisar')
            this.router.navigate(['/in/coworking-space/mumbai/dahisar']);
          if (event.url === '/in/coworking-space/mumbai-suburban/dahisar-east')
            this.router.navigate(['/in/coworking-space/mumbai/dahisar-east']);
          if (event.url === '/in/coworking-space/mumbai-suburban/deonar')
            this.router.navigate(['/in/coworking-space/mumbai/deonar']);
          if (event.url === '/in/coworking-space/mumbai-suburban/fort')
            this.router.navigate(['/in/coworking-space/mumbai/fort']);
          if (event.url === '/in/coworking-space/mumbai-suburban/ghatkopar')
            this.router.navigate(['/in/coworking-space/mumbai/ghatkopar']);
          if (event.url === '/in/coworking-space/mumbai-suburban/goregaon')
            this.router.navigate(['/in/coworking-space/mumbai/goregaon']);
          if (event.url === '/in/coworking-space/mumbai-suburban/goregaon-east')
            this.router.navigate(['/in/coworking-space/mumbai/goregaon-east']);
          if (event.url === '/in/coworking-space/mumbai-suburban/goregaon-west')
            this.router.navigate(['/in/coworking-space/mumbai/goregaon-west']);
          if (event.url === '/in/coworking-space/mumbai-suburban/juhu')
            this.router.navigate(['/in/coworking-space/mumbai/juhu']);
          if (event.url === '/in/coworking-space/mumbai-suburban/kandivali')
            this.router.navigate(['/in/coworking-space/mumbai/kandivali']);
          if (event.url === '/in/coworking-space/mumbai-suburban/kandivali-west')
            this.router.navigate(['/in/coworking-space/mumbai/kandivali-west']);
          if (event.url === '/in/coworking-space/mumbai-suburban/khar')
            this.router.navigate(['/in/coworking-space/mumbai/khar']);
          if (((event.url).toLowerCase() === '/in/coworking-space/mumbai-suburban/khar-west') || ((event.url).toLowerCase() === '/in/coworking-space/mumbai/khar'))
            this.router.navigate(['/in/coworking-space/mumbai/khar-west']);
          if (event.url === '/in/coworking-space/mumbai-suburban/lower-parel')
            this.router.navigate(['/in/coworking-space/mumbai/lower-parel']);
          if (event.url === '/in/coworking-space/mumbai-suburban/mahalaxmi')
            this.router.navigate(['/in/coworking-space/mumbai/mahalaxmi']);
          if(event.url === '/in/coworking-space/bangalore/mahalakshmi-layout')
            this.router.navigate(['/in/coworking-space/bangalore/mahalakshmipuram-layout'])
          if (((event.url).toLowerCase() === '/in/coworking-space/mumbai-suburban/mahim') || ((event.url).toLowerCase() === '/in/coworking-space/mumbai/mahim'))
            this.router.navigate(['/in/coworking-space/mumbai/mahim-west']);
          if (event.url === '/in/coworking-space/mumbai-suburban/malad')
            this.router.navigate(['/in/coworking-space/mumbai/malad']);
          if (event.url === '/in/coworking-space/mumbai-suburban/malad-west')
            this.router.navigate(['/in/coworking-space/mumbai/malad-west']);
          if (event.url === '/in/coworking-space/mumbai-suburban/marine-Lines')
            this.router.navigate(['/in/coworking-space/mumbai/marine-lines']);
          if (event.url === '/in/coworking-space/mumbai-suburban/mulund')
            this.router.navigate(['/in/coworking-space/mumbai/mulund']);
          if (event.url === '/in/coworking-space/mumbai-suburban/nariman-Point')
            this.router.navigate(['/in/coworking-space/mumbai/mariman-point']);
          if (event.url === '/in/coworking-space/mumbai-suburban/parel')
            this.router.navigate(['/in/coworking-space/mumbai/parel']);
          if (event.url === '/in/coworking-space/mumbai-suburban/powai')
            this.router.navigate(['/in/coworking-space/mumbai/powai']);
          if (event.url === '/in/coworking-space/mumbai-suburban/prabhadevi')
            this.router.navigate(['/in/coworking-space/mumbai/prabhadevi']);
          if (event.url === '/in/coworking-space/mumbai-suburban/santacruz')
            this.router.navigate(['/in/coworking-space/mumbai/santacruz']);
          if (event.url === '/in/coworking-space/mumbai-suburban/santacruz-east')
            this.router.navigate(['/in/coworking-space/mumbai/santacruz-east']);
          if (event.url === '/in/coworking-space/mumbai-suburban/santacruz-west')
            this.router.navigate(['/in/coworking-space/mumbai/santacruz-west']);
          if (event.url === '/in/coworking-space/mumbai-suburban/thane')
            this.router.navigate(['/in/coworking/thane']);
          if (event.url === '/in/coworking-space/Mumbai/Thane')
            this.router.navigate(['/in/coworking/thane']);
          if (event.url === '/in/coworking-space/mumbai-suburban/vikhroli')
            this.router.navigate(['/in/coworking-space/mumbai/vikhroli']);
          if (event.url === '/in/coworking-space/mumbai-suburban/vile-parle')
            this.router.navigate(['/in/coworking-space/mumbai/vile-parle']);
          if (event.url === '/in/coworking-space/mumbai-suburban/vile-parle-west')
            this.router.navigate(['/in/coworking-space/mumbai/vile-parle-west']);
          if(event.url === '/in/coworking-space/mumbai/vile-parle-west')
            this.router.navigate(['/in/coworking-space/mumbai/vile-parle'])
          if (event.url === '/in/coworking-space/mumbai-suburban/worli')
            this.router.navigate(['/in/coworking-space/mumbai/worli']);
          if (event.url === '/in/coworking-space/Navi Mumbai/CBD-Belapur')
            this.router.navigate(['/in/coworking-space/navi mumbai/cbd-belapur']);

          if(event.url === '/in/coworking-space/mumbai/Dahisar')
            this.router.navigate(['/in/coworking-space/mumbai/dahisar'])

          if(event.url === '/in/coworking-space/navi/mumbai/cbd-belapur')
            this.router.navigate(['/in/coworking-space/navi-mumbai/cbd-belapur'])

          if(event.url === '/in/coworking-space/hyderabad/mind-space')
            this.router.navigate(['/in/coworking-space/hyderabad/mindspace'])

          if(event.url === '/in/coworking-space/navi/mumbai/sanpada')
            this.router.navigate(['/in/coworking-space/navi-mumbai/sanpada'])

          if(event.url === '/in/coworking/gurugram')
            this.router.navigate(['/in/coworking/gurgaon'])

          if (event.url === '/in/coworking-space/Navi Mumbai/Kharghar')
            this.router.navigate(['/in/coworking-space/navi mumbai/kharghar']);
          if(event.url === '/in/coworking-space/navi/mumbai/Kharghar')
            this.router.navigate(['/in/coworking-space/navi-mumbai/kharghar'])
          if (event.url === '/in/coworking-space/Navi Mumbai/Mahape')
            this.router.navigate(['/in/coworking-space/navi mumbai/mahape']);
          if(event.url === '/in/coworking-space/navi/mumbai/mahape')
            this.router.navigate(['/in/coworking-space/navi-mumbai/mahape'])
          if (event.url === '/in/coworking-space/Navi Mumbai/Nerul')
            this.router.navigate(['/in/coworking-space/navi mumbai/nerul']);
          if(event.url === '/in/coworking-space/navi/mumbai/nerul')
            this.router.navigate(['/in/coworking-space/navi-mumbai/nerul'])
          if (event.url === '/in/coworking-space/Navi Mumbai/Sanpada')
            this.router.navigate(['/in/coworking-space/navi mumbai/sanpada']);
          if (event.url === '/in/coworking-space/Navi Mumbai/Turbhe')
            this.router.navigate(['/in/coworking-space/navi mumbai/turbhe']);
          if(event.url === '/in/coworking-space/navi/mumbai/turbhe')
            this.router.navigate(['/in/coworking-space/navi-mumbai/turbhe'])
          if (event.url === '/in/coworking-space/Navi Mumbai/Vashi')
            this.router.navigate(['/in/coworking-space/navi mumbai/vashi']);
          if(event.url === '/in/coworking-space/navi/mumbai/vashi')
            this.router.navigate(['/in/coworking-space/navi-mumbai/vashi'])
          if (event.url === '/in/coworking-space/Thane/Thane-East')
            this.router.navigate(['/in/coworking-space/thane/thane-east']);
          if (event.url === '/in/coworking-space/Thane/Thane-West')
            this.router.navigate(['/in/coworking-space/thane/thane-west']);
          if (event.url === '/in/coworking-space-for-rent/Mumbai')
            this.router.navigate(['/in/coworking/mumbai']);
          if (event.url === '/in/coworking-space-for-rent/Navi-Mumbai')
            this.router.navigate(['/in/coworking/navi-mumbai']);
          if (event.url === '/in/coworking-space-for-rent/Thane')
            this.router.navigate(['/in/coworking/thane']);

          if(event.url === '/in/coworking-space/mumbai/thane')
            this.router.navigate(['/in/coworking/thane'])

          if(event.url === '/in/coworking-space/bengaluru/hebbal')
            this.router.navigate(['/in/coworking-space/bangalore/hebbal'])

          if(event.url === '/in/coworking-space/new-delhi/south-delhi')
            this.router.navigate(['/in/coworking-space/delhi/south-delhi'])

          if(event.url === '/in/spaces/Hyderabad')
            this.router.navigate(['/in/coworking/hyderabad'])

          if(event.url === '/in/spaces/Nashik')
            this.router.navigate(['/in/coworking/nashik'])
          
          if(event.url === '/in/spaces/jaipur')
            this.router.navigate(['/in/coworking/jaipur'])

          if(event.url === '/in/spaces/Nalitabari')
            this.router.navigate(['/in/coworking/nalitabari'])

          if(event.url === '/in/spaces/Atmakur')
            this.router.navigate(['/in/coworking/atmakur'])

          if(event.url === '/in/spaces/Kasavanahalli')
            this.router.navigate(['/in/coworking/kasavanahalli'])

          if(event.url === '/in/spaces/Ghaziabad')
            this.router.navigate(['/in/coworking/ghaziabad'])

          if (event.url === '/in/coworking-space/thane/navi-mumbai')
            this.router.navigate(['/in/coworking/navi-mumbai']);
          if (event.url === '/in/coworking-space/thane/cbd-belapur')
            this.router.navigate(['/in/coworking-space/navi-mumbai/cbd-belapur']);
          if (event.url === '/in/coworking-space/thane/sanpada')
            this.router.navigate(['/in/coworking-space/navi-mumbai/sanpada']);
          if (event.url === '/in/coworking-space/thane/kharghar')
            this.router.navigate(['/in/coworking-space/navi-mumbai/kharghar']);
          if (event.url === '/in/coworking-space/thane/mahape')
            this.router.navigate(['/in/coworking-space/navi-mumbai/mahape']);
          if (event.url === '/in/coworking-space/thane/nerul')
            this.router.navigate(['/in/coworking-space/navi-mumbai/nerul']);
          if (event.url === '/in/coworking-space/thane/turbhe')
            this.router.navigate(['/in/coworking-space/navi-mumbai/turbhe']);
          if (event.url === '/in/coworking-space/thane/vashi')
            this.router.navigate(['/in/coworking-space/navi-mumbai/vashi']);

          if (event.url === '/in/coworking-space/ranga-reddy/gachibowli')
            this.router.navigate(['/in/coworking-space/hyderabad/gachibowli']);
          if (event.url === '/in/coworking-space/ranga-reddy/hitec-city')
            this.router.navigate(['/in/coworking-space/hyderabad/hitec-city']);
          if (event.url === '/in/coworking-space/ranga-reddy/hanuman-nagar')
            this.router.navigate(['/in/coworking-space/hyderabad/hanuman-nagar']);
          if (event.url === '/in/coworking-space/ranga-reddy/madhapur')
            this.router.navigate(['/in/coworking-space/hyderabad/madhapur']);
          if (event.url === '/in/coworking-space/ranga-reddy/kondapur')
            this.router.navigate(['/in/coworking-space/hyderabad/kondapur']);
          if (event.url === '/in/coworking-space/ranga-reddy/kothaguda')
            this.router.navigate(['/in/coworking-space/hyderabad/kothaguda']);
          if (event.url === '/in/coworking-space/ranga-reddy/kukatpally')
            this.router.navigate(['/in/coworking-space/hyderabad/kukatpally']);
          if (event.url === '/in/coworking-space/ranga-reddy/financial-district')
            this.router.navigate([
              '/in/coworking-space/hyderabad/financial-district',
            ]);
          if (event.url === '/in/coworking-space/ranga-reddy/mind-space')
            this.router.navigate(['/in/coworking-space/hyderabad/mind-space']);
          if (event.url === '/in/coworking-space/ranga-reddy/toli-chowki')
            this.router.navigate(['/in/coworking-space/hyderabad/toli-chowki']);

          if (event.url === '/in/coworking-space/bangalore-urban/bengaluru')
            this.router.navigate(['/in/coworking/bengaluru']);
          if (event.url === '/in/coworking/bengaluru')
             this.router.navigate(['/in/coworking/bangalore']);
          if (event.url === '/in/coworking-space/bangalore-urban/infantry-road')
            this.router.navigate(['/in/coworking-space/bangalore/infantry-road']);
          if (event.url === '/in/coworking-space/bangalore-urban/indiranagar')
            this.router.navigate(['/in/coworking-space/bangalore/indiranagar']);
          if (event.url === '/in/coworking-space/bangalore-urban/koramangala')
            this.router.navigate(['/in/coworking-space/bangalore/koramangala']);
          if (event.url === '/in/coworking-space/bangalore-urban/bellandur')
            this.router.navigate(['/in/coworking-space/bangalore/bellandur']);
          if (event.url === '/in/coworking-space/bangalore-urban/residency-road')
            this.router.navigate([
              '/in/coworking-space/bangalore/residency-road',
            ]);
          if (event.url === '/in/coworking-space/bangalore-urban/hsr-layout')
            this.router.navigate(['/in/coworking-space/bangalore/hsr-layout']);
          if (event.url === '/in/coworking-space/bangalore-urban/whitefield')
            this.router.navigate(['/in/coworking-space/bangalore/whitefield']);
          if (event.url === '/in/coworking-space/bangalore-urban/shanti-nagar')
            this.router.navigate(['/in/coworking-space/bangalore/shanti-nagar']);
          if (
            event.url === '/in/coworking-space/bangalore-urban/uttarahalli-hobli'
          )
            this.router.navigate([
              '/in/coworking-space/bangalore/uttarahalli-hobli',
            ]);
          if (
            event.url === '/in/coworking-space/bangalore-urban/mahalakshmi-layout'
          )
            this.router.navigate([
              '/in/coworking-space/bangalore/mahalakshmi-layout',
            ]);
          if (event.url === '/in/coworking-space/bangalore-urban/jayanagar')
            this.router.navigate(['/in/coworking-space/bangalore/jayanagar']);
          if (event.url === '/in/coworking-space/bangalore-urban/yelahanka')
            this.router.navigate(['/in/coworking-space/bangalore/yelahanka']);
          if (event.url === '/in/coworking-space/bangalore-urban/vasanth-nagar')
            this.router.navigate(['/in/coworking-space/bangalore/vasanth-nagar']);
          if (event.url === '/in/coworking-space/bangalore-urban/pulikeshi-nagar')
            this.router.navigate([
              '/in/coworking-space/bangalore/pulikeshi-nagar',
            ]);
          if (event.url === '/in/coworking-space/bangalore-urban/btm-layout')
            this.router.navigate(['/in/coworking-space/bangalore/btm-layout']);
          if (event.url === '/in/coworking-space/bangalore-urban/marathahalli')
            this.router.navigate(['/in/coworking-space/bangalore/marathahalli']);
          if (event.url === '/in/coworking-space/bangalore-urban/naagarabhaavi')
            this.router.navigate(['/in/coworking-space/bangalore/naagarabhaavi']);
          if(event.url === '/in/coworking-space/bangalore/naagarabhaavi')
            this.router.navigate(['/in/coworking-space/bangalore/naagarabhavi'])
          if (event.url === '/in/coworking-space/bangalore-urban/domlur')
            this.router.navigate(['/in/coworking-space/bangalore/domlur']);
          if (event.url === '/in/coworking-space/bangalore-urban/hosur-road')
            this.router.navigate(['/in/coworking-space/bangalore/hosur-road']);
          if (event.url === '/in/coworking-space/bangalore-urban/sarjapura')
            this.router.navigate(['/in/coworking-space/bangalore/sarjapura']);
          if (event.url === '/in/coworking-space/bangalore-urban/sanjaynagar')
            this.router.navigate(['/in/coworking-space/bangalore/sanjaynagar']);
          if(event.url === '/in/coworking-space/bangalore/sanjaynagar')
            this.router.navigate(['/in/coworking-space/bangalore/sanjay-nagar'])
          if (event.url === '/in/coworking-space/bangalore-urban/j.-p.-nagar')
            this.router.navigate(['/in/coworking-space/bangalore/jp-nagar']);
          if(event.url === '/in/coworking-space/bangalore/j.-p.-nagar')
            this.router.navigate(['/in/coworking-space/bangalore/jp-nagar'])
          if (event.url === '/in/coworking-space/bangalore-urban/electronic-city')
            this.router.navigate([
              '/in/coworking-space/bangalore/electronic-city',
            ]);
          if (event.url === '/in/coworking-space/bangalore-urban/sadashiva-nagar')
            this.router.navigate([
              '/in/coworking-space/bangalore/sadashiva-nagar',
            ]);
          if (event.url === '/in/coworking-space/bangalore-urban/rajajinagar')
            this.router.navigate(['/in/coworking-space/bangalore/rajajinagar']);
          if (event.url === '/in/coworking-space/bangalore-urban/naagarabhaavi')
            this.router.navigate(['/in/coworking-space/bangalore/naagarabhaavi']);
          if (event.url === '/in/coworking-space/bangalore-urban/outer-ring-road')
            this.router.navigate([
              '/in/coworking-space/bangalore/outer-ring-road',
            ]);
          if(event.url === '/in/coworking-space/bangalore/bannerghatta-main-road')
            this.router.navigate(['/in/coworking-space/bangalore/bannerghatta-road'])
          if (event.url === '/in/coworking-space/bangalore-urban/binnipete')
            this.router.navigate(['/in/coworking-space/bangalore/binnipete']);
          if (event.url === '/in/coworking-space/bangalore-urban/hosur-road')
            this.router.navigate(['/in/coworking-space/bangalore/hosur-road']);
          if (event.url === '/in/coworking-space/bangalore-urban/old-madras-road')
            this.router.navigate([
              '/in/coworking-space/bangalore/old-madras-road',
            ]);
          if (event.url === '/in/coworking-space/bangalore-urban/banashankari')
            this.router.navigate(['/in/coworking-space/bangalore/banashankari']);
          if (event.url === '/in/coworking-space/bengaluru/banashankari')
            this.router.navigate(['/in/coworking-space/bangalore/banashankari']);
          if (event.url === '/in/coworking-space/bangalore-urban/kalyan-nagar')
            this.router.navigate(['/in/coworking-space/bangalore/kalyan-nagar']);
          if (event.url === '/in/coworking-space/bangalore-urban/sarjapur-road')
            this.router.navigate(['/in/coworking-space/bangalore/sarjapur-road']);

          if (event.url === '/in/coworking-space/bengaluru/bannerghatta-road')
            this.router.navigate([
              '/in/coworking-space/bangalore/bannerghatta-road',
            ]);

          if(event.url === '/in/coworking-space/delhi/barakhamba-road')
            this.router.navigate(['/in/coworking-space/delhi/barakhamba'])

          if(event.url === '/in/coworking-space/delhi/pitam-pura')
            this.router.navigate(['/in/coworking-space/delhi/pitampura'])

          if(event.url === '/in/coworking-space/delhi/saidulajab')
            this.router.navigate(['/in/coworking-space/delhi/saidullajab'])

          if(event.url === '/in/coworking-space/delhi/mohan-cooperative-industrial-estate')
            this.router.navigate(['/in/coworking-space/delhi/mohan-estate'])

          if (event.url === '/in/coworking-space/bengaluru/bellandur')
            this.router.navigate(['/in/coworking-space/bangalore/bellandur']);

          if (event.url === '/in/coworking-space/bengaluru/binnipete')
            this.router.navigate(['/in/coworking-space/bangalore/binnipete']);

          if (event.url === '/in/coworking-space/bengaluru/brookefield')
            this.router.navigate(['/in/coworking-space/bangalore/brookefield']);

          if (event.url === '/in/coworking-space/bengaluru/btm-layout')
            this.router.navigate(['/in/coworking-space/bangalore/btm-layout']);

          if (event.url === '/in/coworking-space/bengaluru/domlur')
            this.router.navigate(['/in/coworking-space/bangalore/domlur']);

          if (event.url === '/in/coworking-space/bengaluru/electronic-city')
            this.router.navigate([
              '/in/coworking-space/bangalore/electronic-city',
            ]);
          if (event.url === '/in/coworking-space/bengaluru/fraser-town')
            this.router.navigate(['/in/coworking-space/bangalore/fraser-town']);

          if (event.url === '/in/coworking-space/bengaluru/hosur--road')
            this.router.navigate(['/in/coworking-space/bangalore/hosur-road']);

          if (event.url === '/in/coworking-space/bengaluru/hsr-layout')
            this.router.navigate(['/in/coworking-space/bangalore/hsr-layout']);

          if (event.url === '/in/coworking-space/bengaluru/indiranagar')
            this.router.navigate(['/in/coworking-space/bangalore/indiranagar']);

          if (event.url === '/in/coworking-space/bengaluru/infantry-road')
            this.router.navigate(['/in/coworking-space/bangalore/infantry-road']);

          if (event.url === '/in/coworking-space/bengaluru/jayanagar')
            this.router.navigate(['/in/coworking-space/bangalore/jayanagar']);

          if (event.url === '/in/coworking-space/bengaluru/jp-nagar')
            this.router.navigate(['/in/coworking-space/bangalore/jp-nagar']);

          if (event.url === '/in/coworking-space/bengaluru/kalyan-nagar')
            this.router.navigate(['/in/coworking-space/bangalore/kalyan-nagar']);

          if (event.url === '/in/coworking-space/bengaluru/koramangala')
            this.router.navigate(['/in/coworking-space/bangalore/koramangala']);

          if (
            event.url === '/in/coworking-space/bengaluru/mahalakshmipuram-layout'
          )
            this.router.navigate([
              '/in/coworking-space/bangalore/mahalakshmipuram-layout',
            ]);

          if (event.url === '/in/coworking-space/bengaluru/marathahalli')
            this.router.navigate(['/in/coworking-space/bangalore/marathahalli']);

          if (event.url === '/in/coworking-space/bengaluru/mg-road')
            this.router.navigate(['/in/coworking-space/bangalore/mg-road']);

          if (event.url === '/in/coworking-space/bengaluru/naagarabhavi')
            this.router.navigate(['/in/coworking-space/bangalore/naagarabhavi']);

          if (event.url === '/in/coworking-space/bengaluru/nagarbhavi')
            this.router.navigate(['/in/coworking-space/bangalore/nagarbhavi']);

          if (event.url === '/in/coworking-space/bengaluru/old-madras-road')
            this.router.navigate([
              '/in/coworking-space/bangalore/old-madras-road',
            ]);

          if (event.url === '/in/coworking-space/bengaluru/outer-ring-road')
            this.router.navigate([
              '/in/coworking-space/bangalore/outer-ring-road',
            ]);

          if (event.url === '/in/coworking-space/bengaluru/rajajinagar')
            this.router.navigate(['/in/coworking-space/bangalore/rajajinagar']);

          if (event.url === '/in/coworking-space/bengaluru/residency-road')
            this.router.navigate([
              '/in/coworking-space/bangalore/residency-road',
            ]);

          if (event.url === '/in/coworking-space/bengaluru/sadashivanagar')
            this.router.navigate([
              '/in/coworking-space/bangalore/sadashivanagar',
            ]);

          if (event.url === '/in/coworking-space/bengaluru/sanjay-nagar')
            this.router.navigate(['/in/coworking-space/bangalore/sanjay-nagar']);

          if (event.url === '/in/coworking-space/bengaluru/sarjapur-road')
            this.router.navigate(['/in/coworking-space/bangalore/sarjapur-road']);

          if (event.url === '/in/coworking-space/bengaluru/shanti-nagar')
            this.router.navigate(['/in/coworking-space/bangalore/shanti-nagar']);

          if (event.url === '/in/coworking-space/bengaluru/uttarahalli')
            this.router.navigate(['/in/coworking-space/bangalore/uttarahalli']);

          if (event.url === '/in/coworking-space/bengaluru/vasanth-nagar')
            this.router.navigate(['/in/coworking-space/bangalore/vasanth-nagar']);

          if (event.url === '/in/coworking-space/bengaluru/whitefield')
            this.router.navigate(['/in/coworking-space/bangalore/whitefield']);

          if (event.url === '/in/coworking-space/bengaluru/yelahanka')
            this.router.navigate(['/in/coworking-space/bangalore/yelahanka']);

          if (event.url === '/in/coworking/pimpri-chinchwad')
            this.router.navigate(['/in/coworking-space/pune/pimpri-chinchwad']);

          if (
            event.url ===
            '/in/coworking-space/bangalore-urban/bannerghatta-main-road'
          )
            this.router.navigate([
              '/in/coworking-space/bangalore/bannerghatta-main-road',
            ]);
          if (event.url === '/in/coworking-space/bangalore-urban/brookefield')
            this.router.navigate(['/in/coworking-space/bangalore/brookefield']);

          // new banglore url

          if (event.url === '/in/coworking-space/bangalore-division/bengaluru')
            this.router.navigate(['/in/coworking/bengaluru']);
          // if (event.url === '/in/coworking/bengaluru')
          //    this.router.navigate(['/in/coworking/bangalore']);
          if (
            event.url === '/in/coworking-space/bangalore-division/infantry-road'
          )
            this.router.navigate(['/in/coworking-space/bangalore/infantry-road']);
          if (event.url === '/in/coworking-space/bangalore-division/indiranagar')
            this.router.navigate(['/in/coworking-space/bangalore/indiranagar']);
          if (event.url === '/in/coworking-space/bangalore-division/koramangala')
            this.router.navigate(['/in/coworking-space/bangalore/koramangala']);
          if (event.url === '/in/coworking-space/bangalore-division/bellandur')
            this.router.navigate(['/in/coworking-space/bangalore/bellandur']);
          if (
            event.url === '/in/coworking-space/bangalore-division/residency-road'
          )
            this.router.navigate([
              '/in/coworking-space/bangalore/residency-road',
            ]);
          if (event.url === '/in/coworking-space/bangalore-division/hsr-layout')
            this.router.navigate(['/in/coworking-space/bangalore/hsr-layout']);
          if (event.url === '/in/coworking-space/bangalore-division/whitefield')
            this.router.navigate(['/in/coworking-space/bangalore/whitefield']);
          if (event.url === '/in/coworking-space/bangalore-division/shanti-nagar')
            this.router.navigate(['/in/coworking-space/bangalore/shanti-nagar']);
          if (
            event.url ===
            '/in/coworking-space/bangalore-division/uttarahalli-hobli'
          )
            this.router.navigate([
              '/in/coworking-space/bangalore/uttarahalli-hobli',
            ]);
          if (
            event.url ===
            '/in/coworking-space/bangalore-division/mahalakshmi-layout'
          )
            this.router.navigate([
              '/in/coworking-space/bangalore/mahalakshmi-layout',
            ]);
          if (event.url === '/in/coworking-space/bangalore-division/jayanagar')
            this.router.navigate(['/in/coworking-space/bangalore/jayanagar']);
          if (event.url === '/in/coworking-space/bangalore-division/yelahanka')
            this.router.navigate(['/in/coworking-space/bangalore/yelahanka']);
          if (
            event.url === '/in/coworking-space/bangalore-division/vasanth-nagar'
          )
            this.router.navigate(['/in/coworking-space/bangalore/vasanth-nagar']);
          if (
            event.url === '/in/coworking-space/bangalore-division/pulikeshi-nagar'
          )
            this.router.navigate([
              '/in/coworking-space/bangalore/pulikeshi-nagar',
            ]);
          if (event.url === '/in/coworking-space/bangalore-division/btm-layout')
            this.router.navigate(['/in/coworking-space/bangalore/btm-layout']);
          if (event.url === '/in/coworking-space/bangalore-division/marathahalli')
            this.router.navigate(['/in/coworking-space/bangalore/marathahalli']);
          if (
            event.url === '/in/coworking-space/bangalore-division/naagarabhaavi'
          )
            this.router.navigate(['/in/coworking-space/bangalore/naagarabhaavi']);
          if (event.url === '/in/coworking-space/bangalore-division/domlur')
            this.router.navigate(['/in/coworking-space/bangalore/domlur']);
          if (event.url === '/in/coworking-space/bangalore-division/hosur-road')
            this.router.navigate(['/in/coworking-space/bangalore/hosur-road']);
          if (event.url === '/in/coworking-space/bangalore-division/sarjapura')
            this.router.navigate(['/in/coworking-space/bangalore/sarjapura']);
          if (event.url === '/in/coworking-space/bangalore-division/sanjaynagar')
            this.router.navigate(['/in/coworking-space/bangalore/sanjaynagar']);
          if (event.url === '/in/coworking-space/bangalore-division/j.-p.-nagar')
            this.router.navigate(['/in/coworking-space/bangalore/jp-nagar']);
          if (
            event.url === '/in/coworking-space/bangalore-division/electronic-city'
          )
            this.router.navigate([
              '/in/coworking-space/bangalore/electronic-city',
            ]);
          if (
            event.url === '/in/coworking-space/bangalore-division/sadashiva-nagar'
          )
            this.router.navigate([
              '/in/coworking-space/bangalore/sadashiva-nagar',
            ]);
          if (event.url === '/in/coworking-space/bangalore-division/rajajinagar')
            this.router.navigate(['/in/coworking-space/bangalore/rajajinagar']);
          if (
            event.url === '/in/coworking-space/bangalore-division/naagarabhaavi'
          )
            this.router.navigate(['/in/coworking-space/bangalore/naagarabhaavi']);
          if (
            event.url === '/in/coworking-space/bangalore-division/outer-ring-road'
          )
            this.router.navigate([
              '/in/coworking-space/bangalore/outer-ring-road',
            ]);
          if (event.url === '/in/coworking-space/bangalore-division/binnipete')
            this.router.navigate(['/in/coworking-space/bangalore/binnipete']);
          if (event.url === '/in/coworking-space/bangalore-division/hosur-road')
            this.router.navigate(['/in/coworking-space/bangalore/hosur-road']);
          if (
            event.url === '/in/coworking-space/bangalore-division/old-madras-road'
          )
            this.router.navigate([
              '/in/coworking-space/bangalore/old-madras-road',
            ]);
          if (event.url === '/in/coworking-space/bangalore-division/banashankari')
            this.router.navigate(['/in/coworking-space/bangalore/banashankari']);
          if (event.url === '/in/coworking-space/bengaluru/banashankari')
            this.router.navigate(['/in/coworking-space/bangalore/banashankari']);
          if (event.url === '/in/coworking-space/bangalore-division/kalyan-nagar')
            this.router.navigate(['/in/coworking-space/bangalore/kalyan-nagar']);
          if (
            event.url === '/in/coworking-space/bangalore-division/sarjapur-road'
          )
            this.router.navigate(['/in/coworking-space/bangalore/sarjapur-road']);

          if (event.url === '/in/coworking-space/bengaluru/bannerghatta-road')
            this.router.navigate([
              '/in/coworking-space/bangalore/bannerghatta-road',
            ]);

          if (event.url === '/in/coworking-space/bengaluru/bellandur')
            this.router.navigate(['/in/coworking-space/bangalore/bellandur']);

          if (event.url === '/in/coworking-space/bengaluru/binnipete')
            this.router.navigate(['/in/coworking-space/bangalore/binnipete']);

          if (event.url === '/in/coworking-space/bengaluru/brookefield')
            this.router.navigate(['/in/coworking-space/bangalore/brookefield']);

          if (event.url === '/in/coworking-space/bengaluru/btm-layout')
            this.router.navigate(['/in/coworking-space/bangalore/btm-layout']);

          if (event.url === '/in/coworking-space/bengaluru/domlur')
            this.router.navigate(['/in/coworking-space/bangalore/domlur']);

          if (event.url === '/in/coworking-space/bengaluru/electronic-city')
            this.router.navigate([
              '/in/coworking-space/bangalore/electronic-city',
            ]);
          if (event.url === '/in/coworking-space/bengaluru/fraser-town')
            this.router.navigate(['/in/coworking-space/bangalore/fraser-town']);

          if (event.url === '/in/coworking-space/bengaluru/hosur--road')
            this.router.navigate(['/in/coworking-space/bangalore/hosur-road']);

          if (event.url === '/in/coworking-space/bengaluru/hsr-layout')
            this.router.navigate(['/in/coworking-space/bangalore/hsr-layout']);

          if (event.url === '/in/coworking-space/bengaluru/indiranagar')
            this.router.navigate(['/in/coworking-space/bangalore/indiranagar']);

          if (event.url === '/in/coworking-space/bengaluru/infantry-road')
            this.router.navigate(['/in/coworking-space/bangalore/infantry-road']);

          if (event.url === '/in/coworking-space/bengaluru/jayanagar')
            this.router.navigate(['/in/coworking-space/bangalore/jayanagar']);

          if (event.url === '/in/coworking-space/bengaluru/jp-nagar')
            this.router.navigate(['/in/coworking-space/bangalore/jp-nagar']);

          if (event.url === '/in/coworking-space/bengaluru/kalyan-nagar')
            this.router.navigate(['/in/coworking-space/bangalore/kalyan-nagar']);

          if (event.url === '/in/coworking-space/bengaluru/koramangala')
            this.router.navigate(['/in/coworking-space/bangalore/koramangala']);

          if (
            event.url === '/in/coworking-space/bengaluru/mahalakshmipuram-layout'
          )
            this.router.navigate([
              '/in/coworking-space/bangalore/mahalakshmipuram-layout',
            ]);

          if (event.url === '/in/coworking-space/bengaluru/marathahalli')
            this.router.navigate(['/in/coworking-space/bangalore/marathahalli']);

          if (event.url === '/in/coworking-space/bengaluru/mg-road')
            this.router.navigate(['/in/coworking-space/bangalore/mg-road']);

          if (event.url === '/in/coworking-space/bengaluru/naagarabhavi')
            this.router.navigate(['/in/coworking-space/bangalore/naagarabhavi']);

          if (event.url === '/in/coworking-space/bengaluru/nagarbhavi')
            this.router.navigate(['/in/coworking-space/bangalore/nagarbhavi']);

          if (event.url === '/in/coworking-space/bengaluru/old-madras-road')
            this.router.navigate([
              '/in/coworking-space/bangalore/old-madras-road',
            ]);

          if (event.url === '/in/coworking-space/bengaluru/outer-ring-road')
            this.router.navigate([
              '/in/coworking-space/bangalore/outer-ring-road',
            ]);

          if (event.url === '/in/coworking-space/bengaluru/rajajinagar')
            this.router.navigate(['/in/coworking-space/bangalore/rajajinagar']);

          if (event.url === '/in/coworking-space/bengaluru/residency-road')
            this.router.navigate([
              '/in/coworking-space/bangalore/residency-road',
            ]);

          if (event.url === '/in/coworking-space/bengaluru/sadashivanagar')
            this.router.navigate([
              '/in/coworking-space/bangalore/sadashivanagar',
            ]);

          if (event.url === '/in/coworking-space/bengaluru/sanjay-nagar')
            this.router.navigate(['/in/coworking-space/bangalore/sanjay-nagar']);

          if (event.url === '/in/coworking-space/bengaluru/sarjapur-road')
            this.router.navigate(['/in/coworking-space/bangalore/sarjapur-road']);

          if (event.url === '/in/coworking-space/bengaluru/shanti-nagar')
            this.router.navigate(['/in/coworking-space/bangalore/shanti-nagar']);

          if (event.url === '/in/coworking-space/bengaluru/uttarahalli')
            this.router.navigate(['/in/coworking-space/bangalore/uttarahalli']);

          if (event.url === '/in/coworking-space/bengaluru/vasanth-nagar')
            this.router.navigate(['/in/coworking-space/bangalore/vasanth-nagar']);

          if (event.url === '/in/coworking-space/bengaluru/whitefield')
            this.router.navigate(['/in/coworking-space/bangalore/whitefield']);

          if (event.url === '/in/coworking-space/bengaluru/yelahanka')
            this.router.navigate(['/in/coworking-space/bangalore/yelahanka']);

          if (event.url === '/in/coworking/pimpri-chinchwad')
            this.router.navigate(['/in/coworking-space/pune/pimpri-chinchwad']);

          if (
            event.url ===
            '/in/coworking-space/bangalore-division/bannerghatta-main-road'
          )
            this.router.navigate([
              '/in/coworking-space/bangalore/bannerghatta-main-road',
            ]);
          if (event.url === '/in/coworking-space/bangalore-division/brookefield')
            this.router.navigate(['/in/coworking-space/bangalore/brookefield']);

          //end new banglore url

          if (event.url === '/in/coworking-space/new-delhi/connaught-place')
            this.router.navigate(['/in/coworking-space/delhi/connaught-place']);
          if (event.url === '/in/coworking-space/south-delhi/saket')
            this.router.navigate(['/in/coworking-space/delhi/saket']);
          if (event.url === '/in/coworking-space/south-west-delhi/aerocity')
            this.router.navigate(['/in/coworking-space/delhi/aerocity']);
          if (event.url === '/in/coworking-space/new-delhi/aerocity')
            this.router.navigate(['/in/coworking-space/delhi/aerocity']);
          if (event.url === '/in/coworking-space/central-delhi/barakhamba-road')
            this.router.navigate(['/in/coworking-space/delhi/barakhamba-road']);

          if (event.url === '/in/coworking-space/new-delhi/anand-vihar')
            this.router.navigate(['/in/coworking-space/delhi/anand-vihar']);

          if (event.url === '/in/coworking-space/new-delhi/ashok-park-main')
            this.router.navigate(['/in/coworking-space/delhi/ashok-park']);

          if (event.url === '/in/coworking-space/new-delhi/badarpur')
            this.router.navigate(['/in/coworking-space/delhi/badarpur']);

          //new delhi

          if (event.url === '/in/coworking-space/delhi-division/connaught-place')
            this.router.navigate(['/in/coworking-space/delhi/connaught-place']);

          if (event.url === '/in/coworking-space/delhi-division/saket')
            this.router.navigate(['/in/coworking-space/delhi/saket']);

          if (event.url === '/in/coworking-space/delhi-division/aerocity')
            this.router.navigate(['/in/coworking-space/delhi/aerocity']);

          if (event.url === '/in/coworking-space/delhi-division/aerocity')
            this.router.navigate(['/in/coworking-space/delhi/aerocity']);

          if (event.url === '/in/coworking-space/delhi-division/barakhamba-road')
            this.router.navigate(['/in/coworking-space/delhi/barakhamba-road']);

          if (event.url === '/in/coworking-space/delhi-division/anand-vihar')
            this.router.navigate(['/in/coworking-space/delhi/anand-vihar']);

          if (event.url === '/in/coworking-space/delhi-division/ashok-park-main')
            this.router.navigate(['/in/coworking-space/delhi/ashok-park']);

          if (event.url === '/in/coworking-space/delhi-division/badarpur')
            this.router.navigate(['/in/coworking-space/delhi/badarpur']);

          //MUmbai URL
          if (event.url === '/in/coworking-space/konkan-division/andheri')
            this.router.navigate(['/in/coworking-space/mumbai/andheri']);

          if (event.url === '/in/coworking-space/konkan-division/andheri-east')
            this.router.navigate(['/in/coworking-space/mumbai/andheri-east']);

          if (event.url === '/in/coworking-space/konkan-division/ballard-estate')
            this.router.navigate(['/in/coworking-space/mumbai/ballard-estate']);

          if (
            event.url ===
            '/in/coworking-space/konkan-division/bandra-kurla-complex'
          )
            this.router.navigate([
              '/in/coworking-space/mumbai/bandra-kurla-complex',
            ]);

          if (event.url === '/in/coworking-space/konkan-division/chembur')
            this.router.navigate(['/in/coworking-space/mumbai/chembur']);

          if (event.url === '/in/coworking-space/konkan-division/churchgate')
            this.router.navigate(['/in/coworking-space/mumbai/churchgate']);

          if (event.url === '/in/coworking-space/konkan-division/goregaon-west')
            this.router.navigate(['/in/coworking-space/mumbai/goregaon-west']);

          if (event.url === '/in/coworking-space/konkan-division/kandivali')
            this.router.navigate(['/in/coworking-space/mumbai/kandivali']);

          if (event.url === '/in/coworking-space/konkan-division/marine-lines')
            this.router.navigate(['/in/coworking-space/mumbai/marine-lines']);

          if (event.url === '/in/coworking-space/konkan-division/kurla')
            this.router.navigate(['/in/coworking-space/mumbai/kurla']);

          if (event.url === '/in/coworking-space/konkan-division/nahur')
            this.router.navigate(['/in/coworking-space/mumbai/nahur']);
          if (event.url === '/in/coworking-space/konkan-division/vile-parle')
            this.router.navigate(['/in/coworking-space/mumbai/vile-parle']);
          if (event.url === '/in/coworking-space/konkan-division/saki-vihar')
            this.router.navigate(['/in/coworking-space/mumbai/saki-vihar']);
          if (event.url === '/in/coworking-space/konkan-division/nityanand-nagar')
            this.router.navigate(['/in/coworking-space/mumbai/nityanand-nagar']);
          if (event.url === '/in/coworking-space/konkan-division/parel')
            this.router.navigate(['/in/coworking-space/mumbai/parel']);
          if (event.url === '/in/coworking-space/konkan-division/powai')
            this.router.navigate(['/in/coworking-space/mumbai/powai']);
          if (event.url === '/in/coworking-space/konkan-division/prabhadevi')
            this.router.navigate(['/in/coworking-space/mumbai/prabhadevi']);
          if (event.url === '/in/coworking-space/konkan-division/santacruz')
            this.router.navigate(['/in/coworking-space/mumbai/santacruz']);
          if (event.url === '/in/coworking-space/konkan-division/santacruz-east')
            this.router.navigate(['/in/coworking-space/mumbai/santacruz-east']);
          if (event.url === '/in/coworking-space/konkan-division/santacruz-west')
            this.router.navigate(['/in/coworking-space/mumbai/santacruz-west']);
          if (event.url === '/in/coworking-space/konkan-division/thane')
            this.router.navigate(['/in/coworking-space/mumbai//thane']);
          // if (event.url === '/in/coworking-space/Mumbai/Thane')
          //   this.router.navigate(['/in/coworking/thane']);
          if (event.url === '/in/coworking-space/konkan-division/vikhroli')
            this.router.navigate(['/in/coworking-space/mumbai/vikhroli']);

          if (event.url === '/in/coworking-space/konkan-division/mulund')
            this.router.navigate(['/in/coworking-space/mumbai/mulund']);

          if (event.url === '/in/coworking-space/konkan-division/malad')
            this.router.navigate(['/in/coworking-space/mumbai/malad']);

          if (event.url === '/in/coworking-space/konkan-division/mahalakshmi')
            this.router.navigate(['/in/coworking-space/mumbai/mahalakshmi']);

          if (event.url === '/in/coworking-space/konkan-division/lower-parel')
            this.router.navigate(['/in/coworking-space/mumbai/lower-parel']);

          if (event.url === '/in/coworking-space/konkan-division/khar-west')
            this.router.navigate(['/in/coworking-space/mumbai/khar-west']);

          if (event.url === '/in/coworking-space/konkan-division/kandivali-west')
            this.router.navigate(['/in/coworking-space/mumbai/kandivali-west']);

          if (event.url === '/in/coworking-space/konkan-division/goregaon')
            this.router.navigate(['/in/coworking-space/mumbai/goregaon']);

          if (event.url === '/in/coworking-space/konkan-division/ghatkopar')
            this.router.navigate(['/in/coworking-space/mumbai/ghatkopar']);

          if (event.url === '/in/coworking-space/konkan-division/deonar')
            this.router.navigate(['/in/coworking-space/mumbai/deonar']);

          if (event.url === '/in/coworking-space/konkan-division/dahisar-east')
            this.router.navigate(['/in/coworking-space/mumbai/dahisar-east']);

          if (event.url === '/in/coworking-space/konkan-division/borivali')
            this.router.navigate(['/in/coworking-space/mumbai/borivali']);

          if (event.url === '/in/coworking-space/konkan-division/borivali-west')
            this.router.navigate(['/in/coworking-space/mumbai/borivali-west']);

          if (event.url === '/in/coworking-space/konkan-division/borivali-east')
            this.router.navigate(['/in/coworking-space/mumbai/borivali-east']);

          if (event.url === '/i/in/coworking-space/new-delhi/barakhamba-road')
            this.router.navigate(['/in/coworking-space/delhi/barakhamba']);

          if (event.url === '/in/coworking-space/new-delhi/bhikaji-cama-place')
            this.router.navigate([
              '/in/coworking-space/delhi/bhikaji-cama-place',
            ]);

          if (event.url === '/in/coworking-space/new-delhi/defence-colony')
            this.router.navigate(['/in/coworking-space/delhi/defence-colony']);

          if (event.url === '/in/coworking-space/new-delhi/dwarka')
            this.router.navigate(['/in/coworking-space/delhi/dwarka']);

          if (event.url === '/in/coworking-space/new-delhi/green-park')
            this.router.navigate(['/in/coworking-space/delhi/green-park']);

          if (event.url === '/in/coworking-space/new-delhi/hauz-khas-village')
            this.router.navigate(['/in/coworking-space/delhi/hauz-khas-village']);

          if((event.url).toLowerCase() === '/in/coworking-space/mumbai/andheri')
            this.router.navigate(['/in/coworking-space/mumbai/andheri-east']);

          if (event.url === '/in/coworking-space/new-delhi/janak-puri')
            this.router.navigate(['/in/coworking-space/delhi/janak-puri']);

          if (event.url === '/in/coworking-space/new-delhi/janakpuri')
            this.router.navigate(['/in/coworking-space/delhi/janak-puri']);

          if (event.url === '/in/coworking-space/new-delhi/jhandewalan')
            this.router.navigate(['/in/coworking-space/delhi/jhandewalan']);

          if (event.url === '/in/coworking-space/new-delhi/defence-colony')
            this.router.navigate(['/in/coworking-space/delhi/defence-colony']);

          if (event.url === '/in/coworking-space/new-delhi/kalkaji')
            this.router.navigate(['/in/coworking-space/delhi/kalkaji']);

          if (event.url === '/in/coworking-space/new-delhi/madhu-vihar')
            this.router.navigate(['/in/coworking-space/delhi/madhu-vihar']);

          if (event.url === '/in/coworking-space/new-delhi/mayur-vihar')
            this.router.navigate(['/in/coworking-space/delhi/mayur-vihar']);

          if (event.url === '/in/coworking-space/new-delhi/mohan-estate')
            this.router.navigate(['/in/coworking-space/delhi/mohan-estate']);

          if (event.url === '/in/coworking-space/new-delhi/madhu-vihar')
            this.router.navigate(['/in/coworking-space/delhi/madhu-vihar']);

          if (event.url === '/in/coworking-space/new-delhi/nehru-place')
            this.router.navigate(['/in/coworking-space/delhi/nehru-place']);

          if (event.url === '/in/coworking-space/new-delhi/netaji-subhash-place')
            this.router.navigate([
              '/in/coworking-space/delhi/netaji-subhash-place',
            ]);

          if (event.url === '/in/coworking-space/new-delhi/okhla')
            this.router.navigate(['/in/coworking-space/delhi/okhla']);

          if (event.url === '/in/coworking-space/andheri/andheri')
            this.router.navigate(['/in/coworking-space/mumbai/andheri']);

          if (event.url === '/in/coworking-space/new-delhi/paschim-vihar')
            this.router.navigate(['/in/coworking-space/delhi/paschim-vihar']);

          if (event.url === '/in/coworking-space/new-delhi/pitampura')
            this.router.navigate(['/in/coworking-space/delhi/pitampura']);

          if (event.url === '/coworking-space/new-delhi/preet-vihar')
            this.router.navigate(['/in/coworking-space/delhi/preet-vihar']);

          if (event.url === '/in/coworking-space/new-delhi/rohini')
            this.router.navigate(['/in/coworking-space/delhi/rohini']);

          if (
            event.url ===
            '/in/coworking-space/new-delhi/safdarjung-development-area'
          )
            this.router.navigate(['/in/coworking-space/delhi/safdarjung']);

          if (event.url === '/in/coworking-space/new-delhi/saidullajab')
            this.router.navigate(['/in/coworking-space/delhi/saidullajab']);

          if (event.url === '/in/coworking-space/new-delhi/safdarjung-enclave')
            this.router.navigate(['/in/coworking-space/delhi/safdarjung']);

          if (event.url === '/in/coworking-space/new-delhi/saket')
            this.router.navigate(['/in/coworking-space/delhi/saket']);

          //new delhi url

          if (
            event.url === '/i/in/coworking-space/delhi-division/barakhamba-road'
          )
            this.router.navigate(['/in/coworking-space/delhi/barakhamba']);

          if (
            event.url === '/in/coworking-space/delhi-division/bhikaji-cama-place'
          )
            this.router.navigate([
              '/in/coworking-space/delhi/bhikaji-cama-place',
            ]);

          if (event.url === '/in/coworking-space/delhi-division/defence-colony')
            this.router.navigate(['/in/coworking-space/delhi/defence-colony']);

          if (event.url === '/in/coworking-space/delhi-division/dwarka')
            this.router.navigate(['/in/coworking-space/delhi/dwarka']);

          if (event.url === '/in/coworking-space/delhi-division/green-park')
            this.router.navigate(['/in/coworking-space/delhi/green-park']);

          if (
            event.url === '/in/coworking-space/delhi-division/hauz-khas-village'
          )
            this.router.navigate(['/in/coworking-space/delhi/hauz-khas-village']);

          if (event.url === '/in/coworking-space/delhi-division/janak-puri')
            this.router.navigate(['/in/coworking-space/delhi/janak-puri']);

          if (event.url === '/in/coworking-space/delhi-division/janakpuri')
            this.router.navigate(['/in/coworking-space/delhi/janak-puri']);

          if (event.url === '/in/coworking-space/delhi-division/jhandewalan')
            this.router.navigate(['/in/coworking-space/delhi/jhandewalan']);

          if (event.url === '/in/coworking-space/delhi-division/defence-colony')
            this.router.navigate(['/in/coworking-space/delhi/defence-colony']);

          if (event.url === '/in/coworking-space/delhi-division/kalkaji')
            this.router.navigate(['/in/coworking-space/delhi/kalkaji']);

          if (event.url === '/in/coworking-space/delhi-division/madhu-vihar')
            this.router.navigate(['/in/coworking-space/delhi/madhu-vihar']);

          if (event.url === '/in/coworking-space/delhi-division/mayur-vihar')
            this.router.navigate(['/in/coworking-space/delhi/mayur-vihar']);

          if (event.url === '/in/coworking-space/delhi-division/mohan-estate')
            this.router.navigate(['/in/coworking-space/delhi/mohan-estate']);

          if (event.url === '/in/coworking-space/delhi-division/madhu-vihar')
            this.router.navigate(['/in/coworking-space/delhi/madhu-vihar']);

          if (event.url === '/in/coworking-space/delhi-division/nehru-place')
            this.router.navigate(['/in/coworking-space/delhi/nehru-place']);

          if (
            event.url ===
            '/in/coworking-space/delhi-division/netaji-subhash-place'
          )
            this.router.navigate([
              '/in/coworking-space/delhi/netaji-subhash-place',
            ]);

          if (event.url === '/in/coworking-space/delhi-division/okhla')
            this.router.navigate(['/in/coworking-space/delhi/okhla']);

          if (event.url === '/in/coworking-space/andheri/andheri')
            this.router.navigate(['/in/coworking-space/mumbai/andheri']);

          if (event.url === '/in/coworking-space/delhi-division/paschim-vihar')
            this.router.navigate(['/in/coworking-space/delhi/paschim-vihar']);

          if (event.url === '/in/coworking-space/delhi-division/pitampura')
            this.router.navigate(['/in/coworking-space/delhi/pitampura']);

          if (event.url === '/coworking-space/delhi-division/preet-vihar')
            this.router.navigate(['/in/coworking-space/delhi/preet-vihar']);

          if (event.url === '/in/coworking-space/delhi-division/rohini')
            this.router.navigate(['/in/coworking-space/delhi/rohini']);

          if (
            event.url ===
            '/in/coworking-space/delhi-division/safdarjung-development-area'
          )
            this.router.navigate(['/in/coworking-space/delhi/safdarjung']);

          if (event.url === '/in/coworking-space/delhi-division/saidullajab')
            this.router.navigate(['/in/coworking-space/delhi/saidullajab']);

          if (
            event.url === '/in/coworking-space/delhi-division/safdarjung-enclave'
          )
            this.router.navigate(['/in/coworking-space/delhi/safdarjung']);

          if (event.url === '/in/coworking-space/delhi-division/saket')
            this.router.navigate(['/in/coworking-space/delhi/saket']);

          //Jaipur

          if (event.url === '/in/coworking-space/jaipur-division/jaipur')
            this.router.navigate(['/in/coworking/jaipur']);

          if (event.url === '/in/coworking-space/jaipur-division/ashok-nagar')
            this.router.navigate(['/in/coworking-space/jaipur/ashok-nagar']);

          if (event.url === '/in/coworking-space/jaipur-division/bais-godam')
            this.router.navigate(['/in/coworking-space/jaipur/bais-godam']);

          if (event.url === '/in/coworking-space/jaipur-division/brijlalpura')
            this.router.navigate(['/in/coworking-space/jaipur/brijlalpura']);

          if (event.url === '/in/coworking-space/jaipur-division/civil-lines')
            this.router.navigate(['/in/coworking-space/jaipur/civil-lines']);

          if (event.url === '/in/coworking-space/jaipur-division/durgapura')
            this.router.navigate(['/in/coworking-space/jaipur/durgapura']);

          if (event.url === '/in/coworking-space/jaipur-division/gopal-pura-mode')
            this.router.navigate(['/in/coworking-space/jaipur/gopal-pura-mode']);

          if (event.url === '/in/coworking-space/jaipur-division/heerapura')
            this.router.navigate(['/in/coworking-space/jaipur/heerapura']);

          if (event.url === '/in/coworking-space/jaipur-division/jagatpura')
            this.router.navigate(['/in/coworking-space/jaipur/jagatpura']);

          if (event.url === '/in/coworking-space/jaipur-division/jawahar-nagar')
            this.router.navigate(['/in/coworking-space/jaipur/jawahar-nagar']);

          if (event.url === '/in/coworking-space/jaipur-division/lalkothi')
            this.router.navigate(['/in/coworking-space/jaipur/lalkothi']);

          if (event.url === '/in/coworking-space/jaipur-division/malviya-nagar')
            this.router.navigate(['/in/coworking-space/jaipur/malviya-nagar']);

          if (event.url === '/in/coworking-space/jaipur-division/mansarovar')
            this.router.navigate(['/in/coworking-space/jaipur/mansarovar']);

          if (event.url === '/in/coworking-space/jaipur-division/muktanand-nagar')
            this.router.navigate(['/in/coworking-space/jaipur/muktanand-nagar']);

          if (event.url === '/in/coworking-space/jaipur-division/nirman-nagar')
            this.router.navigate(['/in/coworking-space/jaipur/nirman-nagar']);

          if (event.url === '/in/coworking-space/jaipur-division/panchyawala')
            this.router.navigate(['/in/coworking-space/jaipur/panchyawala']);

          if (
            event.url === '/in/coworking-space/jaipur-division/rajiv-vihar-colony'
          )
            this.router.navigate([
              '/in/coworking-space/jaipur/rajiv-vihar-colony',
            ]);

          if (event.url === '/in/coworking-space/jaipur-division/ramnagar')
            this.router.navigate(['/in/coworking-space/jaipur/ramnagar']);

          if (event.url === '/in/coworking-space/jaipur-division/shanti-nagar')
            this.router.navigate(['/in/coworking-space/jaipur/shanti-nagar']);

          if (event.url === '/in/coworking-space/jaipur-division/shyam-nagar')
            this.router.navigate(['/in/coworking-space/jaipur/shyam-nagar']);

          if (event.url === '/in/coworking-space/jaipur-division/tonk-road')
            this.router.navigate(['/in/coworking-space/jaipur/tonk-road']);

          if (event.url === '/in/coworking-space/jaipur-division/vaishali-nagar')
            this.router.navigate(['/in/coworking-space/jaipur/vaishali-nagar']);

          //Jaipur end

          if (event.url === '/in/coworking-space/new-delhi/shahpur')
            this.router.navigate(['/in/coworking-space/delhi/shahpur']);

          if (event.url === '/in/coworking-space/new-delhi/shahpur-jat')
            this.router.navigate(['/in/coworking-space/delhi/shahpur-jat']);

          if (event.url === '/in/coworking-space/new-delhi/shalimar-bagh')
            this.router.navigate(['/in/coworking-space/delhi/shalimar-bagh']);

          if (event.url === '/in/coworking-space/new-delhi/delhi-division')
            this.router.navigate(['/in/coworking-space/delhi/south-delhi']);

          if (event.url === '/in/coworking-space/new-delhi/tilak-marg')
            this.router.navigate(['/in/coworking-space/delhi/tilak-marg']);

          if (event.url === '/in/coworking-space/new-delhi/turkman-gate')
            this.router.navigate(['/in/coworking-space/delhi/turkman-gate']);

          if (event.url === '/in/coworking-space/new-delhi/wazirpur')
            this.router.navigate(['/in/coworking-space/delhi/wazirpur']);

          if (event.url === '/in/coworking-space/central-delhi/turkman-gate')
            this.router.navigate(['/in/coworking-space/delhi/turkman-gate']);
          if (event.url === '/in/coworking-space/south-delhi/east-of-kailash')
            this.router.navigate(['/in/coworking-space/delhi/east-of-kailash']);
          if (event.url === '/in/coworking-space/east-delhi/anand-vihar')
            this.router.navigate(['/in/coworking-space/delhi/anand-vihar']);
          if (
            event.url ===
            '/in/coworking-space/south-delhi/mohan-cooperative-industrial-estate'
          )
            this.router.navigate([
              '/in/coworking-space/delhi/mohan-cooperative-industrial-estate',
            ]);
          if (event.url === '/in/coworking-space/central-delhi/jhandewalan')
            this.router.navigate(['/in/coworking-space/delhi/jhandewalan']);
          if (event.url === '/in/coworking-space/south-delhi/nehru-place')
            this.router.navigate(['/in/coworking-space/delhi/nehru-place']);
          if (event.url === '/in/coworking-space/new-delhi/tilak-marg')
            this.router.navigate(['/in/coworking-space/delhi/tilak-marg']);
          if (event.url === '/in/coworking-space/south-delhi/badarpur')
            this.router.navigate(['/in/coworking-space/delhi/badarpur']);
          if (event.url === '/in/coworking-space/south-west-delhi/madhu-vihar')
            this.router.navigate(['/in/coworking-space/delhi/madhu-vihar']);
          if (event.url === '/in/coworking-space/south-west-delhi/green-park')
            this.router.navigate(['/in/coworking-space/delhi/green-park']);
          if (event.url === '/in/coworking-space/south-delhi/hauz-khas')
            this.router.navigate(['/in/coworking-space/delhi/hauz-khas']);
          if (event.url === '/in/coworking-space/south-delhi/saidulajab')
            this.router.navigate(['/in/coworking-space/delhi/saidulajab']);
          if (event.url === '/in/coworking-space/south-delhi/kalkaji')
            this.router.navigate(['/in/coworking-space/delhi/kalkaji']);
          if (event.url === '/in/coworking-space/west-delhi/janakpuri')
            this.router.navigate(['/in/coworking-space/delhi/janakpuri']);
          if (event.url === '/in/coworking-space/east-delhi/preet-vihar')
            this.router.navigate(['/in/coworking-space/delhi/preet-vihar']);
          if (
            event.url ===
            '/in/coworking-space/north-west-delhi/netaji-subhash-place'
          )
            this.router.navigate([
              '/in/coworking-space/delhi/netaji-subhash-place',
            ]);
          if (event.url === '/in/coworking-space/north-west-delhi/pitam-pura')
            this.router.navigate(['/in/coworking-space/delhi/pitam-pura']);
          if (event.url === '/in/coworking-space/south-west-delhi/dwarka')
            this.router.navigate(['/in/coworking-space/delhi/dwarka']);
          if (event.url === '/in/coworking-space/south-delhi/okhla')
            this.router.navigate(['/in/coworking-space/delhi/okhla']);
          if (event.url === '/in/coworking-space/west-delhi/janakpuri')
            this.router.navigate(['/in/coworking-space/delhi/janakpuri']);
          if (event.url === '/in/coworking-space/north-west-delhi/rohini')
            this.router.navigate(['/in/coworking-space/delhi/rohini']);
          if (
            event.url ===
            '/in/coworking-space/south-west-delhi/safdarjung-enclave'
          )
            this.router.navigate([
              '/in/coworking-space/delhi/safdarjung-enclave',
            ]);
          if (event.url === '/in/coworking-space/north-west-delhi/shalimar-bagh')
            this.router.navigate(['/in/coworking-space/delhi/shalimar-bagh']);
          if (event.url === '/in/coworking-space/south-delhi/shahpur-jat')
            this.router.navigate(['/in/coworking-space/delhi/shahpur-jat']);
          if (
            event.url ===
            '/in/coworking-space/south-delhi/safdarjung-development-area'
          )
            this.router.navigate([
              '/in/coworking-space/delhi/safdarjung-development-area',
            ]);
          if (event.url === '/in/coworking-space/east-delhi/mayur-vihar')
            this.router.navigate(['/in/coworking-space/delhi/mayur-vihar']);
          if (event.url === '/in/coworking-space/south-delhi/defence-colony')
            this.router.navigate(['/in/coworking-space/delhi/defence-colony']);
          if (event.url === '/in/coworking-space/south-delhi/defence-colony')
            this.router.navigate(['/in/coworking-space/delhi/defence-colony']);

          if (event.url === '/in/coworking-space/west-delhi/paschim-vihar')
            this.router.navigate(['/in/coworking-space/delhi/paschim-vihar']);
          if (event.url === '/in/coworking-space/north-west-delhi/wazirpur')
            this.router.navigate(['/in/coworking-space/delhi/wazirpur']);
          if (
            event.url ===
            '/in/coworking-space/south-west-delhi/bhikaji-cama-place'
          )
            this.router.navigate([
              '/in/coworking-space/delhi/bhikaji-cama-place',
            ]);

          //new delhi url

          if (event.url === '/in/coworking-space/delhi-division/shahpur')
            this.router.navigate(['/in/coworking-space/delhi/shahpur']);

          if (event.url === '/in/coworking-space/delhi-division/shahpur-jat')
            this.router.navigate(['/in/coworking-space/delhi/shahpur-jat']);

          if (event.url === '/in/coworking-space/delhi-division/shalimar-bagh')
            this.router.navigate(['/in/coworking-space/delhi/shalimar-bagh']);

          if (event.url === '/in/coworking-space/delhi-division/tilak-marg')
            this.router.navigate(['/in/coworking-space/delhi/tilak-marg']);

          if (event.url === '/in/coworking-space/delhi-division/turkman-gate')
            this.router.navigate(['/in/coworking-space/delhi/turkman-gate']);

          if (event.url === '/in/coworking-space/delhi-division/wazirpur')
            this.router.navigate(['/in/coworking-space/delhi/wazirpur']);

          if (event.url === '/in/coworking-space/delhi-division/turkman-gate')
            this.router.navigate(['/in/coworking-space/delhi/turkman-gate']);
          if (event.url === '/in/coworking-space/delhi-division/east-of-kailash')
            this.router.navigate(['/in/coworking-space/delhi/east-of-kailash']);
          if (event.url === '/in/coworking-space/delhi-division/anand-vihar')
            this.router.navigate(['/in/coworking-space/delhi/anand-vihar']);
          if (
            event.url ===
            '/in/coworking-space/delhi-division/mohan-cooperative-industrial-estate'
          )
            this.router.navigate([
              '/in/coworking-space/delhi/mohan-cooperative-industrial-estate',
            ]);
          if (event.url === '/in/coworking-space/delhi-division/jhandewalan')
            this.router.navigate(['/in/coworking-space/delhi/jhandewalan']);
          if (event.url === '/in/coworking-space/delhi-division/nehru-place')
            this.router.navigate(['/in/coworking-space/delhi/nehru-place']);

          if (event.url === '/in/coworking-space/delhi-division/badarpur')
            this.router.navigate(['/in/coworking-space/delhi/badarpur']);
          if (event.url === '/in/coworking-space/delhi-division/madhu-vihar')
            this.router.navigate(['/in/coworking-space/delhi/madhu-vihar']);
          if (event.url === '/in/coworking-space/delhi-division/green-park')
            this.router.navigate(['/in/coworking-space/delhi/green-park']);
          if (event.url === '/in/coworking-space/delhi-division/hauz-khas')
            this.router.navigate(['/in/coworking-space/delhi/hauz-khas']);
          if (event.url === '/in/coworking-space/delhi-division/saidulajab')
            this.router.navigate(['/in/coworking-space/delhi/saidulajab']);
          if (event.url === '/in/coworking-space/delhi-division/kalkaji')
            this.router.navigate(['/in/coworking-space/delhi/kalkaji']);
          if (event.url === '/in/coworking-space/delhi-division/janakpuri')
            this.router.navigate(['/in/coworking-space/delhi/janakpuri']);
          if (event.url === '/in/coworking-space/delhi-division/preet-vihar')
            this.router.navigate(['/in/coworking-space/delhi/preet-vihar']);
          if (
            event.url ===
            '/in/coworking-space/north-delhi-division/netaji-subhash-place'
          )
            this.router.navigate([
              '/in/coworking-space/delhi/netaji-subhash-place',
            ]);
          if (event.url === '/in/coworking-space/north-delhi-division/pitam-pura')
            this.router.navigate(['/in/coworking-space/delhi/pitam-pura']);
          if (event.url === '/in/coworking-space/delhi-division/dwarka')
            this.router.navigate(['/in/coworking-space/delhi/dwarka']);
          if (event.url === '/in/coworking-space/delhi-division/okhla')
            this.router.navigate(['/in/coworking-space/delhi/okhla']);
          if (event.url === '/in/coworking-space/delhi-division/janakpuri')
            this.router.navigate(['/in/coworking-space/delhi/janakpuri']);
          if (event.url === '/in/coworking-space/north-delhi-division/rohini')
            this.router.navigate(['/in/coworking-space/delhi/rohini']);
          if (
            event.url === '/in/coworking-space/delhi-division/safdarjung-enclave'
          )
            this.router.navigate([
              '/in/coworking-space/delhi/safdarjung-enclave',
            ]);
          if (
            event.url === '/in/coworking-space/north-delhi-division/shalimar-bagh'
          )
            this.router.navigate(['/in/coworking-space/delhi/shalimar-bagh']);
          if (event.url === '/in/coworking-space/delhi-division/shahpur-jat')
            this.router.navigate(['/in/coworking-space/delhi/shahpur-jat']);
          if (
            event.url ===
            '/in/coworking-space/delhi-division/safdarjung-development-area'
          )
            this.router.navigate([
              '/in/coworking-space/delhi/safdarjung-development-area',
            ]);
          if (event.url === '/in/coworking-space/delhi-division/mayur-vihar')
            this.router.navigate(['/in/coworking-space/delhi/mayur-vihar']);
          if (event.url === '/in/coworking-space/delhi-division/defence-colony')
            this.router.navigate(['/in/coworking-space/delhi/defence-colony']);
          if (event.url === '/in/coworking-space/delhi-division/defence-colony')
            this.router.navigate(['/in/coworking-space/delhi/defence-colony']);

          if (event.url === '/in/coworking-space/delhi-division/paschim-vihar')
            this.router.navigate(['/in/coworking-space/delhi/paschim-vihar']);
          if (event.url === '/in/coworking-space/north-delhi-division/wazirpur')
            this.router.navigate(['/in/coworking-space/delhi/wazirpur']);
          if (
            event.url === '/in/coworking-space/delhi-division/bhikaji-cama-place'
          )
            this.router.navigate([
              '/in/coworking-space/delhi/bhikaji-cama-place',
            ]);

          //new delhi url end

          if(event.url === '/in/coworking/new-delhi')
          this.router.navigate(['/in/coworking/delhi']);

          // if (event.url === '/in/coworking/delhi')
          //   this.router.navigate(['/in/coworking/new-delhi']);
        }
      });
      // this.createLinkForCanonicalURL();

      if (isPlatformBrowser(this.platformId)) {
        this.renderer.listen('window', 'click', (e: Event) => {
          var dropdowns = document.getElementsByClassName("dropdown-menu");
          if (dropdowns.length > 0) {
            for (let i = 0; i < dropdowns.length; i++) {
              var openDropdown = dropdowns[i];
              if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
              }
            }
          }
        })
      }
    }
  }

  public hidden_routes = ['in/coworking', 'in/coworking-space'];

  ngOnInit() {

    if (isPlatformBrowser(this.platformId)) {
      if (window.innerWidth < 700) {
        this.isMobile = true;
      }
      this.seoService.createLinkForCanonicalURL();
      this.initialSubscribers();
    }
  }

 
  

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
    //   $('#subscribe').ajaxChimp({
    //     language: 'eng',
    //     url: 'http://kwst.us18.list-manage.com/subscribe/post?u=42df802713d4826a4b137cd9e&id=815d11e811',
    //   });
    //   $.ajaxChimp.translations.eng = {
    //     submit: 'Submitting...',
    //     0: '<i class="fa fa-check"></i> We will be in touch soon!',
    //     1: '<i class="fa fa-warning"></i> You must enter a valid e-mail address.',
    //     2: '<i class="fa fa-warning"></i> E-mail address is not valid.',
    //     3: '<i class="fa fa-warning"></i> E-mail address is not valid.',
    //     4: '<i class="fa fa-warning"></i> E-mail address is not valid.',
    //     5: '<i class="fa fa-warning"></i> E-mail address is not valid.',
    //   };
    }
  }

  private initialSubscribers(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.userService.loginUserDetails.subscribe((user: any) => {
        // this.userDetails = user;
        this.userDetails = JSON.parse(localStorage.getItem('userDetails')) || null;
      });
      this.userService.isLoggedIn.subscribe((result: any) => {
        // this.isLoggedIn = result;
        this.isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn')) || null;
      });
    }
  }

  openLoginDialog() {
    let config = new MatDialogConfig();
    config.viewContainerRef = this.login_viewContainerRef;
    config.panelClass = 'dialogClass-l';
    config.hasBackdrop = false;
    // config.width = '60%';
    // config.height = 'auto';


    this.login_dialog.closeAll();
    this.login_dialogRef = this.login_dialog.open(LoginDialog, config);
    this.login_dialogRef.componentInstance.flag = 1;
    this.login_dialogRef.componentInstance.ref = this.login_dialogRef;
    this.login_dialogRef.afterClosed().subscribe((result) => {
      if (result || result?.success) {
        // window.location.reload();
        this.initialSubscribers();
      }
      this.login_dialogRef = null;
    });
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      this.loginRegisterService.userLogOut().subscribe((result: any) => {
        localStorage.clear();
        if(result.success){
          localStorage.removeItem('authToken');
          localStorage.removeItem('isLoggedIn');
          localStorage.removeItem('userDetails');
          if (isPlatformBrowser(this.platformId)) {
            window.location.reload();
          }
          this.userService.userDetails.next(null);
          this.userService.isLoggedInSource.next(false);
          // this.toastr.success(result.message || "Logout successfully!");
          // this.socialAuthService.signOut();
          // this.router.navigate(['']);
        }
        this.toastr.success("Logout successfully!");
      }, (error) => {      
        localStorage.clear();
        this.toastr.success("Logout successfully!");
        this.userService.userDetails.next(null);
        this.userService.isLoggedInSource.next(false);

      })
    }
  }

  basicInfo() {
    this._memberService
      .getBasicInfo()
      .then((res) => {
        let user_details = { is_logged_in: false, shorlists: [] };
        if (res && res.success) {
          user_details = Object.assign({}, res.data);
          user_details.is_logged_in = true;
        }
        this._appGlobals.setUserDetails(user_details);
      })
      .catch((err) => {
        // this.openSnackBar('Not Logged In', 'Dismiss');
      });
  }

  public isFooterHidden(current_route_obj) {
    let current_route =
      current_route_obj && current_route_obj.snapshot.routeConfig.path;
    if (current_route) {
      return this.hidden_routes.indexOf(current_route) >= 0 ? true : false;
    } else {
      return false;
    }
  }

  public onMenueOpenClose(){
    if (isPlatformBrowser(this.platformId)) {
      document.getElementById("myDropdown").classList.toggle("show");
    }
  }

  public onMenueOpenClose2(){
    if (isPlatformBrowser(this.platformId)) {
      document.getElementById("myDropdown2").classList.toggle("show");
    }
  }

  title = 'flexo-aggregation-website';
}
