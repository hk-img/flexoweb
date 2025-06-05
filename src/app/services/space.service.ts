import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import 'rxjs/add/operator/toPromise';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, delay, distinctUntilChanged, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AppGlobals } from './app-globals';

@Injectable({
	providedIn: 'root',
  })
export class SpaceService {
  private showScheduleSubject = new BehaviorSubject<boolean>(false);
  showSchedule$ = this.showScheduleSubject.asObservable()
  public faqsSubject = new BehaviorSubject<any[]>([]);
  public faqs = this.faqsSubject.asObservable().pipe(distinctUntilChanged());
  constructor(private http: HttpClient, private appGlobals: AppGlobals) {}
  get getFaqs(): any {
    return this.faqsSubject.value || [];
  }
  private base_url = environment.apiUrl + `/api/v1/managers/`;
  private validateSessionUrl = this.base_url + 'validateSession';
  private getAllCitiesUrl = environment.apiUrl + `/api/v1/getAllCities`;
  getCityAndLocationInfo =
    environment.apiUrl + `/api/v1/spaces/getCityAndLocationInfo`;
  private voteDevoteEndPoint = environment.apiUrl + `/api/v1/spaces/vote`;
  
  private getSpacesByCityUrl =
    environment.apiUrl + `/api/v1/spaces/getSpacesByCity`;
  private addBookingDetailsUrl =
    environment.apiUrl + '/api/v1/common/addBookingAndSendInvoice';
  private checkAvailabilityUrl =
    environment.apiUrl + '/api/v1/common/check_availability';
  private getSpaceConfigDetailsUrl =
    environment.apiUrl + '/api/v1/app/user/spaceConfig';
  private getInRadiusUrl = environment.apiUrl + '/api/v1/spaces/allInRadius';
  private getSpaceDetailsUrl = environment.apiUrl + '/api/v1/spaces/details';
  private getAllTrendingUrl =
    environment.apiUrl + '/api/v1/spaces/getAllTrending';
  private getAllSitemapsUrl = environment.apiUrl + `/api/v1/get_sitemaps`;
  private getShortlistSpacesUrl =
    environment.apiUrl + `/api/v1/spaces/getShortlistSpaces`;

  private fetchNearbySpaces =
    environment.apiUrl + `/api/v1/spaces/fetchNearbySpaces`;

  getQuestionByRadiusUrl =
    environment.apiUrl + `/api/v1/faqs/getQuestionByRadius`;

  private getAmenitiesURL = environment.apiUrl + '/api/v1/user/getAllAmenities';

  private urlRejectBookinonPaymentExpiry = environment.apiUrl + '/api/v1/user/rejectBookingOnPaymentExpiry';
  private userBookingUrl = environment.apiUrl + '/api/v1/user/cancelBooking';

  getLocationUrl = environment.apiUrl + '/api/v1/user/getAllLocations';
	shortDetailsUrl = environment.apiUrl + '/api/v1/spaces/getSpaceDetails/';

  getQuestionByLocationNameUrl =
    environment.apiUrl + `/api/v1/faqs/getQuestionByLocationName`;
  getFaqsBySpaceIdUrl = environment.apiUrl + `/api/v1/faqs/getFaqsBySpaceId`;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  private filteredSpacesByLocation = new Subject<any>();
  filteredSpaces$ = this.filteredSpacesByLocation.asObservable();

  sendFilteredSpace(space: boolean) {
	this.filteredSpacesByLocation.next(space);
  }

  countryCodes =[
		{
		  "name": "Afghanistan",
		  "dialcode": "+93",
		  "flag": "https://flagcdn.com/w320/af.png",
		  "number-of-digits-in-number": 9
		},
		{
		  "name": "Albania",
		  "dialcode": "+355",
		  "flag": "https://flagcdn.com/w320/al.png",
		  "number-of-digits-in-number": 8
		},
		{
		  "name": "Algeria",
		  "dialcode": "+213",
		  "flag": "https://flagcdn.com/w320/dz.png",
		  "number-of-digits-in-number": 9
		},
		{
		  "name": "Andorra",
		  "dialcode": "+376",
		  "flag": "https://flagcdn.com/w320/ad.png",
		  "number-of-digits-in-number": 6
		},
		{
		  "name": "Angola",
		  "dialcode": "+244",
		  "flag": "https://flagcdn.com/w320/ao.png",
		  "number-of-digits-in-number": 9
		},
		{
		  "name": "Antigua and Barbuda",
		  "dialcode": "+1-268",
		  "flag": "https://flagcdn.com/w320/ag.png",
		  "number-of-digits-in-number": 7
		},
		{
		  "name": "Argentina",
		  "dialcode": "+54",
		  "flag": "https://flagcdn.com/w320/ar.png",
		  "number-of-digits-in-number": 10
		},
		{
		  "name": "Armenia",
		  "dialcode": "+374",
		  "flag": "https://flagcdn.com/w320/am.png",
		  "number-of-digits-in-number": 8
		},
		{
		  "name": "Australia",
		  "dialcode": "+61",
		  "flag": "https://flagcdn.com/w320/au.png",
		  "number-of-digits-in-number": 9
		},
		{
		  "name": "Austria",
		  "dialcode": "+43",
		  "flag": "https://flagcdn.com/w320/at.png",
		  "number-of-digits-in-number": 4
		},
		{
		  "name": "Azerbaijan",
		  "dialcode": "+994",
		  "flag": "https://flagcdn.com/w320/az.png",
		  "number-of-digits-in-number": 9
		},
		{
		  "name": "Bahamas",
		  "dialcode": "+1-242",
		  "flag": "https://flagcdn.com/w320/bs.png",
		  "number-of-digits-in-number": 7
		},
		{
		  "name": "Bahrain",
		  "dialcode": "+973",
		  "flag": "https://flagcdn.com/w320/bh.png",
		  "number-of-digits-in-number": 8
		},
		{
		  "name": "Bangladesh",
		  "dialcode": "+880",
		  "flag": "https://flagcdn.com/w320/bd.png",
		  "number-of-digits-in-number": 10
		},
		{
		  "name": "Barbados",
		  "dialcode": "+1-246",
		  "flag": "https://flagcdn.com/w320/bb.png",
		  "number-of-digits-in-number": 7
		},
		{
		  "name": "Belarus",
		  "dialcode": "+375",
		  "flag": "https://flagcdn.com/w320/by.png",
		  "number-of-digits-in-number": 9
		},
		{
		  "name": "Belgium",
		  "dialcode": "+32",
		  "flag": "https://flagcdn.com/w320/be.png",
		  "number-of-digits-in-number": 8
		},
		{
		  "name": "Belize",
		  "dialcode": "+501",
		  "flag": "https://flagcdn.com/w320/bz.png",
		  "number-of-digits-in-number": 7
		},
		{
		  "name": "Benin",
		  "dialcode": "+229",
		  "flag": "https://flagcdn.com/w320/bj.png",
		  "number-of-digits-in-number": 8
		},
		{
		  "name": "Bhutan",
		  "dialcode": "+975",
		  "flag": "https://flagcdn.com/w320/bt.png",
		  "number-of-digits-in-number": 8
		},
		{
		  "name": "Bolivia",
		  "dialcode": "+591",
		  "flag": "https://flagcdn.com/w320/bo.png",
		  "number-of-digits-in-number": 8
		},
		{
		  "name": "Bosnia and Herzegovina",
		  "dialcode": "+387",
		  "flag": "https://flagcdn.com/w320/ba.png",
		  "number-of-digits-in-number": 8
		},
		{
		  "name": "Botswana",
		  "dialcode": "+267",
		  "flag": "https://flagcdn.com/w320/bw.png",
		  "number-of-digits-in-number": 7
		},
		{
		  "name": "Brazil",
		  "dialcode": "+55",
		  "flag": "https://flagcdn.com/w320/br.png",
		  "number-of-digits-in-number": 11
		},
		{
		  "name": "Brunei",
		  "dialcode": "+673",
		  "flag": "https://flagcdn.com/w320/bn.png",
		  "number-of-digits-in-number": 7
		},
		{
		  "name": "Bulgaria",
		  "dialcode": "+359",
		  "flag": "https://flagcdn.com/w320/bg.png",
		  "number-of-digits-in-number": 7
		},
		{
		  "name": "Burkina Faso",
		  "dialcode": "+226",
		  "flag": "https://flagcdn.com/w320/bf.png",
		  "number-of-digits-in-number": 8
		},
		{
		  "name": "Burundi",
		  "dialcode": "+257",
		  "flag": "https://flagcdn.com/w320/bi.png",
		  "number-of-digits-in-number": 8
		},
		{
		  "name": "Cabo Verde",
		  "dialcode": "+238",
		  "flag": "https://flagcdn.com/w320/cv.png",
		  "number-of-digits-in-number": 7
		},
		{
		  "name": "Cambodia",
		  "dialcode": "+855",
		  "flag": "https://flagcdn.com/w320/kh.png",
		  "number-of-digits-in-number": 9
		},
		{
		  "name": "Cameroon",
		  "dialcode": "+237",
		  "flag": "https://flagcdn.com/w320/cm.png",
		  "number-of-digits-in-number": 9
		},
		{
		  "name": "Canada",
		  "dialcode": "+1",
		  "flag": "https://flagcdn.com/w320/ca.png",
		  "number-of-digits-in-number": 10
		},
		{
		  "name": "Central African Republic",
		  "dialcode": "+236",
		  "flag": "https://flagcdn.com/w320/cf.png",
		  "number-of-digits-in-number": 8
		},
		{
		  "name": "Chad",
		  "dialcode": "+235",
		  "flag": "https://flagcdn.com/w320/td.png",
		  "number-of-digits-in-number": 8
		},
		{
		  "name": "Chile",
		  "dialcode": "+56",
		  "flag": "https://flagcdn.com/w320/cl.png",
		  "number-of-digits-in-number": 9
		},
		{
		  "name": "China",
		  "dialcode": "+86",
		  "flag": "https://flagcdn.com/w320/cn.png",
		  "number-of-digits-in-number": 11
		},
		{
		  "name": "Colombia",
		  "dialcode": "+57",
		  "flag": "https://flagcdn.com/w320/co.png",
		  "number-of-digits-in-number": 10
		},
		{
		  "name": "Comoros",
		  "dialcode": "+269",
		  "flag": "https://flagcdn.com/w320/km.png",
		  "number-of-digits-in-number": 7
		},
		{
		  "name": "Congo",
		  "dialcode": "+242",
		  "flag": "https://flagcdn.com/w320/cg.png",
		  "number-of-digits-in-number": 7
		},
		{
		  "name": "Congo, Democratic Republic of the",
		  "dialcode": "+243",
		  "flag": "https://flagcdn.com/w320/cd.png",
		  "number-of-digits-in-number": 9
		},
		{
		  "name": "Costa Rica",
		  "dialcode": "+506",
		  "flag": "https://flagcdn.com/w320/cr.png",
		  "number-of-digits-in-number": 8
		},
		{
		  "name": "Croatia",
		  "dialcode": "+385",
		  "flag": "https://flagcdn.com/w320/hr.png",
		  "number-of-digits-in-number": 9
		},
		{
		  "name": "Cuba",
		  "dialcode": "+53",
		  "flag": "https://flagcdn.com/w320/cu.png",
		  "number-of-digits-in-number": 8
		},
		{
		  "name": "Cyprus",
		  "dialcode": "+357",
		  "flag": "https://flagcdn.com/w320/cy.png",
		  "number-of-digits-in-number": 8
		},
		{
		  "name": "Czech Republic",
		  "dialcode": "+420",
		  "flag": "https://flagcdn.com/w320/cz.png",
		  "number-of-digits-in-number": 9
		},
		{
		  "name": "Denmark",
		  "dialcode": "+45",
		  "flag": "https://flagcdn.com/w320/dk.png",
		  "number-of-digits-in-number": 8
		},
		{
		  "name": "Djibouti",
		  "dialcode": "+253",
		  "flag": "https://flagcdn.com/w320/dj.png",
		  "number-of-digits-in-number": 6
		},
		{
		  "name": "Dominica",
		  "dialcode": "+1-767",
		  "flag": "https://flagcdn.com/w320/dm.png",
		  "number-of-digits-in-number": 7
		},
		{
		  "name": "Dominican Republic",
		  "dialcode": "+1-809",
		  "flag": "https://flagcdn.com/w320/do.png",
		  "number-of-digits-in-number": 10
		},
		{
		  "name": "Ecuador",
		  "dialcode": "+593",
		  "flag": "https://flagcdn.com/w320/ec.png",
		  "number-of-digits-in-number": 9
		},
		{
		  "name": "Egypt",
		  "dialcode": "+20",
		  "flag": "https://flagcdn.com/w320/eg.png",
		  "number-of-digits-in-number": 10
		},
		{
		  "name": "El Salvador",
		  "dialcode": "+503",
		  "flag": "https://flagcdn.com/w320/sv.png",
		  "number-of-digits-in-number": 8
		},
		{
		  "name": "Equatorial Guinea",
		  "dialcode": "+240",
		  "flag": "https://flagcdn.com/w320/gq.png",
		  "number-of-digits-in-number": 9
		},
		{
		  "name": "Eritrea",
		  "dialcode": "+291",
		  "flag": "https://flagcdn.com/w320/er.png",
		  "number-of-digits-in-number": 7
		},
		{
		  "name": "Estonia",
		  "dialcode": "+372",
		  "flag": "https://flagcdn.com/w320/ee.png",
		  "number-of-digits-in-number": 7
		},
		{
		  "name": "Eswatini",
		  "dialcode": "+268",
		  "flag": "https://flagcdn.com/w320/sz.png",
		  "number-of-digits-in-number": 8
		},
		{
		  "name": "Ethiopia",
		  "dialcode": "+251",
		  "flag": "https://flagcdn.com/w320/et.png",
		  "number-of-digits-in-number": 10
		},
		{
		  "name": "Fiji",
		  "dialcode": "+679",
		  "flag": "https://flagcdn.com/w320/fj.png",
		  "number-of-digits-in-number": 7
		},
		{
		  "name": "Finland",
		  "dialcode": "+358",
		  "flag": "https://flagcdn.com/w320/fi.png",
		  "number-of-digits-in-number": 5
		},
		{
		  "name": "France",
		  "dialcode": "+33",
		  "flag": "https://flagcdn.com/w320/fr.png",
		  "number-of-digits-in-number": 9
		},
		{
		  "name": "Gabon",
		  "dialcode": "+241",
		  "flag": "https://flagcdn.com/w320/ga.png",
		  "number-of-digits-in-number": 7
		},
		{
		  "name": "Gambia",
		  "dialcode": "+220",
		  "flag": "https://flagcdn.com/w320/gm.png",
		  "number-of-digits-in-number": 7
		},
		{
		  "name": "Georgia",
		  "dialcode": "+995",
		  "flag": "https://flagcdn.com/w320/ge.png",
		  "number-of-digits-in-number": 9
		},
		{
		  "name": "Germany",
		  "dialcode": "+49",
		  "flag": "https://flagcdn.com/w320/de.png",
		  "number-of-digits-in-number": 11
		},
		{
		  "name": "Ghana",
		  "dialcode": "+233",
		  "flag": "https://flagcdn.com/w320/gh.png",
		  "number-of-digits-in-number": 9
		},
		{
		  "name": "Greece",
		  "dialcode": "+30",
		  "flag": "https://flagcdn.com/w320/gr.png",
		  "number-of-digits-in-number": 10
		},
		{
		  "name": "Grenada",
		  "dialcode": "+1-473",
		  "flag": "https://flagcdn.com/w320/gd.png",
		  "number-of-digits-in-number": 7
		},
		{
		  "name": "Guatemala",
		  "dialcode": "+502",
		  "flag": "https://flagcdn.com/w320/gt.png",
		  "number-of-digits-in-number": 8
		},
		{
		  "name": "Guinea",
		  "dialcode": "+224",
		  "flag": "https://flagcdn.com/w320/gn.png",
		  "number-of-digits-in-number": 9
		},
		{
		  "name": "Guinea-Bissau",
		  "dialcode": "+245",
		  "flag": "https://flagcdn.com/w320/gw.png",
		  "number-of-digits-in-number": 7
		},
		{
		  "name": "Guyana",
		  "dialcode": "+592",
		  "flag": "https://flagcdn.com/w320/gy.png",
		  "number-of-digits-in-number": 7
		},
		{
		  "name": "Haiti",
		  "dialcode": "+509",
		  "flag": "https://flagcdn.com/w320/ht.png",
		  "number-of-digits-in-number": 9
		},
		{
		  "name": "Honduras",
		  "dialcode": "+504",
		  "flag": "https://flagcdn.com/w320/hn.png",
		  "number-of-digits-in-number": 8
		},
		{
		  "name": "Hungary",
		  "dialcode": "+36",
		  "flag": "https://flagcdn.com/w320/hu.png",
		  "number-of-digits-in-number": 9
		},
		{
		  "name": "Iceland",
		  "dialcode": "+354",
		  "flag": "https://flagcdn.com/w320/is.png",
		  "number-of-digits-in-number": 7
		},
		{
		  "name": "India",
		  "dialcode": "+91",
		  "flag": "https://flagcdn.com/w320/in.png",
		  "number-of-digits-in-number": 10
		},
		{
		  "name": "Indonesia",
		  "dialcode": "+62",
		  "flag": "https://flagcdn.com/w320/id.png",
		  "number-of-digits-in-number": 10
		},
		{
		  "name": "Iran",
		  "dialcode": "+98",
		  "flag": "https://flagcdn.com/w320/ir.png",
		  "number-of-digits-in-number": 11
		},
		{
		  "name": "Iraq",
		  "dialcode": "+964",
		  "flag": "https://flagcdn.com/w320/iq.png",
		  "number-of-digits-in-number": 10
		},
		{
		  "name": "Ireland",
		  "dialcode": "+353",
		  "flag": "https://flagcdn.com/w320/ie.png",
		  "number-of-digits-in-number": 9
		},
		{
		  "name": "Israel",
		  "dialcode": "+972",
		  "flag": "https://flagcdn.com/w320/il.png",
		  "number-of-digits-in-number": 9
		},
		{
		  "name": "Italy",
		  "dialcode": "+39",
		  "flag": "https://flagcdn.com/w320/it.png",
		  "number-of-digits-in-number": 10
		},
		{
		  "name": "Jamaica",
		  "dialcode": "+1-876",
		  "flag": "https://flagcdn.com/w320/jm.png",
		  "number-of-digits-in-number": 7
		},
		{
		  "name": "Japan",
		  "dialcode": "+81",
		  "flag": "https://flagcdn.com/w320/jp.png",
		  "number-of-digits-in-number": 11
		},
		{
		  "name": "Jordan",
		  "dialcode": "+962",
		  "flag": "https://flagcdn.com/w320/jo.png",
		  "number-of-digits-in-number": 9
		},
		{
		  "name": "Kazakhstan",
		  "dialcode": "+7",
		  "flag": "https://flagcdn.com/w320/kz.png",
		  "number-of-digits-in-number": 11
		},
		{
		  "name": "Kenya",
		  "dialcode": "+254",
		  "flag": "https://flagcdn.com/w320/ke.png",
		  "number-of-digits-in-number": 10
		},
		{
		  "name": "Kiribati",
		  "dialcode": "+686",
		  "flag": "https://flagcdn.com/w320/ki.png",
		  "number-of-digits-in-number": 7
		},
		{
		  "name": "Korea, North",
		  "dialcode": "+850",
		  "flag": "https://flagcdn.com/w320/kp.png",
		  "number-of-digits-in-number": 8
		},
		{
		  "name": "Korea, South",
		  "dialcode": "+82",
		  "flag": "https://flagcdn.com/w320/kr.png",
		  "number-of-digits-in-number": 10
		},
		{
		  "name": "Kuwait",
		  "dialcode": "+965",
		  "flag": "https://flagcdn.com/w320/kw.png",
		  "number-of-digits-in-number": 8
		},
		{
		  "name": "Kyrgyzstan",
		  "dialcode": "+996",
		  "flag": "https://flagcdn.com/w320/kg.png",
		  "number-of-digits-in-number": 9
		},
		{
		  "name": "Laos",
		  "dialcode": "+856",
		  "flag": "https://flagcdn.com/w320/la.png",
		  "number-of-digits-in-number": 8
		},
		{
		  "name": "Latvia",
		  "dialcode": "+371",
		  "flag": "https://flagcdn.com/w320/lv.png",
		  "number-of-digits-in-number": 8
		},
		{
		  "name": "Lebanon",
		  "dialcode": "+961",
		  "flag": "https://flagcdn.com/w320/lb.png",
		  "number-of-digits-in-number": 8
		},
		{
		  "name": "Lesotho",
		  "dialcode": "+266",
		  "flag": "https://flagcdn.com/w320/ls.png",
		  "number-of-digits-in-number": 8
		},
		{
		  "name": "Liberia",
		  "dialcode": "+231",
		  "flag": "https://flagcdn.com/w320/lr.png",
		  "number-of-digits-in-number": 7
		},
		{
		  "name": "Libya",
		  "dialcode": "+218",
		  "flag": "https://flagcdn.com/w320/ly.png",
		  "number-of-digits-in-number": 9
		},
		{
		  "name": "Liechtenstein",
		  "dialcode": "+423",
		  "flag": "https://flagcdn.com/w320/li.png",
		  "number-of-digits-in-number": 7
		},
		{
		  "name": "Lithuania",
		  "dialcode": "+370",
		  "flag": "https://flagcdn.com/w320/lt.png",
		  "number-of-digits-in-number": 8
		},
		{
		  "name": "Luxembourg",
		  "dialcode": "+352",
		  "flag": "https://flagcdn.com/w320/lu.png",
		  "number-of-digits-in-number": 6
		},
		{
		  "name": "Madagascar",
		  "dialcode": "+261",
		  "flag": "https://flagcdn.com/w320/mg.png",
		  "number-of-digits-in-number": 9
		},
		{
		  "name": "Malawi",
		  "dialcode": "+265",
		  "flag": "https://flagcdn.com/w320/mw.png",
		  "number-of-digits-in-number": 9
		},
		{
		  "name": "Malaysia",
		  "dialcode": "+60",
		  "flag": "https://flagcdn.com/w320/my.png",
		  "number-of-digits-in-number": 10
		},
		{
		  "name": "Maldives",
		  "dialcode": "+960",
		  "flag": "https://flagcdn.com/w320/mv.png",
		  "number-of-digits-in-number": 7
		},
		{
		  "name": "Mali",
		  "dialcode": "+223",
		  "flag": "https://flagcdn.com/w320/ml.png",
		  "number-of-digits-in-number": 8
		},
		{
		  "name": "Malta",
		  "dialcode": "+356",
		  "flag": "https://flagcdn.com/w320/mt.png",
		  "number-of-digits-in-number": 8
		},
		{
		  "name": "Marshall Islands",
		  "dialcode": "+692",
		  "flag": "https://flagcdn.com/w320/mh.png",
		  "number-of-digits-in-number": 7
		},
		{
		  "name": "Mauritania",
		  "dialcode": "+222",
		  "flag": "https://flagcdn.com/w320/mr.png",
		  "number-of-digits-in-number": 8
		},
		{
		  "name": "Mauritius",
		  "dialcode": "+230",
		  "flag": "https://flagcdn.com/w320/mu.png",
		  "number-of-digits-in-number": 8
		},
		{
		  "name": "Mexico",
		  "dialcode": "+52",
		  "flag": "https://flagcdn.com/w320/mx.png",
		  "number-of-digits-in-number": 10
		},
		{
		  "name": "Micronesia",
		  "dialcode": "+691",
		  "flag": "https://flagcdn.com/w320/fm.png",
		  "number-of-digits-in-number": 7
		},
		{
		  "name": "Moldova",
		  "dialcode": "+373",
		  "flag": "https://flagcdn.com/w320/md.png",
		  "number-of-digits-in-number": 8
		},
		{
		  "name": "Monaco",
		  "dialcode": "+377",
		  "flag": "https://flagcdn.com/w320/mc.png",
		  "number-of-digits-in-number": 6
		},
		{
		  "name": "Mongolia",
		  "dialcode": "+976",
		  "flag": "https://flagcdn.com/w320/mn.png",
		  "number-of-digits-in-number": 8
		},
		{
		  "name": "Montenegro",
		  "dialcode": "+382",
		  "flag": "https://flagcdn.com/w320/me.png",
		  "number-of-digits-in-number": 8
		},
		{
		  "name": "Morocco",
		  "dialcode": "+212",
		  "flag": "https://flagcdn.com/w320/ma.png",
		  "number-of-digits-in-number": 10
		},
		{
		  "name": "Mozambique",
		  "dialcode": "+258",
		  "flag": "https://flagcdn.com/w320/mz.png",
		  "number-of-digits-in-number": 9
		},
		{
		  "name": "Myanmar",
		  "dialcode": "+95",
		  "flag": "https://flagcdn.com/w320/mm.png",
		  "number-of-digits-in-number": 9
		},
		{
		  "name": "Namibia",
		  "dialcode": "+264",
		  "flag": "https://flagcdn.com/w320/na.png",
		  "number-of-digits-in-number": 9
		},
		{
		  "name": "Nauru",
		  "dialcode": "+674",
		  "flag": "https://flagcdn.com/w320/nr.png",
		  "number-of-digits-in-number": 7
		},
		{
		  "name": "Nepal",
		  "dialcode": "+977",
		  "flag": "https://flagcdn.com/w320/np.png",
		  "number-of-digits-in-number": 10
		},
		{
		  "name": "Netherlands",
		  "dialcode": "+31",
		  "flag": "https://flagcdn.com/w320/nl.png",
		  "number-of-digits-in-number": 9
		},
		{
		  "name": "New Zealand",
		  "dialcode": "+64",
		  "flag": "https://flagcdn.com/w320/nz.png",
		  "number-of-digits-in-number": 9
		},
		{
		  "name": "Nicaragua",
		  "dialcode": "+505",
		  "flag": "https://flagcdn.com/w320/ni.png",
		  "number-of-digits-in-number": 8
		},
		{
		  "name": "Niger",
		  "dialcode": "+227",
		  "flag": "https://flagcdn.com/w320/ne.png",
		  "number-of-digits-in-number": 8
		},
		{
		  "name": "Nigeria",
		  "dialcode": "+234",
		  "flag": "https://flagcdn.com/w320/ng.png",
		  "number-of-digits-in-number": 10
		},
		{
		  "name": "North Macedonia",
		  "dialcode": "+389",
		  "flag": "https://flagcdn.com/w320/mk.png",
		  "number-of-digits-in-number": 8
		},
		{
		  "name": "Norway",
		  "dialcode": "+47",
		  "flag": "https://flagcdn.com/w320/no.png",
		  "number-of-digits-in-number": 8
		},
		{
		  "name": "Oman",
		  "dialcode": "+968",
		  "flag": "https://flagcdn.com/w320/om.png",
		  "number-of-digits-in-number": 8
		},
		{
		  "name": "Pakistan",
		  "dialcode": "+92",
		  "flag": "https://flagcdn.com/w320/pk.png",
		  "number-of-digits-in-number": 10
		},
		{
		  "name": "Palau",
		  "dialcode": "+680",
		  "flag": "https://flagcdn.com/w320/pw.png",
		  "number-of-digits-in-number": 7
		},
		{
		  "name": "Palestine",
		  "dialcode": "+970",
		  "flag": "https://flagcdn.com/w320/ps.png",
		  "number-of-digits-in-number": 9
		},
		{
		  "name": "Panama",
		  "dialcode": "+507",
		  "flag": "https://flagcdn.com/w320/pa.png",
		  "number-of-digits-in-number": 8
		},
		{
		  "name": "Papua New Guinea",
		  "dialcode": "+675",
		  "flag": "https://flagcdn.com/w320/pg.png",
		  "number-of-digits-in-number": 7
		},
		{
		  "name": "Paraguay",
		  "dialcode": "+595",
		  "flag": "https://flagcdn.com/w320/py.png",
		  "number-of-digits-in-number": 9
		},
		{
		  "name": "Peru",
		  "dialcode": "+51",
		  "flag": "https://flagcdn.com/w320/pe.png",
		  "number-of-digits-in-number": 9
		},
		{
		  "name": "Philippines",
		  "dialcode": "+63",
		  "flag": "https://flagcdn.com/w320/ph.png",
		  "number-of-digits-in-number": 10
		},
		{
		  "name": "Poland",
		  "dialcode": "+48",
		  "flag": "https://flagcdn.com/w320/pl.png",
		  "number-of-digits-in-number": 9
		},
		{
		  "name": "Portugal",
		  "dialcode": "+351",
		  "flag": "https://flagcdn.com/w320/pt.png",
		  "number-of-digits-in-number": 9
		},
		{
		  "name": "Qatar",
		  "dialcode": "+974",
		  "flag": "https://flagcdn.com/w320/qa.png",
		  "number-of-digits-in-number": 8
		},
		{
		  "name": "Romania",
		  "dialcode": "+40",
		  "flag": "https://flagcdn.com/w320/ro.png",
		  "number-of-digits-in-number": 10
		},
		{
		  "name": "Russia",
		  "dialcode": "+7",
		  "flag": "https://flagcdn.com/w320/ru.png",
		  "number-of-digits-in-number": 10
		},
		{
		  "name": "Rwanda",
		  "dialcode": "+250",
		  "flag": "https://flagcdn.com/w320/rw.png",
		  "number-of-digits-in-number": 9
		},
		{
		  "name": "Saint Kitts and Nevis",
		  "dialcode": "+1-869",
		  "flag": "https://flagcdn.com/w320/kn.png",
		  "number-of-digits-in-number": 7
		},
		{
		  "name": "Saint Lucia",
		  "dialcode": "+1-758",
		  "flag": "https://flagcdn.com/w320/lc.png",
		  "number-of-digits-in-number": 7
		},
		{
		  "name": "Saint Vincent and the Grenadines",
		  "dialcode": "+1-784",
		  "flag": "https://flagcdn.com/w320/vc.png",
		  "number-of-digits-in-number": 7
		},
		{
		  "name": "Samoa",
		  "dialcode": "+685",
		  "flag": "https://flagcdn.com/w320/ws.png",
		  "number-of-digits-in-number": 7
		},
		{
		  "name": "San Marino",
		  "dialcode": "+378",
		  "flag": "https://flagcdn.com/w320/sm.png",
		  "number-of-digits-in-number": 9
		},
		{
		  "name": "Sao Tome and Principe",
		  "dialcode": "+239",
		  "flag": "https://flagcdn.com/w320/st.png",
		  "number-of-digits-in-number": 6
		},
		{
		  "name": "Saudi Arabia",
		  "dialcode": "+966",
		  "flag": "https://flagcdn.com/w320/sa.png",
		  "number-of-digits-in-number": 9
		},
		{
		  "name": "Senegal",
		  "dialcode": "+221",
		  "flag": "https://flagcdn.com/w320/sn.png",
		  "number-of-digits-in-number": 9
		},
		{
		  "name": "Serbia",
		  "dialcode": "+381",
		  "flag": "https://flagcdn.com/w320/rs.png",
		  "number-of-digits-in-number": 9
		},
		{
		  "name": "Seychelles",
		  "dialcode": "+248",
		  "flag": "https://flagcdn.com/w320/sc.png",
		  "number-of-digits-in-number": 7
		},
		{
		  "name": "Sierra Leone",
		  "dialcode": "+232",
		  "flag": "https://flagcdn.com/w320/sl.png",
		  "number-of-digits-in-number": 8
		},
		{
		  "name": "Singapore",
		  "dialcode": "+65",
		  "flag": "https://flagcdn.com/w320/sg.png",
		  "number-of-digits-in-number": 8
		},
		{
		  "name": "Sint Maarten",
		  "dialcode": "+1-721",
		  "flag": "https://flagcdn.com/w320/sx.png",
		  "number-of-digits-in-number": 7
		},
		{
		  "name": "Slovakia",
		  "dialcode": "+421",
		  "flag": "https://flagcdn.com/w320/sk.png",
		  "number-of-digits-in-number": 8
		},
		{
		  "name": "Slovenia",
		  "dialcode": "+386",
		  "flag": "https://flagcdn.com/w320/si.png",
		  "number-of-digits-in-number": 8
		},
		{
		  "name": "Solomon Islands",
		  "dialcode": "+677",
		  "flag": "https://flagcdn.com/w320/sb.png",
		  "number-of-digits-in-number": 7
		},
		{
		  "name": "Somalia",
		  "dialcode": "+252",
		  "flag": "https://flagcdn.com/w320/so.png",
		  "number-of-digits-in-number": 8
		},
		{
		  "name": "South Africa",
		  "dialcode": "+27",
		  "flag": "https://flagcdn.com/w320/za.png",
		  "number-of-digits-in-number": 10
		},
		{
		  "name": "South Sudan",
		  "dialcode": "+211",
		  "flag": "https://flagcdn.com/w320/ss.png",
		  "number-of-digits-in-number": 9
		},
		{
		  "name": "Spain",
		  "dialcode": "+34",
		  "flag": "https://flagcdn.com/w320/es.png",
		  "number-of-digits-in-number": 9
		},
		{
		  "name": "Sri Lanka",
		  "dialcode": "+94",
		  "flag": "https://flagcdn.com/w320/lk.png",
		  "number-of-digits-in-number": 10
		},
		{
		  "name": "Sudan",
		  "dialcode": "+249",
		  "flag": "https://flagcdn.com/w320/sd.png",
		  "number-of-digits-in-number": 9
		},
		{
		  "name": "Suriname",
		  "dialcode": "+597",
		  "flag": "https://flagcdn.com/w320/sr.png",
		  "number-of-digits-in-number": 7
		},
		{
		  "name": "Sweden",
		  "dialcode": "+46",
		  "flag": "https://flagcdn.com/w320/se.png",
		  "number-of-digits-in-number": 9
		},
		{
		  "name": "Switzerland",
		  "dialcode": "+41",
		  "flag": "https://flagcdn.com/w320/ch.png",
		  "number-of-digits-in-number": 9
		},
		{
		  "name": "Syria",
		  "dialcode": "+963",
		  "flag": "https://flagcdn.com/w320/sy.png",
		  "number-of-digits-in-number": 9
		},
		{
		  "name": "Taiwan",
		  "dialcode": "+886",
		  "flag": "https://flagcdn.com/w320/tw.png",
		  "number-of-digits-in-number": 10
		},
		{
		  "name": "Tajikistan",
		  "dialcode": "+992",
		  "flag": "https://flagcdn.com/w320/tj.png",
		  "number-of-digits-in-number": 9
		},
		{
		  "name": "Tanzania",
		  "dialcode": "+255",
		  "flag": "https://flagcdn.com/w320/tz.png",
		  "number-of-digits-in-number": 9
		},
		{
		  "name": "Thailand",
		  "dialcode": "+66",
		  "flag": "https://flagcdn.com/w320/th.png",
		  "number-of-digits-in-number": 9
		},
		{
		  "name": "Timor-Leste",
		  "dialcode": "+670",
		  "flag": "https://flagcdn.com/w320/tl.png",
		  "number-of-digits-in-number": 7
		},
		{
		  "name": "Togo",
		  "dialcode": "+228",
		  "flag": "https://flagcdn.com/w320/tg.png",
		  "number-of-digits-in-number": 8
		},
		{
		  "name": "Tonga",
		  "dialcode": "+676",
		  "flag": "https://flagcdn.com/w320/to.png",
		  "number-of-digits-in-number": 5
		},
		{
		  "name": "Trinidad and Tobago",
		  "dialcode": "+1-868",
		  "flag": "https://flagcdn.com/w320/tt.png",
		  "number-of-digits-in-number": 7
		},
		{
		  "name": "Tunisia",
		  "dialcode": "+216",
		  "flag": "https://flagcdn.com/w320/tn.png",
		  "number-of-digits-in-number": 8
		},
		{
		  "name": "Turkey",
		  "dialcode": "+90",
		  "flag": "https://flagcdn.com/w320/tr.png",
		  "number-of-digits-in-number": 10
		},
		{
		  "name": "Turkmenistan",
		  "dialcode": "+993",
		  "flag": "https://flagcdn.com/w320/tm.png",
		  "number-of-digits-in-number": 9
		},
		{
		  "name": "Tuvalu",
		  "dialcode": "+688",
		  "flag": "https://flagcdn.com/w320/tv.png",
		  "number-of-digits-in-number": 7
		},
		{
		  "name": "Uganda",
		  "dialcode": "+256",
		  "flag": "https://flagcdn.com/w320/ug.png",
		  "number-of-digits-in-number": 9
		},
		{
		  "name": "Ukraine",
		  "dialcode": "+380",
		  "flag": "https://flagcdn.com/w320/ua.png",
		  "number-of-digits-in-number": 9
		},
		{
		  "name": "United Arab Emirates",
		  "dialcode": "+971",
		  "flag": "https://flagcdn.com/w320/ae.png",
		  "number-of-digits-in-number": 9
		},
		{
		  "name": "United Kingdom",
		  "dialcode": "+44",
		  "flag": "https://flagcdn.com/w320/gb.png",
		  "number-of-digits-in-number": 10
		},
		{
		  "name": "United States",
		  "dialcode": "+1",
		  "flag": "https://flagcdn.com/w320/us.png",
		  "number-of-digits-in-number": 10
		},
		{
		  "name": "Uruguay",
		  "dialcode": "+598",
		  "flag": "https://flagcdn.com/w320/uy.png",
		  "number-of-digits-in-number": 8
		},
		{
		  "name": "Uzbekistan",
		  "dialcode": "+998",
		  "flag": "https://flagcdn.com/w320/uz.png",
		  "number-of-digits-in-number": 9
		},
		{
		  "name": "Vanuatu",
		  "dialcode": "+678",
		  "flag": "https://flagcdn.com/w320/vu.png",
		  "number-of-digits-in-number": 7
		},
		{
		  "name": "Vatican City",
		  "dialcode": "+379",
		  "flag": "https://flagcdn.com/w320/vt.png",
		  "number-of-digits-in-number": 6
		},
		{
		  "name": "Venezuela",
		  "dialcode": "+58",
		  "flag": "https://flagcdn.com/w320/ve.png",
		  "number-of-digits-in-number": 10
		},
		{
		  "name": "Vietnam",
		  "dialcode": "+84",
		  "flag": "https://flagcdn.com/w320/vn.png",
		  "number-of-digits-in-number": 9
		},
		{
		  "name": "Yemen",
		  "dialcode": "+967",
		  "flag": "https://flagcdn.com/w320/ye.png",
		  "number-of-digits-in-number": 9
		},
		{
		  "name": "Zambia",
		  "dialcode": "+260",
		  "flag": "https://flagcdn.com/w320/zm.png",
		  "number-of-digits-in-number": 13
		},
		{
		  "name": "Zimbabwe",
		  "dialcode": "+263",
		  "flag": "https://flagcdn.com/w320/zw.png",
		  "number-of-digits-in-number": 9
		}
  ];

  getSpaceType(term: string = null) {
		let items:any = getMockPeople();
		if (term) {
			items = items.filter((x) => x.name.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1);
		}
		return of(items).pipe(delay(500));
	}

  private handleError(error: any): Promise<any> {
    // console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  setFaqs(faqs) {
    this.faqsSubject.next(faqs);
	}
	getFaqBySpaceId(id:any){
	return this.http
		.get(this.validateSessionUrl, {
			headers: this.headers,
			withCredentials: true,
		})
		.toPromise()
		.then((res) => res)
		.catch(this.handleError);
	}
  validateSession(): Promise<any> {
    return this.http
      .get(this.validateSessionUrl, {
        headers: this.headers,
        withCredentials: true,
      })
      .toPromise()
      .then((res) => res)
      .catch(this.handleError);
  }

  getSpaceConfigDetails(subdomain): Promise<any> {
    return this.http
      .get(this.getSpaceConfigDetailsUrl + '?subdomain=' + subdomain, {
        headers: this.headers,
      })
      .toPromise()
      .then((res) => res)
      .catch(this.handleError);
  }

  getCities(): Promise<any> {
    return this.http
      .get(this.getAllCitiesUrl, { headers: this.headers })
      .toPromise()
      .then((res) => res)
      .catch(this.handleError);
  }

  getSitemaps(): Promise<any> {
    return this.http
      .get(this.getAllSitemapsUrl, { headers: this.headers })
      .toPromise()
      .then((res) => res)
      .catch(this.handleError);
  }

  getShortlistedSpaces(space_ids): Promise<any> {
    return this.http
      .post(this.getShortlistSpacesUrl, JSON.stringify({ space_ids }), {
        headers: this.headers,
        withCredentials: true,
      })
      .toPromise()
      .then((res) => res)
      .catch(this.handleError);
  }

  addBookingAndCreateInvoice(booking_details, invoice_details): Promise<any> {
    return this.http
      .post(
        this.addBookingDetailsUrl,
        JSON.stringify({ booking_details, invoice_details }),
        { headers: this.headers, withCredentials: true }
      )
      .toPromise()
      .then((res) => res)
      .catch(this.handleError);
  }

  getSpacesByCity(params: any, page_no: any): Observable<any> {
	params.page_no = page_no;
	if(localStorage.getItem('userDetails')){
		const userDetail = localStorage.getItem('userDetails');
		const userDetailObj = JSON.parse(userDetail);
		params.userId = userDetailObj.id
	}else{
		params.userId = 0
	}
	return this.http
	  .post<any>(this.getSpacesByCityUrl, params, {
		headers: this.headers,
		withCredentials: true,
	  })
	  .pipe(
		tap((res: any) => {
		  this.setFaqs(res.faqs);  // Process the FAQs or any other data as needed
		}),
		catchError(this.handleError) // Handle errors here
	  );
  }

  getSpacesFilter(params:any) {
    return this.http.post(this.getSpacesByCityUrl, params, {
      headers: this.headers
    })
  }

  checkAvailability(start_date, location_id): Promise<any> {
    return this.http
      .get(
        this.checkAvailabilityUrl +
          `?location_id=${location_id}&start_date=${start_date}`,
        { headers: this.headers }
      )
      .toPromise()
      .then((res) => res)
      .catch(this.handleError);
  }

  getInRadius(params, page_no): Promise<any> {
    let data = {
      lat: params.area_lat || params.user_lat,
      longi: params.area_long || params.user_long,
      type: params.type,
      is_daypass_available: params.day_pass,
      page_no,
      capacity: params.capacity,
      radius: params.radius,
      price: params.price,
      amenities: params.amenities,
      min_price: params.min_price,
      max_price: params.max_price,
    };
    return this.http
      .post(this.getInRadiusUrl, JSON.stringify(data), {
        headers: this.headers,
        withCredentials: true,
      })
      .toPromise()
      .then((res) => res)
      .catch(this.handleError);
  }

	getSpaceDetails(country?: any, city?: any, spaceType?: any, spaceId?: any): Promise<any> {
 
		let detailurl = `${this.getSpaceDetailsUrl}?spaceId=${spaceId}&city=${city}&spaceType=${spaceType}&country=${country}`;
    let userDetails = JSON.parse(localStorage.getItem('userDetails')) || null;
    if(userDetails){
      detailurl+='&userId='+userDetails.id;
    }
		
    return this.http
      .get(detailurl, {
        headers: this.headers,
      })
      .toPromise()
      .then((res) => res)
      .catch(this.handleError);
		}
		
		
		getShortDetailsById(spaceId:number){
			return this.http
				.get(this.shortDetailsUrl + spaceId, {
					headers: this.headers,
				})
				.toPromise()
				.then((res) => res)
				.catch(this.handleError);
			
		}

  getAllTrending(data): Promise<any> {
    return this.http
      .post(this.getAllTrendingUrl, JSON.stringify(data), {
        headers: this.headers,
        withCredentials: true,
      })
      .toPromise()
      .then((res) => res)
      .catch(this.handleError);
  }
  
  rejectBookingonPaymentExpiry(data): Promise<any> {
    return this.http
      .post(this.urlRejectBookinonPaymentExpiry, {"bookingId":data}, {
        headers: this.headers,
        withCredentials: true,
      })
      .toPromise()
      .then((res) => res)
      .catch(this.handleError);
  }

  getLatlong(address): Promise<any> {
    return this.http
      .get(
        'https://maps.googleapis.com/maps/api/geocode/json?address=' +
          address +
          `&key=${environment.mapKey}`,
      )
      .toPromise()
      .then((res) => res)
      .catch(this.handleError);
  }
  getNearBySpaces(data:any): Observable<any> {
    return this.http.post(
      environment.apiUrl + '/api/v1/spaces/getNearBySpacesByCityId',data,
      {
        headers: this.headers,
      }
    );
  }
  getBookingDetail(data): Observable<any> {
    let params = '';
      data.spaceType?params+=`&spaceType=${data?.spaceType}`:params
      data.startDate?params+=`&startDate=${data?.startDate}`:params
      data.endDate?params+=`&endDate=${data?.endDate}`:params
      data.bookingStatus?params+=`&bookingStatus=${data?.bookingStatus}`:params

    params
    if (data.bookingType == 'upcomingBooking') {
      return this.http.get(environment.apiUrl+`/api/v1/user/upcomingBookings?userId=${data?.userId}${params}`,{ headers: this.appGlobals.setHeaders()});
    } else if (data.bookingType == 'pastBooking') {
      return this.http.get(environment.apiUrl+`/api/v1/user/previousBookings?userId=${data?.userId}${params}`,{ headers: this.appGlobals.setHeaders()});
    } else {
      return this.http.get(environment.apiUrl+`/api/v1/user/user-booking-history?userId=${data?.userId}${params}`,{ headers: this.appGlobals.setHeaders()});
    }
    
     
  }
  getBookingDetailById(data): Observable<any> {
    // fixme: need api end point
      return this.http.get(environment.apiUrl+`/api/v1/user/user-single-booking/${data}`,{ headers: this.appGlobals.setHeaders()});
  }

  getUserInvoice(bookingID){
    return this.http.get(environment.apiUrl+`/api/v1/user/downloadBookingInvoice/${bookingID}`,{ headers: this.appGlobals.setHeaders()});
  }

  getSpaceCategory(){
    return this.http.get(environment.apiUrl+`/api/v1/getAllActiveSpaceCategory`);
  }

  getCityInfo(lat, long): Observable<any> {
    return this.http.post(`${this.getCityAndLocationInfo}`, { lat, long });
  }
  voteDevoteSpace(data,id): Observable<any> {
    return this.http.post(`${this.voteDevoteEndPoint}/${id}`,data,{ headers: this.appGlobals.setHeaders()});
  }

  cancelUserBooking(bookingId:any){
   return this.http
      .post(this.userBookingUrl, {"bookingId":bookingId}, { headers: this.appGlobals.setHeaders()});
  }

  getNearbySpaces(keyword, location, radius, type): Observable<any> {
    return this.http.post(`${this.fetchNearbySpaces}`, {
      keyword,
      location,
      radius,
      type,
    });
  }

  getQuestionByRadius(lat, longi): Observable<any> {
    return this.http.post(`${this.getQuestionByRadiusUrl}`, { lat, longi });
  }

  getQuestionByLocationName(location): Observable<any> {
    return this.http
      .get(`${this.getQuestionByLocationNameUrl}/${location}`)
      .pipe(
        map((data) => {
          this.setFaqs(data);
        })
      );
  }

  getFaqsBySpaceId(spaceId): Observable<any> {
    return this.http.get(`${this.getFaqsBySpaceIdUrl}/${spaceId}`).pipe(
      map((data) => {
        this.setFaqs(data);
      })
    );
  }

  addRatingReview(payload, space_id){
    return this.http.post(`${environment.apiUrl}/api/v1/ratings/rate/${space_id}`, payload, { headers: this.appGlobals.setHeaders()});
  }
  updateRatingReview(rating_id, payload, space_id){
    return this.http.post(`${environment.apiUrl}/api/v1/ratings/updateUserRating/${rating_id}/${space_id}`, payload, { headers: this.appGlobals.setHeaders()});
  }
  getSpaceRatingReviewDetails(id, filter = 'topRating'){
    return this.http.get(`${environment.apiUrl}/api/v1/ratings/reviews/${id}?sortBy=${filter}`);
  }
  getSpaceRatingReviewDetailsWithSortPagination(id, filter = 'topRating', page = 1, pageSize = 10, starBy = ''){
    return this.http.get(`${environment.apiUrl}/api/v1/ratings/reviews/sort/${id}?sortBy=${filter}&page=${page}&pageSize=${pageSize}&ratingFilter=${starBy}`);
  }
  getSpaceRatingReviewDetailsByUser(){
    return this.http.get(`${environment.apiUrl}/api/v1/ratings/reviews/`, { headers: this.appGlobals.setHeaders()});
  }

  userScheduleVisit(spaceId, payload){
    return this.http.post(`${environment.apiUrl}/api/v1/user/scheduleVisit/${spaceId}`, payload, { headers: this.appGlobals.setHeaders()});
  }
  userShortTermScheduleVisit(spaceId, payload){
    return this.http.post(`${environment.apiUrl}/api/v1/user/shortTermScheduleVisit/${spaceId}`, payload, { headers: this.appGlobals.setHeaders()});
  }
  userLongTermScheduleVisit(spaceId, payload){
    return this.http.post(`${environment.apiUrl}/api/v1/user/longTermScheduleVisit/${spaceId}`, payload, { headers: this.appGlobals.setHeaders()});
  }
  userUpdateScheduleVisit(visitId, payload){
    return this.http.put(`${environment.apiUrl}/api/v1/user/updateVisit/${visitId}`, payload, { headers: this.appGlobals.setHeaders()});
  }
  userRequestBookingShort(spaceId, payload){
    return this.http.post(`${environment.apiUrl}/api/v1/user/shortTermCreateBooking/${spaceId}`, payload, { headers: this.appGlobals.setHeaders()});
  }
  addReview(spaceId, payload){
    return this.http.post(`${environment.apiUrl}/api/v1/ratings/rate/${spaceId}`, payload, { headers: this.appGlobals.setHeaders()});
  }
  userDayPassCoworking(spaceId, payload){
    return this.http.post(`${environment.apiUrl}/api/v1/user/coworkingCreateBooking/${spaceId}`, payload, { headers: this.appGlobals.setHeaders()});
  }
  completeCoworkingPayment(payload){
    return this.http.post(`${environment.apiUrl}/api/v1/user/payment-status`, payload, { headers: this.appGlobals.setHeaders()});
  }
  completeShortTermLaterPayment(payload){
    // fixme:Need api end point change
    return this.http.post(`${environment.apiUrl}/api/v1/user/payment-status`, payload, { headers: this.appGlobals.setHeaders()});
  }
  completeShortPayment(payload) {
    return this.http.post(`${environment.apiUrl}/api/v1/user/shortTermBookingPayment/${payload}`, payload, { headers: this.appGlobals.setHeaders()});
  }
  getUserScheduleVisitList(){
    return this.http.get(`${environment.apiUrl}/api/v1/user/getVisit/`, { headers: this.appGlobals.setHeaders()});
  }
  cancelScheduledVisit(visitId){
    return this.http.post(`${environment.apiUrl}/api/v1/user/cancelVisit/${visitId}`, { headers: this.appGlobals.setHeaders()});
  }
  
  getBookingRequestInquiriesList(){
    return this.http.get(`${environment.apiUrl}/api/v1/user/viewInquiry/`, { headers: this.appGlobals.setHeaders()});
  }
  
  sentInquiry(spaceId, payload){
    return this.http.post(`${environment.apiUrl}/api/v1/user/inquiry/${spaceId}`, payload, { headers: this.appGlobals.setHeaders()});
  }
  cancelInquiry(spaceId,inquiryId){
    return this.http.delete(`${environment.apiUrl}/api/v1/user/cancelInquiry/${spaceId}/${inquiryId}`, { headers: this.appGlobals.setHeaders()});
  }
  updateInquiry(inquiryId, spaceId, payload){
    return this.http.patch(`${environment.apiUrl}/api/v1/user/manageInquiry/${inquiryId}/${spaceId}`, payload, { headers: this.appGlobals.setHeaders()});
  }
  setShowSchedule(value: boolean) {
    this.showScheduleSubject.next(value);
  }
  userCoworkingVisitSchdule(spaceId, payload){
    return this.http.post(`${environment.apiUrl}/api/v1/user/coworkingScheduleVisit/${spaceId}`, payload, { headers: this.appGlobals.setHeaders()});
  }

  inquiryBooking(payload){
    return this.http.post(`${environment.apiUrl}/api/v1/user/inquiry`,payload);
  }
 
  getAllAmenities(){
    return this.http.get(this.getAmenitiesURL);
  }
  getAllLocations(){
    return this.http.get(this.getLocationUrl);
  }
  getAllLocations2(spaceType:any){
    return this.http.get(this.getLocationUrl+`?spaceType=${spaceType}`);
  }
}

function getMockPeople() {
	return [
		{
			value: 'Co-Working',
			subpart: [
				{ value: 'PrivateOffice', selected: false },
				{ value: 'ManagedOffice', selected: false },
				{ value: 'DedicatedDesk', selected: false },
				{ value: 'FlexibleDesk', selected: false },
				{ value: 'VirtualOffice', selected: false },
				{ value: 'DayPass', selected: false }
			]
		},
		{ value: 'SharedOffice' },
		{ value: 'CoworkingCafe/Restaurant' },
		{ value: 'ShootStudio' },
		{ value: 'RecordingStudio' },
		{ value: 'PodcastStudio' },
		{ value: 'ActivitySpace' },
		{ value: 'SportsTurf' },
		{ value: 'SportsVenue' },
		{ value: 'PartySpace' },
		{ value: 'BanquetHall' },
		{ value: 'Gallery' },
		{ value: 'Classroom' },
		{ value: 'PrivateCabin' },
		{ value: 'TrainingRoom' },
		{ value: 'EventSpace' }
	];
}