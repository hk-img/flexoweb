import { DatePipe, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import intlTelInput from 'intl-tel-input';
import { CountryISO } from 'ngx-intl-tel-input';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/internal/operators/finalize';
import { LoginRegisterService } from '../services/login-register.service';
import { SpaceService } from '../services/space.service';
import { UserService } from '../services/user.service';
import { ProfileManagementService } from './profile-management.service';

declare var $:any;
@Component({
	selector: 'app-profile-management',
	templateUrl: './profile-management.component.html',
	styleUrls: ['./profile-management.component.css'],
})
export class ProfileManagementComponent implements OnInit {
	
	countryCodes:any;
	selectedIndex: any = 75;
	placeholder: string = '';
	public profileDetailForm: UntypedFormGroup;
	public changePasswordFrom: UntypedFormGroup;
	public userDetails: any = null;
	profileImageLoaded: boolean = false;
	profileImage: any;
	loader:boolean = false;
	regType: any;
	isLoading:boolean = true;
	fileTypeError: boolean = false;
	fileSizeError: boolean = false;
	selectedFile: File | null = null;
	countryList: any[] = [];
	stateList: any[] = [];
	cityList: any;
	selectedCountryData: any;
	dialCode: any;
	countryName: any;
	CountryISO = CountryISO;
	val: any;
	iti: any = intlTelInput;

	constructor(
		@Inject(PLATFORM_ID) private platformId: any,
		private fb: UntypedFormBuilder,
		private profileService: ProfileManagementService,
		private toastr: ToastrService,
		private datePipe: DatePipe,
		private loginRegisterService: LoginRegisterService,
		private userService: UserService,
		private spaceService: SpaceService
	) { 
		this.updatePlaceholder();
	}

	setCountryData(name: string) {
		const data:any = {
		  "1": CountryISO.UnitedStates, "7": CountryISO.Russia, "20": CountryISO.Egypt, "27": CountryISO.SouthAfrica, "30": CountryISO.Greece, "31": CountryISO.Netherlands, "32": CountryISO.Belgium, "33": CountryISO.France, "34": CountryISO.Spain, "36": CountryISO.Hungary, "39": CountryISO.Italy, "40": CountryISO.Romania, "41": CountryISO.Switzerland, "43": CountryISO.Austria, "44": CountryISO.UnitedKingdom, "45": CountryISO.Denmark, "46": CountryISO.Sweden, "47": CountryISO.Norway, "48": CountryISO.Poland, "49": CountryISO.Germany, "51": CountryISO.Peru, "52": CountryISO.Mexico, "53": CountryISO.Cuba, "54": CountryISO.Argentina, "55": CountryISO.Brazil, "56": CountryISO.Chile, "57": CountryISO.Colombia, "58": CountryISO.Venezuela, "60": CountryISO.Malaysia, "61": CountryISO.Australia, "62": CountryISO.Indonesia, "63": CountryISO.Philippines, "64": CountryISO.NewZealand, "65": CountryISO.Singapore, "66": CountryISO.Thailand, "81": CountryISO.Japan, "82": CountryISO.SouthKorea, "84": CountryISO.Vietnam, "86": CountryISO.China, "90": CountryISO.Turkey, "91": CountryISO.India, "92": CountryISO.Pakistan, "93": CountryISO.Afghanistan, "94": CountryISO.SriLanka, "95": CountryISO.Myanmar, "98": CountryISO.Iran, "211": CountryISO.SouthSudan, "212": CountryISO.Morocco, "213": CountryISO.Algeria, "216": CountryISO.Tunisia, "218": CountryISO.Libya, "220": CountryISO.Gambia, "221": CountryISO.Senegal, "222": CountryISO.Mauritania, "223": CountryISO.Mali, "224": CountryISO.Guinea, "225": CountryISO.CôteDIvoire, "226": CountryISO.BurkinaFaso, "227": CountryISO.Niger, "228": CountryISO.Togo, "229": CountryISO.Benin, "230": CountryISO.Mauritius, "231": CountryISO.Liberia, "232": CountryISO.SierraLeone, "233": CountryISO.Ghana, "234": CountryISO.Nigeria, "235": CountryISO.Chad, "236": CountryISO.CentralAfricanRepublic, "237": CountryISO.Cameroon, "238": CountryISO.CapeVerde, "239": CountryISO.SãoToméAndPríncipe, "240": CountryISO.EquatorialGuinea, "241": CountryISO.Gabon, "242": CountryISO.CongoRepublicCongoBrazzaville, "243": CountryISO.CongoDRCJamhuriYaKidemokrasiaYaKongo , "244": CountryISO.Angola, "245": CountryISO.GuineaBissau, "246": CountryISO.BritishIndianOceanTerritory, "248": CountryISO.Seychelles, "249": CountryISO.Sudan, "250": CountryISO.Rwanda, "251": CountryISO.Ethiopia, "252": CountryISO.Somalia, "253": CountryISO.Djibouti, "254": CountryISO.Kenya, "255": CountryISO.Tanzania, "256": CountryISO.Uganda, "257": CountryISO.Burundi, "258": CountryISO.Mozambique, "260": CountryISO.Zambia, "261": CountryISO.Madagascar, "262": CountryISO.Mayotte, "263": CountryISO.Zimbabwe, "264": CountryISO.Namibia, "265": CountryISO.Malawi, "266": CountryISO.Lesotho, "267": CountryISO.Botswana, "268": CountryISO.Swaziland, "269": CountryISO.Comoros, "290": CountryISO.SaintHelena, "291": CountryISO.Eritrea, "297": CountryISO.Aruba, "298": CountryISO.FaroeIslands, "299": CountryISO.Greenland, "350": CountryISO.Gibraltar, "351": CountryISO.Portugal, "352": CountryISO.Luxembourg, "353": CountryISO.Ireland, "354": CountryISO.Iceland, "355": CountryISO.Albania, "356": CountryISO.Malta, "357": CountryISO.Cyprus, "358": CountryISO.Finland, "359": CountryISO.Bulgaria, "370": CountryISO.Lithuania, "371": CountryISO.Latvia, "372": CountryISO.Estonia, "373": CountryISO.Moldova, "374": CountryISO.Armenia, "375": CountryISO.Belarus, "376": CountryISO.Andorra, "377": CountryISO.Monaco, "378": CountryISO.SanMarino, "379": CountryISO.VaticanCity, "380": CountryISO.Ukraine, "381": CountryISO.Serbia, "382": CountryISO.Montenegro, "383": CountryISO.Kosovo, "385": CountryISO.Croatia, "386": CountryISO.Slovenia, "387": CountryISO.BosniaAndHerzegovina, "389": CountryISO.Macedonia, "420": CountryISO.CzechRepublic, "421": CountryISO.Slovakia, "423": CountryISO.Liechtenstein, "500": CountryISO.FalklandIslands, "501": CountryISO.Belize, "502": CountryISO.Guatemala, "503": CountryISO.ElSalvador, "504": CountryISO.Honduras, "505": CountryISO.Nicaragua, "506": CountryISO.CostaRica, "507": CountryISO.Panama, "508": CountryISO.SaintPierreAndMiquelon, "509": CountryISO.Haiti, "590": CountryISO.Guadeloupe, "591": CountryISO.Bolivia, "592": CountryISO.Guyana, "593": CountryISO.Ecuador, "594": CountryISO.FrenchGuiana, "595": CountryISO.Paraguay, "596": CountryISO.Martinique, "597": CountryISO.Suriname, "598": CountryISO.Uruguay, "599": CountryISO.CaribbeanNetherlands, "670": CountryISO.NorthernMarianaIslands, "672": CountryISO.NorfolkIsland, "673": CountryISO.Brunei, "674": CountryISO.Nauru, "675": CountryISO.PapuaNewGuinea, "676": CountryISO.Tonga, "677": CountryISO.SolomonIslands, "678": CountryISO.Vanuatu, "679": CountryISO.Fiji, "680": CountryISO.Palau, "681": CountryISO.WallisAndFutuna, "682": CountryISO.CookIslands, "683": CountryISO.Niue, "685": CountryISO.Samoa, "686": CountryISO.Kiribati, "687": CountryISO.NewCaledonia, "688": CountryISO.Tuvalu, "689": CountryISO.FrenchPolynesia, "690": CountryISO.Tokelau, "691": CountryISO.Micronesia, "692": CountryISO.MarshallIslands, "850": CountryISO.NorthKorea, "852": CountryISO.HongKong, "853": CountryISO.Macau, "855": CountryISO.Cambodia, "856": CountryISO.Laos,"880": CountryISO.Bangladesh, "886": CountryISO.Taiwan, "960": CountryISO.Maldives, "961": CountryISO.Lebanon, "962": CountryISO.Jordan, "963": CountryISO.Syria, "964": CountryISO.Iraq, "965": CountryISO.Kuwait, "966": CountryISO.SaudiArabia, "967": CountryISO.Yemen, "968": CountryISO.Oman, "970": CountryISO.Palestine, "971": CountryISO.UnitedArabEmirates, "972": CountryISO.Israel, "973": CountryISO.Bahrain, "974": CountryISO.Qatar, "975": CountryISO.Bhutan, "976": CountryISO.Mongolia, "977": CountryISO.Nepal, "992": CountryISO.Tajikistan, "993": CountryISO.Turkmenistan, "994": CountryISO.Azerbaijan, "995": CountryISO.Georgia, "996": CountryISO.Kyrgyzstan, "997": CountryISO.Kazakhstan, "998": CountryISO.Uzbekistan
		};
	
		return `${data[name] || ''}`;
	}

	ngOnInit(): void {
		this.getAllCountry();
		this.userDetails = localStorage.getItem('userDetails') ? JSON.parse(localStorage.getItem('userDetails')) : null

		this.profileDetailForm = this.fb.group({
			email: ['', [Validators.required]],
			mobile: ['', [Validators.required]],
			phone_code: ["+91",Validators.required],
			firstName: ['', [Validators.required]],
			lastName: ['', [Validators.required]],
			gender: [''],
			dateOfBirth: [null],
			companyName: [''],
			country_id: ['India'],
			state_id: [''],
			city_id: [''],
			pincode: [''],
			billingAddress:['',[Validators.required]],
			billingAddress2:[''],
			panNumber:["",[Validators.pattern('[A-Z]{5}[0-9]{4}[A-Z]{1}')]],
			gstNumber:["",[Validators.pattern('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$')]],
		});
		this.changePasswordFrom = this.fb.group({
			currentPassword: ['', [Validators.required]],
			newPassword: ['', [Validators.required]],
			confirmPassword: ['', [Validators.required]],
		});
		
		this.countryCodes = this.spaceService.countryCodes;
	}

		onCountryCodeChange(country: any) {
			this.selectedIndex = this.countryCodes.findIndex((code) => code.dialcode === country);
			this.updatePlaceholder();
		}
		
		updatePlaceholder() {
			if (this.selectedIndex) {
				this.placeholder = Array.from({ length: this.countryCodes?.this.selectedIndex['number-of-digits-in-number'] }, (_, i) => i ).join('');
			}
		}

	changeTab(evt, detail) {
		if (isPlatformBrowser(this.platformId)) {
			var i, tabcontent, tablinks;
			tabcontent = document.getElementsByClassName("tab-pane");
			for (i = 0; i < tabcontent.length; i++) {
				tabcontent[i].style.display = "none";
			}
			tablinks = document.getElementsByClassName("tablinks");
			for (i = 0; i < tablinks.length; i++) {
				tablinks[i].className = tablinks[i].className.replace(" active", "");
			}
			document.getElementById(detail).style.display = "block";
			evt.currentTarget.className += " active";
			if(detail == 'changePassword'){
				this.changePasswordFrom.reset();
			}
		}
	}
 
	getProfileData(){
		this.profileService.fetchProfiledata().subscribe((result: any) => {
			if (result.success) {
				this.userDetails = result.data;
				this.regType = this.userDetails.regType;
				this.profileImage = result.data.picture;
				this.profileDetailForm.patchValue({
					email: this.userDetails.email ? this.userDetails.email : "",
					mobile: this.userDetails.mobile ? this.userDetails.mobile.replace(" ","") : "",
					phone_code: `+${this.userDetails.phone_code}`,
					firstName: this.userDetails?.firstName,
					lastName: this.userDetails?.lastName,
					panNumber: this.userDetails?.panNumber ?? "",
					gstNumber: this.userDetails?.gstNumber ?? "",
					pincode: this.userDetails.pincode ? this.userDetails.pincode : "",
					billingAddress2:this.userDetails.billingAddress2 ? this.userDetails.billingAddress2 : "",
					country_id: this.userDetails?.country_id ? this.userDetails.country_id : "India",
					state_id: this.userDetails.state_id ? this.userDetails.state_id : "",
					city_id: this.userDetails.city_id ? this.userDetails.city_id : "",
					gender: this.userDetails.gender ? this.userDetails.gender : "",
					dateOfBirth: (this.userDetails.dateOfBirth && this.userDetails.dateOfBirth!=='0000-00-00') ? this.userDetails.dateOfBirth : null,
					companyName: this.userDetails.companyName ? this.userDetails.companyName : "",
					billingAddress:this.userDetails.billingAddress ? this.userDetails.billingAddress : "",
					// phone_code: this.val = this.setCountryData(String(this.userDetails.phone_code))
				})

				const matchedCountry = this.countryList.find(country => country.country_name === this.profileDetailForm.value.country_id);
				
				
				
				if (matchedCountry) {
					this.profileDetailForm.get('country_id').setValue(matchedCountry.id); // Setting the matched country's id
					this.getEditState(matchedCountry.id);
				}

			

				this.dialCode = this.userDetails?.phone_code;
        		// this.val = this.setCountryData(String(this.dialCode));
			}
		})
	}

	getAllCountry() {
		this.profileService.getAllCountry().subscribe((res: any) => {
		  this.countryList = res;
			this.getProfileData();
		});
	}

	onCountryChange(event:any) {
		this.profileDetailForm.patchValue({"country_id":event});
		this.getState(event);
	}

	getEditState(id: any) {
		this.profileService.getAllState(id).subscribe((res: any) => {
		  this.stateList = res;
			if (this.stateList.length) {
				const matchedState = this.stateList.find(state => state.name === this.profileDetailForm.value.state_id);
				this.profileDetailForm.get('state_id').setValue(matchedState.id); // Setting the matched country's id
				this.getEditCities(matchedState.id);
			}
		})
	}

	getState(id: any) {
		this.profileService.getAllState(id).subscribe((res: any) => {
		  this.stateList = res;
		})
	}

	onStateChange(event:any) {
		this.profileDetailForm.patchValue({"state_id":event});
		this.getAllCities(event);
	}

	getEditCities(id: any) {
		this.profileService.getAllCities(id).subscribe((res: any) => {
		  this.cityList = res
			if (this.cityList.length) {
			const matchedCity = this.cityList.find(city => city.name === this.profileDetailForm.value.city_id);
			this.profileDetailForm.get('city_id').setValue(matchedCity.id); 
			}
		})
	}
	getAllCities(id: any) {
		this.profileService.getAllCities(id).subscribe((res: any) => {
		  this.cityList = res
		})
	}

	onCityChange(event:any) {
		this.profileDetailForm.patchValue({"city_id":event});
	}

	onDateInputed($event: any) {
		const dateString = $event.target.value;
		const parts = dateString.split('/');
		const day = parseInt(parts[0], 10);
		const month = parseInt(parts[1], 10) - 1; // Months are zero-based in JavaScript
		const year = parseInt(parts[2], 10);
		const parsedDate = new Date(year, month, day);
		if(dateString){

			this.profileDetailForm.controls['dateOfBirth'].setValue(parsedDate);
		}else{
			this.profileDetailForm.controls['dateOfBirth'].setValue(null);
		}
	  }

	  onFileSelected(event: any) {
		if (event.target.files.length > 0) {
			const file = event.target.files[0];
			const validImageTypes = ['image/jpeg', 'image/png'];
	
			if (!validImageTypes.includes(file.type)) {
				this.fileTypeError = true;
				this.fileSizeError = false;
				this.selectedFile = null;
			} else if (file.size > 1 * 1024 * 1024) { // 1 MB in bytes
				this.fileSizeError = true;
				this.fileTypeError = false;
				this.selectedFile = null;
			} else {
				this.fileTypeError = false;
				this.fileSizeError = false;
				this.selectedFile = file;
				this.uploadProfilePic();
			}
		}
	  }

	  clearDate() {
        this.profileDetailForm.controls['dateOfBirth'].setValue(null); // or this.dateOfBirth.setValue(''); if you want to set it to an empty string
    }

	  uploadProfilePic() {
		this.isLoading = false;
		this.loader = true;
		const formData = new FormData();
		formData.append('file', this.selectedFile);
		this.profileService.uploadProfileImage(formData).pipe(finalize(() => this.loader = false)).subscribe((result: any) => {
		  if (result.success) {
			localStorage.setItem('userDetails', JSON.stringify(result?.user))
			this.profileImage = result?.user?.picture;
			this.profileImageLoaded = true;
			this.toastr.success(result.message || 'Profile updated successfully!');
			this.isLoading = true;
		  } else {
			this.toastr.error('Some error occurred while update profile!');
		  }
		}, (error) => {
		  this.toastr.error('Some error occurred while update profile!');
		})
	  }

	onProfileDetailsSubmit(form){
		const formValue = form.value;
		const userId = this.userDetails.id;
		
		if (!form.valid) {
			for (const controlName in form.controls) {
				if (form.controls[controlName].invalid) {
					const control = form.controls[controlName];
					
					if (control.errors?.required) {
						this.toastr.error(`${controlName} is required!`);
					} else if (control.errors?.minlength) {
						this.toastr.error(`${controlName} must be at least ${control.errors.minlength.requiredLength} characters long!`);
					} else if (control.errors?.maxlength) {
						this.toastr.error(`${controlName} cannot exceed ${control.errors.maxlength.requiredLength} characters!`);
					} else if (control.errors?.pattern) {
						this.toastr.error(`${controlName} is invalid format!`);
					}
					return false;
				}
			}
		}		
		
		let payload = {
			"phone_code": formValue.phone_code,
			"mobile": formValue.mobile,
			"email": formValue.email ? formValue.email : "",
			"firstName": formValue.firstName,
			"lastName": formValue.lastName,
			"gender": formValue.gender,
			"dateOfBirth": formValue.dateOfBirth ? this.datePipe.transform(formValue.dateOfBirth, "yyyy-MM-dd") : null,
			"companyName": formValue.companyName,
			"panNumber": formValue.panNumber,
			"gstNumber": formValue.gstNumber,
			"billingAddress": formValue.billingAddress,
			"country_id": formValue.country_id,
			"state_id": formValue.state_id,
			"city_id": formValue.city_id,
			"pincode": formValue.pincode,
			"billingAddress2": formValue.billingAddress2
		}
		this.profileService.updateProfileDetails(userId, payload).subscribe((result: any) => {
			if(result.success){
				localStorage.setItem('userDetails', JSON.stringify(result?.user));
				this.toastr.success(result.message || 'Profile updated successfully!');
			} else {
				this.toastr.error(result?.message);
			}
		}, (error) => {
			this.toastr.error('Some error occurred while update profile!')
			console.error(error);
		})

	}
	
	onSubmitChangePassword(form){
		if(!form.valid){
			this.toastr.error('Form is not valid!')
			return false;
		}

		const formValue = form.value;
		if(formValue.confirmPassword != formValue.newPassword){
			this.toastr.error('Password must be match with confirm password!')
			return false;
		}

		if(formValue.currentPassword == formValue.newPassword){
			this.toastr.error('Current Password should not match with new password!')
			return false;
		}
		let payload = {
			"email": this.userDetails.email ? this.userDetails.email : "",
			"currentPassword": formValue.currentPassword,
			"newPassword": formValue.newPassword,
			"newConfirmPassword": formValue.confirmPassword
		}
		this.profileService.changeUserPassword(payload).subscribe((result: any) => {
			if(result.success){
				this.changePasswordFrom.reset();
				this.updateStorageData(payload.email);
				$(".close").trigger('click');
				this.toastr.success(result.message || 'Password has been changed successfully!');
			} else {
				this.toastr.error(result.message || 'Some error occurred while change password!');
			}
		}, (error) => {
			this.toastr.error('Some error occurred while change password!')
		})
	}

	updateStorageData(email){
		this.loginRegisterService.checkIsEmailExists({email: email}).subscribe((result:any) => {
			if(result.existsEmail){
				localStorage.setItem('userDetails', JSON.stringify(result?.userdata))
            	this.userService.userDetails.next(result?.userdata);
			}
		})
	}
}
