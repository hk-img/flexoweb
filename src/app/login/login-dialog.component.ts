import {
  Component,
  Inject,
  OnInit,
  PLATFORM_ID
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { ToastrService } from 'ngx-toastr';
import { LoginRegisterService } from '../services/login-register.service';
import { UserService } from '../services/user.service';
// import {
//   SocialAuthService,
//   GoogleLoginProvider,
//   SocialUser,
// } from '@abacritt/angularx-social-login';

import {
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from '@abacritt/angularx-social-login';
import intlTelInput from 'intl-tel-input';
import { Subscription } from 'rxjs/internal/Subscription';
import { timer } from 'rxjs/internal/observable/timer';
import { take } from 'rxjs/operators';
import { SpaceService } from '../services/space.service';
import { isPlatformBrowser } from '@angular/common';

enum LoginTypeEnum {
  Mobile = 'Mobile',
  Email = 'Email',
  Google = 'Google',
}
// const config = new AuthServiceConfig([
//   {
//     id: GoogleLoginProvider.PROVIDER_ID,
//     provider: new GoogleLoginProvider('528961187921-ld24b25466u4t2lacn9r35asg000lfis.apps.googleusercontent.com')
//   },])
declare const gapi: any;

@Component({
  selector: 'login',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css'],
})
export class LoginDialog implements OnInit {
  value = false;
  // yad variables start
  public isLoading: boolean = false;
  userAction: 'register' | 'login' | 'forgotPass' | 'resetPass' = 'register';
  regLogType: LoginTypeEnum = LoginTypeEnum.Mobile;
  loginType: LoginTypeEnum = LoginTypeEnum.Mobile;
  userDetail: any;
  loginCount: number = 0;
  isForgotPass: boolean = false;
  loginOtpReceived: boolean = false;
  emailOtpForgotReceived: boolean = false;
  createPassword: boolean = false;
  resetPasswordForLogin: boolean = false;
  socialUser!: SocialUser;
  // yad variables end
  public headerTitle: string = 'Login/Register';
  public mobileNumberForm: UntypedFormGroup;
  public mobileLoginForm: UntypedFormGroup;
  public otpForm: UntypedFormGroup;
  public forgotOtpForm: UntypedFormGroup;
  public forgotPasswordOtpForm: UntypedFormGroup;
  public emailOtpForm: UntypedFormGroup;
  public emailForm: UntypedFormGroup;
  public userRegisterForm: UntypedFormGroup;
  public userEmailRegisterForm: UntypedFormGroup;
  public userForgotForm: UntypedFormGroup;
  public userCreatePassForm: UntypedFormGroup;
  public resetPasswordForm: UntypedFormGroup;
  public forgotEmailOtpForm: UntypedFormGroup;
  public loginVerifyForm: UntypedFormGroup;

  public ref;
  public LoginTypeEnum = LoginTypeEnum;
  public selectedLoginType: LoginTypeEnum = LoginTypeEnum.Mobile;
  public otpReceived: boolean = false;
  public forgotPasswordOtpReceived: boolean = false;
  public isForgotPassword: boolean = false;
  public showUserRegister: boolean = false;
  public showEmailUserRegister: boolean = false;
  public isRegister: boolean = false;
  private UserId: string | undefined;

  public mobile;
  public email;
  public name;
  public otp;
  public otp_sent: boolean = false;
  public login: boolean = true;
  public newUser: boolean = false;
  public existingUser: boolean = false;
  public forgotPasswordErrorMessage: string = null;
  public isLoginEmailIsExists: boolean = false;
  countDown: Subscription;
  private itiInitialized = false;
  private iti2Initialized = false;
  private iti3Initialized = false;
  counter = 30;
  tick = 1000;
  socialUserFirstName: any;
  socialUserLastName: any;
  telInputInstance: any;
  initialDialCode: any = "+91"
  selectedCountryData: any;
  iti2: import("intl-tel-input").Iti;
  iti: import("intl-tel-input").Iti;
  iti3: import("intl-tel-input").Iti;
  countryCodes: any;
  selectedIndex: any = 75;
  placeholder: string = '';

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    public dialogRef: MatDialogRef<any>,
    public fb: UntypedFormBuilder,
    public snackBar: MatSnackBar,
    private loginRegisterService: LoginRegisterService,
    private userService: UserService,
    private toastr: ToastrService,
    private socialAuthService: SocialAuthService,
    private spaceService: SpaceService
  ) {
    this.updatePlaceholder();
  }

  ngOnInit() {
    this.createCustomForms();
    this.socialAuthService.authState.subscribe((user) => {
      if (user) {
        this.loginCount++;
        this.socialUser = user;
        if (this.loginCount == 1) {
          this.loginByGoogle(this.socialUser);
        }
      } else {
        // this.toastr.error('Error while logging in with Google. Please try again.');
      }
    }, (error) => {
      console.error('Google Sign-In Error:', error);
      // this.toastr.error('Error while logging in with Google. Please try again.');
    });

    this.countryCodes = this.spaceService.countryCodes;
  }

  onCountryCodeChange(country: any) {
    this.selectedIndex = this.countryCodes.findIndex((code: any) => code?.dialcode === country);
    this.updatePlaceholder();
  }

  updatePlaceholder() {
    if (this.selectedIndex) {
      this.placeholder = Array.from({ length: this.countryCodes?.this.selectedIndex['number-of-digits-in-number'] }, (_, i) => i).join('');
    }
  }

  ngAfterViewInit(): void {
    this.initializeIntlTelInput();
  }

  ngAfterContentChecked(): void {
    if (this.selectedLoginType === 'Mobile') {
      this.initializeIntlTelInput();
    } else {
      this.destroyIntlTelInput();
    }
  }

  private initializeIntlTelInput(): void {
    if (isPlatformBrowser(this.platformId)) {
      const input = document.querySelector("#tel") as HTMLInputElement;

      if (input && !this.itiInitialized) {
        this.iti = intlTelInput(input, {
          initialCountry: "auto",
          geoIpLookup: function (success, failure) {
            fetch('https://ipinfo.io')
              .then(response => response.json())
              .then(data => success(data.country))
              .catch(() => success('IN'));
          },
          utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js'
        });

        input.addEventListener("countrychange", () => this.onCountryChange2(this.iti));
        this.itiInitialized = true;
      }

      const input2 = document.querySelector("#tel2") as HTMLInputElement;

      if (input2 && !this.iti2Initialized) {
        this.iti2 = intlTelInput(input2, {
          initialCountry: "auto",
          geoIpLookup: function (success, failure) {
            fetch('https://ipinfo.io')
              .then(response => response.json())
              .then(data => success(data.country))
              .catch(() => success('IN'));
          },
          utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js'
        });

        input2.addEventListener("countrychange", () => this.onCountryChange2(this.iti2));
        this.iti2Initialized = true;
      }

      const input3 = document.querySelector("#tel3") as HTMLInputElement;

      if (input3 && !this.iti3Initialized) {
        this.iti3 = intlTelInput(input3, {
          initialCountry: "auto",
          geoIpLookup: function (success, failure) {
            fetch('https://ipinfo.io')
              .then(response => response.json())
              .then(data => success(data.country))
              .catch(() => success('IN'));
          },
          utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js'
        });

        input3.addEventListener("countrychange", () => this.onCountryChange2(this.iti3));
        this.iti3Initialized = true;
      }
    }
  }

  private destroyIntlTelInput(): void {
    if (this.iti) {
      this.iti?.destroy();
      this.iti = null;
    }

    if (this.iti2) {
      this.iti2?.destroy();
      this.iti2 = null;
    }

    if (this.iti3) {
      this.iti3?.destroy();
      this.iti3 = null;
    }
  }

  resetIntlTelInputInitialization(): void {
    this.itiInitialized = false;
    this.iti2Initialized = false;
    this.iti3Initialized = false;
  }

  onLibraryCheck(): void {
    this.resetIntlTelInputInitialization();
    this.initializeIntlTelInput();
  }

  destroyLibrary() {
    this.iti?.destroy();
  }

  onCountryChange2(iti: any) {
    alert("aa")
    this.selectedCountryData = iti.getSelectedCountryData();
    this.mobileLoginForm.patchValue({ "phone_code": this.selectedCountryData?.dialCode });
    this.mobileNumberForm.patchValue({ "phone_code": this.selectedCountryData?.dialCode });
  }

  startCounter() {
    this.counter = 30
    this.countDown = timer(0, this.tick)
      .pipe(take(this.counter))
      .subscribe(() => {
        --this.counter;
        if (this.counter == 0) {
          this.countDown.unsubscribe();
        }
      });
  }

  loginByGoogle(user: any) {
    this.selectedLoginType = LoginTypeEnum.Google;
    this.socialUserFirstName = user.firstName;
    this.socialUserLastName = user.lastName;
    this.userEmailRegisterForm.patchValue({ "firstName": this.socialUserFirstName, "lastName": this.socialUserLastName })
    let data = {
      email: user?.email,
      picture: user?.photoUrl,
      id: user?.id,
    };
    let authToken = localStorage.getItem('authToken');
    if (!authToken) {
      this.loginRegisterService
        .checkGoogleAccountLogin(data)
        .subscribe((res: any) => {
          this.socialAuthService.signOut();
          if (res?.existsEmail) {
            if (res?.userdata?.status === "De-Active") {
              this.toastr.error(res.msg || 'Your Acount is not Activated. Please contact to Administator.');
              this.closeDialog(true);
            } else {
              this.showUserRegister = true;
              localStorage.setItem('userDetails', JSON.stringify(res?.userdata));
              // this.userService.userDetails.next(res?.user);
              localStorage.setItem('isLoggedIn', 'true');
              localStorage.setItem('authToken', res?.userdata?.accessToken);
              // window.location.reload();
              this.userService.isLoggedInSource.next(true);
              this.toastr.success(res.msg || 'Login Successfully');
              this.closeDialog(true);
            }
          } else {
            this.showUserRegister = true;
            this.showEmailUserRegister = true;
            this.userEmailRegisterForm.get('email')?.clearValidators();
            this.userEmailRegisterForm.get('email').updateValueAndValidity();
            this.userEmailRegisterForm
              .get('mobile')
              ?.setValidators([
                Validators.required,

              ]);
            this.userEmailRegisterForm.get('mobile').updateValueAndValidity();
          }
        });
    } else {
    }
  }
  get mobileFormControl() {
    return this.mobileNumberForm.controls;
  }

  get otpControl() {
    return this.otpForm.controls;
  }

  // forgot password otp form control
  get forgotPasswordOtpControl() {
    return this.forgotPasswordOtpForm.controls;
  }

  get emailOtpControl() {
    return this.emailOtpForm.controls;
  }
  get forgotEmailOtpFormControls() {
    return this.forgotEmailOtpForm.controls;
  }
  get loginVerifyFormControls() {
    return this.loginVerifyForm.controls;
  }

  get emailFormControl() {
    return this.emailForm.controls;
  }

  // forgot password form control
  get forgotFormControl() {
    return this.userForgotForm.controls;
  }

  get f() {
    return this.userRegisterForm.controls;
  }

  get userEmailRegisterControls() {
    return this.userEmailRegisterForm.controls;
  }
  get userCreatePassFormControls() {
    return this.userCreatePassForm.controls;
  }
  get resetPasswordFormControls() {
    return this.resetPasswordForm.controls;
  }

  private createCustomForms(): void {
    // mobile form
    this.mobileNumberForm = this.fb.group({
      mobile: [
        '',
        [Validators.required],
      ],
      phone_code: ['+91', Validators.required],
      email: ['', Validators.required],   //, Validators.email
    });
    this.mobileLoginForm = this.fb.group({
      mobile: [
        '',
        [Validators.required],
      ],
      phone_code: ['+91']
    });

    // mobile otp form
    this.otpForm = this.fb.group({
      otp1: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
      otp2: ['', [Validators.required, Validators.pattern(/^[0-9]d*$/)]],
      otp3: ['', [Validators.required, Validators.pattern(/^[0-9]d*$/)]],
      otp4: ['', [Validators.required, Validators.pattern(/^[0-9]d*$/)]],
    });
    this.forgotOtpForm = this.fb.group({
      otp1: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
      otp2: ['', [Validators.required, Validators.pattern(/^[0-9]d*$/)]],
      otp3: ['', [Validators.required, Validators.pattern(/^[0-9]d*$/)]],
      otp4: ['', [Validators.required, Validators.pattern(/^[0-9]d*$/)]],
    });
    this.loginVerifyForm = this.fb.group({
      otp1: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
      otp2: ['', [Validators.required, Validators.pattern(/^[0-9]d*$/)]],
      otp3: ['', [Validators.required, Validators.pattern(/^[0-9]d*$/)]],
      otp4: ['', [Validators.required, Validators.pattern(/^[0-9]d*$/)]],
    });

    // forgot password otp form
    this.forgotPasswordOtpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.pattern('[0-9]{10}$')]],
      password: ['', [Validators.required]],
      confirmPassword: [''],
    });

    // email form
    this.emailForm = this.fb.group(
      {
        username: [''],
        email: ['', [Validators.required, Validators.email]],
        mobile: [''],
        password: ['', [Validators.required]],
        confirmPassword: [''],
        // newPasswod: [
        //   '',
        //   Validators.required,
        //   Validators.minLength(8),
        //   Validators.maxLength(16),
        //   this.customValidator.patternValidator(),
        // ],
        // confirmPassword: [
        //   '',
        //   Validators.required,
        //   Validators.minLength(8),
        //   Validators.maxLength(16),
        //   this.customValidator.patternValidator(),
        // ],
      }
      // {
      //   validator: confirmedValidator('newPasswod', 'confirmPassword'),
      // }
    );

    // email otp form
    this.emailOtpForm = this.fb.group({
      emailOtp: ['', [Validators.required]],
    });
    this.forgotEmailOtpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });

    // forgot form
    this.userForgotForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/),
        ],
      ],
    });

    // mobile register form
    this.userRegisterForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
    // create password form
    this.userCreatePassForm = this.fb.group({
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });

    // email register form
    this.userEmailRegisterForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('^[A-za-z]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[A-za-z]+$')]],
      mobile: [
        '', Validators.required
      ],
      phone_code: ['+91', Validators.required],
      // password: ['', [Validators.required]],
      // confirmPassword: [''],
      email: [''],
      companyName: [''],
    });
  }

  resendOtp() {
    this.regLogType == LoginTypeEnum.Mobile
      ? this.sendMobileOTP()
      : this.sendEmailOTP();
  }

  public sendMobileOTP(): void {
    if (this.selectedLoginType == LoginTypeEnum.Mobile) {
      if (!this.mobileFormControl['mobile'].valid) {
        this.mobileNumberForm.markAllAsTouched();
        return;
      }
      this.isLoading = true;
      this.loginRegisterService
        .sendMobileOTP(this.mobileNumberForm.value.mobile, this.mobileNumberForm.value.phone_code)
        .subscribe(
          (res: any) => {
            if (res.success) {
              this.isLoading = false;
              if (res?.existingUser) {
                // this.userAction = 'login';
                this.toastr.success(res.message);
              } else {
                this.otpReceived = true;
                this.counter = 30;
                this.startCounter();
                this.newUser = res?.user?.newUser || res?.newUser;
                this.existingUser = res?.user?.existingUser;
                if (res?.user) {
                  localStorage.setItem('userDetails', JSON.stringify(res?.user));
                  localStorage.setItem('authToken', res?.user?.accessToken || '');
                  this.userService.userDetails.next(res?.user);
                  this.userDetail = JSON.parse(
                    localStorage.getItem('userDetails')
                  );
                }
                this.toastr.success(res.message || 'OTP sent successfully!');

              }

            } else {
              this.isLoading = false;
              this.toastr.error(
                res.message || 'Some error occurred while sent otp!'
              );
            }
          },
          (e) => {
            this.toastr.error('Some error occurred while sent otp!');
            this.isLoading = false;
          }
        );
    } else {
      if (
        this.mobileFormControl['email'].valid &&
        this.mobileNumberForm.value.email
      ) {
        this.isLoading = true;
        this.loginRegisterService
          .sendEmailOTP(this.mobileNumberForm.value.email)
          .subscribe(
            (res: any) => {
              if (res?.success == false) {
                this.toastr.error(res.message);
                this.isLoading = false;
              }

              if (res.message == 'OTP SENT SUCCESSFULLY') {
                this.otpReceived = true;
                this.counter = 30;
                this.startCounter();
                this.newUser = res?.user?.newUser;
                this.existingUser = res?.user?.existingUser;
                if (res?.user) {
                  localStorage.setItem(
                    'userDetails',
                    JSON.stringify(res?.user)
                  );
                  this.userService.userDetails.next(res?.user);
                  this.userDetail = JSON.parse(
                    localStorage.getItem('userDetails')
                  );
                }

                this.toastr.success(res.message || 'OTP sent successfully!');
                this.isLoading = false;
              }
              if (res?.existsEmail) {
                this.isLoading = false;
                this.toastr.success('User already registred please login');
                this.userAction = 'login';
                this.loginType = LoginTypeEnum.Email
              }
            },
            (e) => {
              this.isLoading = false;
              this.toastr.error(e + 'Some error occurred while sent otp!');
            }
          );
      }
    }
  }

  sendEmailOTP() {
    if (this.emailOtpForm.valid) {
      this.isLoading = true;
      this.loginRegisterService
        .sendEmailOTP(this.emailOtpForm.value.emailOtp)
        .subscribe((res: any) => {
          this.isLoading = false;
          if (res) {
            this.emailOtpForgotReceived = true;
            this.isForgotPass = false;
          } else {
            // this.toastr.error(res?.message);
            this.isLoading = false;
          }
        });
    } else {
      this.emailOtpForm.markAllAsTouched();
    }
  }
  sendForgotEmailOTP() {
    if (this.forgotEmailOtpForm.valid) {
      this.isLoading = true;
      this.loginRegisterService
        .sendForgotEmailOTP(this.forgotEmailOtpForm.value.email)
        .subscribe((res: any) => {
          if (res['success'] === true) {
            this.startCounter();
            this.isLoading = false;
            this.emailOtpForgotReceived = true;
            this.isForgotPass = false;
          } else {
            this.isLoading = false;
            this.toastr.error(res?.message);
          }
        });
    } else {
      this.emailOtpForm.markAllAsTouched();
    }
  }

  public loginWithEmail(): void {
    if (this.emailForm.invalid) {
      return;
    }
    if (this.isRegister) {
      this.createUser();
    } else {
      this.userLogin();
    }
  }

  public createUser(): void {
    const formValue = this.emailForm.getRawValue();
    let payload: any = {
      name: formValue.username,
      email: formValue.email,
      password: formValue.password,
      confirmpassword: formValue.confirmPassword,
    };
    if (formValue.mobile != null) {
      payload.mobile = formValue.mobile;
    }
    this.loginRegisterService.registerByEmail(payload).subscribe(
      (res: any) => {
        if (res['success'] === true) {
          // window.location.reload();
          // this.otpReceived = true;
          if (res?.user) {
            this.userService.userDetails.next(res?.user);
          }
          this.closeDialog(null);
        }
      },
      (error) => {
        this.toastr.error('Some error occurred while register!');
      }
    );
  }

  public userLogin(): void {
    const formValue = this.emailForm.getRawValue();
    let payload = {
      email: formValue.email,
      password: formValue.password,
    };
    if (
      this.emailForm.get('email').valid &&
      this.emailForm.get('password').valid
    ) {
      this.isLoading = true;
      this.loginRegisterService.loginByEmail(payload).subscribe(
        (res: any) => {
          if (res['success'] === true) {

            if (res?.User.existsEmail) {
              if (res?.User?.status === "De-Active") {
                this.toastr.error('Your Acount is not Activated. Please contact to Administator.');
                this.closeDialog(true);
              } else {
                this.showUserRegister = true;
                localStorage.setItem('userDetails', JSON.stringify(res?.User));
                // this.userService.userDetails.next(res?.user);
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('authToken', res?.User?.accessToken);
                // window.location.reload();
                this.userService.isLoggedInSource.next(true);
                this.toastr.success(res.msg || 'Login Successfully');
                this.closeDialog(true);
              }
            }

            // this.isLoading = false;
            // this.showUserRegister = true;
            // // localStorage.setItem('userDetails', JSON.stringify(res?.user))
            // // this.userService.userDetails.next(res?.user);
            // // this.checkIsExistEmail(formValue.email, 'loginWithEmail');
            // localStorage.setItem('isLoggedIn', 'true');
            // localStorage.setItem('userDetails',JSON.stringify(res?.User));
            // localStorage.setItem('authToken', res.accessToken || res?.user?.accessToken);
            // this.userService.isLoggedInSource.next(true);
            // // window.location.reload();
            // this.toastr.success(res.msg || 'Login Successfully');
            // this.router.navigate(['/dashboard']);
            // this.closeDialog(true);
          } else {
            this.toastr.error(
              res.message || 'Some error occurred while login!'
            );
            this.isLoading = false;
          }
        },
        (error) => {
          this.isLoading = false;
          this.toastr.error('Some error occurred while login!');
        }
      );
    } else {
      this.emailForm.markAllAsTouched();
    }
  }

  public handleLoginMethod(type: LoginTypeEnum): void {
    this.headerTitle = 'Login/Register';
    this.selectedLoginType = type;
    this.isForgotPassword = false;
    this.isRegister = false;
    this.forgotPasswordErrorMessage = null;
    this.emailForm.reset();
    this.userForgotForm.reset();

    if (this.selectedLoginType === LoginTypeEnum.Google) {
      // window.open(`${environment.apiUrl}/auth/google`, '_blank')
      // window.open('http://localhost:3009/auth/google', '_blank')
      this.loginRegisterService.loginWithGoogle().subscribe((res) => {
      });
      // this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(res => {
      //   this.authService.authState.subscribe((user) => {
      //     this.user = user;
      //     this.loggedIn = (user != null);
      //   });
      // });
    }
    if (this.selectedLoginType == LoginTypeEnum.Email) {
      this.mobileNumberForm
        .get('email')
        ?.setValidators([Validators.email, Validators.required]);
      this.mobileNumberForm.get('email').updateValueAndValidity();
      this.mobileNumberForm.get('mobile')?.clearValidators();
      this.mobileNumberForm.get('mobile').updateValueAndValidity();
    }
    if (this.selectedLoginType == LoginTypeEnum.Mobile) {
      this.mobileNumberForm
        ?.get('email')
        ?.clearValidators();
      this.mobileNumberForm.get('email').updateValueAndValidity();


      this.mobileNumberForm
        .get('mobile')
        ?.setValidators([
          Validators.required,
          Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
        ]);
      this.mobileNumberForm
        .get('mobile')
        .updateValueAndValidity();
    }
  }

  googleLogin() {
    // gapi.auth2
    //   .getAuthInstance()
    //   .signIn()
    //   .then(
    //     (googleUser) => {
    //       // User signed in.
    //       const profile = googleUser.getBasicProfile();
    //     },
    //     (error) => {
    //       // Handle error
    //       console.error('Error signing in with Google:', error);
    //     }
    //   );
    // this.loginRegisterService.loginWithGoogle().subscribe((res) => {
    // });

    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  loginWithGoogle() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  public handleForgotPassword(): void {
    this.headerTitle = 'Forgot Password';
    this.isForgotPassword = true;
  }

  public submitLogin(type: string): void {
    if (type === 'mobile') {
    }
  }

  public verifyOtp() {

    if (this.selectedLoginType == 'Mobile') {

      this.verifyMobileRegisterOTP();

    } else if (this.selectedLoginType == 'Email') {

      this.verifyEmailRegisterOTP();
    } else {

      this.toastr.error("Invalid registration type", 'Error');
    }

  }

  verifyMobileRegisterOTP() {
    if (this.otpForm.valid) {
      let otp = this.otpForm.value.otp1 + this.otpForm.value.otp2 + this.otpForm.value.otp3 + this.otpForm.value.otp4;
      this.isLoading = true;
      this.loginRegisterService.verifyregisterOTP(this.mobileNumberForm.value.mobile, otp).subscribe((res: any) => {
        if (res['success'] === true) {
          this.isLoading = false;
          this.toastr.success(res.message || 'OTP verified successfully!');
          this.otpReceived = true;
          this.userEmailRegisterForm.patchValue({ "mobile": res.mobile })
          this.showEmailUserRegister = true;
          this.showUserRegister = true;
          this.otpReceived = false;
          this.userEmailRegisterForm.get('email')?.clearValidators();
          this.userEmailRegisterForm
            .get('email')
            .updateValueAndValidity();
          this.userEmailRegisterForm
            .get('mobile')
            ?.setValidators([
              Validators.required,

            ]);
          this.userEmailRegisterForm
            .get('mobile')
            .updateValueAndValidity();

        } else {
          this.isLoading = false;
          this.toastr.error(res.message || 'Some error occurred while login!');
        }
      }, (err) => {
        this.isLoading = false;
        this.toastr.error(
          err.error.message || 'Some error occurred otp verification!'
        );
      })
    }
  }

  verifyEmailRegisterOTP() {
    if (this.otpForm.valid) {
      if (
        (this.otpReceived || !this.isLoginEmailIsExists) &&
        this.selectedLoginType === LoginTypeEnum.Email
      ) {
        let otp =
          this.otpForm.value.otp1 +
          this.otpForm.value.otp2 +
          this.otpForm.value.otp3 +
          this.otpForm.value.otp4;
        this.isLoading = true;
        this.loginRegisterService
          .verifyEmailOTP(this.mobileNumberForm.value.email, otp)
          .subscribe(
            (res: any) => {
              if (res['success'] === true) {
                this.isLoading = false;
                this.toastr.success(
                  res.message || 'OTP verified successfully!'
                );
                this.UserId = res?.user?.id || res?.user?.userData?.id;
                this.showEmailUserRegister = true;
                this.showUserRegister = true;
                this.otpReceived = false;
                this.userEmailRegisterForm.get('email')?.clearValidators();
                this.userEmailRegisterForm
                  .get('email')
                  .updateValueAndValidity();
                this.userEmailRegisterForm
                  .get('mobile')
                  ?.setValidators([
                    Validators.required,

                  ]);
                this.userEmailRegisterForm
                  .get('mobile')
                  .updateValueAndValidity();
              } else {
                this.isLoading = false;
                this.toastr.error(
                  res.message || 'Some error occurred while otp verification!'
                );
              }
            },
            (err) => {
              this.isLoading = false;
              this.toastr.error(
                err.error.message || 'Some error occurred otp verification!'
              );
            }
          );
      } else {
        let otp =
          this.otpForm.value.otp1 +
          this.otpForm.value.otp2 +
          this.otpForm.value.otp3 +
          this.otpForm.value.otp4;
        this.userDetail = JSON.parse(localStorage.getItem('userDetails'));
        this.isLoading = true;
        this.loginRegisterService
          .verifyOTP(
            Number(
              this.userDetail?.mobile || this.mobileNumberForm.value.mobile
            ),
            Number(otp)
          )
          .subscribe(
            (res: any) => {
              if (res['success'] === true) {
                this.isLoading = false;
                this.toastr.success('OTP verified successfully!');
                this.UserId = res.user.id || res?.user?.userData?.id;
                this.showEmailUserRegister = true;
                this.otpReceived = false;
                this.newUser = res?.user?.newUser;
                localStorage.setItem(
                  'authToken',
                  res?.accessToken || res?.user?.accessToken
                );
                if (this.newUser) {
                  this.showUserRegister = true;
                  localStorage.setItem(
                    'authToken',
                    res.accessToken || res?.user?.accessToken
                  );
                  localStorage.setItem(
                    'userDetails',
                    JSON.stringify(res?.user)
                  );
                  this.userEmailRegisterForm.get('mobile')?.clearValidators();
                  this.userEmailRegisterForm
                    .get('mobile')
                    .updateValueAndValidity();
                  this.userEmailRegisterForm
                    .get('email')
                    ?.setValidators([Validators.email, Validators.required]);
                  this.userEmailRegisterForm
                    .get('email')
                    .updateValueAndValidity();
                } else {
                  if (res?.user) {
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem(
                      'authToken',
                      res.accessToken || res?.user?.accessToken
                    );
                    localStorage.setItem(
                      'userDetails',
                      JSON.stringify(res?.user)
                    );
                  }
                  this.userService.isLoggedInSource.next(true);
                  this.closeDialog(null);
                  // this.router.navigate(['/dashboard']);
                }
              } else {
                this.isLoading = false;
                this.toastr.error(
                  res.message || 'Some error occurred while otp verification!')
                this.showUserRegister = true;
              }
            },
            (err) => {
              this.isLoading = false;
              this.toastr.error(
                err.error.message || 'Some error occurred otp verification!'
              );
              console.error(err);
            }
          );
      }
    } else {
      this.otpForm.markAllAsTouched();
    }
  }

  // public forgotPassword() {
  //   this._memberService.forgotPassword(this.mobile)
  //     .then(res => {
  //       if (res.success) {
  //         this.otp_sent_forgot = true;
  //         this.show_mobile = false;
  //         this.show_otp = true;
  //         // this.alert_success = 'success';
  //         this.openSnackBar(res.message, "Dismiss");
  //         // this.otp_sent = true;
  //       } else {
  //         // this.alert_success = 'warn';
  //         this.openSnackBar(res.message, "Dismiss");
  //       }
  //     })
  // }

  public forgotPassword(): void {
    this.forgotPasswordOtpForm.reset();
    const formValue = this.userForgotForm.getRawValue();
    let payload = {
      email: formValue.email,
      type: 'reset',
    };
    this.loginRegisterService.forgotPassword(payload).subscribe(
      (res: any) => {
        if (res.success) {
          // this.closeDialog(null);
          this.headerTitle = 'Reset Password';
          this.isForgotPassword = false;
          this.showUserRegister = false;
          this.forgotPasswordOtpReceived = true;
          this.toastr.success(res.message || 'Success');
        } else {
          this.toastr.error(res.message || 'Success');
        }
      },
      (error) => {
        this.toastr.error('Some error occurred while forgot password!');
      }
    );
  }

  public resetPassword() {
    const formValue = this.forgotPasswordOtpForm.getRawValue();
    if (formValue.password != formValue.confirmPassword) {
      this.toastr.error('Password and Confirm Password must be match!');
      return false;
    }
    let payload = {
      reset_password_code: formValue.otp,
      password: formValue.password,
      email: this.userForgotForm.value.email,
    };
    this.isLoading = true;
    this.loginRegisterService.resetPassword(payload).subscribe(
      (res: any) => {
        if (res.success) {
          this.isLoading = false;
          this.toastr.success(res.message || 'Password reset successfully');
          this.closeDialog(null);
        } else {
          this.isLoading = false;
          this.toastr.error(
            res?.message || 'Some error occurred while reset password!'
          );
        }
      },
      (error) => {
        this.isLoading = false;
        this.toastr.error('Some error occurred while reset password!');
      }
    );
  }
  // need flow change in this
  public registerUser(): void {
    if (this.showEmailUserRegister) {

      const formValue = this.userEmailRegisterForm.getRawValue();
      let payload = {
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        mobile:
          (formValue.mobile) ||
          (this.userDetail?.mobile) ||
          (this.mobileLoginForm.get('mobile').value),
        phone_code:
          formValue.mobile?.phone_code ||
          this.mobileLoginForm.value.phone_code ||
          this.mobileNumberForm.value.phone_code || '+91',
        email:
          formValue.email || this.userDetail?.email || this.socialUser?.email,
        companyName: formValue.companyName,
      };

      if (this.userEmailRegisterForm.get('mobile').value == '') {
        this.mobileLoginForm.markAllAsTouched();
        // return;
      }

      let registerType;
      if (this.selectedLoginType == 'Email') {
        registerType = this.mobileNumberForm.value.email;
      } else if (this.selectedLoginType == 'Google') {
        registerType = this.socialUser?.email;
      } else if (this.selectedLoginType == 'Mobile') {
        registerType = this.mobileNumberForm.value.mobile || this.mobileLoginForm.get('mobile').value;
      }

      this.isLoading = true;
      this.loginRegisterService
        .registerEmail(registerType, payload, this.selectedLoginType)
        .subscribe(
          (res: any) => {
            if (res['success'] === true) {
              if ((res?.regType == 'social') || (this.selectedLoginType == LoginTypeEnum.Mobile)) {
                this.isLoading = false;
                this.toastr.success(res.message || 'User Register successfully!');
                this.showUserRegister = false;
                localStorage.setItem('userDetails', JSON.stringify(res?.result));
                this.userService.userDetails.next(res?.result);
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('authToken', res?.result?.accessToken);
                this.closeDialog(true);
              } else {

                this.isLoading = false;
                this.toastr.success(res.message || 'User Register successfully!');
                this.showUserRegister = false;
                this.createPassword = true;
              }
            } else {
              this.isLoading = false;
              this.toastr.error(
                res.message || 'Some error occurred while register!'
              );
            }
          },
          (error) => {
            this.isLoading = false;
            this.toastr.error('Some error occurred while register!');
          }
        );
    } else {
      if (this.userRegisterForm.invalid) {
        return;
      }
      const formValue = this.userRegisterForm.getRawValue();
      let payload = {
        name: formValue.fullName,
        email: formValue.email,
      };
      this.isLoading = true;
      this.loginRegisterService.registerEmail(this, payload).subscribe(
        (res: any) => {
          if (res['success'] === true) {
            this.isLoading = false;
            this.showUserRegister = true;
            if (res?.result) {
              localStorage.setItem('userDetails', JSON.stringify(res?.result));
              this.userService.userDetails.next(res?.result);
              localStorage.setItem('isLoggedIn', 'true');
              localStorage.setItem('authToken', res?.result?.accessToken);
            }
            this.userService.isLoggedInSource.next(true);
            this.closeDialog(null);
          }
        },
        (error) => {
          this.isLoading = false;
          this.toastr.error('Some error occurred while register!');
          console.error(error);
        }
      );
    }
  }

  public handleRegister(): void {
    this.isRegister = !this.isRegister;
    if (this.isRegister) {
      this.emailForm.reset();
      this.emailForm.get('username').setValidators(Validators.required);
      this.emailForm.get('confirmPassword').setValidators(Validators.required);
      this.emailForm.get('username').updateValueAndValidity();
      this.emailForm.get('confirmPassword').updateValueAndValidity();
    } else {
      this.emailForm.reset();
      this.emailForm.get('username').clearValidators();
      this.emailForm.get('confirmPassword').clearValidators();
      this.emailForm.get('username').updateValueAndValidity();
      this.emailForm.get('confirmPassword').updateValueAndValidity();
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 1000,
    });
  }

  public closeDialog(options) {
    this.ref.close(options);
  }

  public checkIsEmailExists() {
    if (
      this.emailForm.controls.email.valid &&
      this.emailForm.value.email != ''
    ) {
      this.checkIsExistEmail(this.emailForm.value.email, 'checkEmail');
    }
  }

  public checkIsExistEmail(email, type) {
    let payload = {
      email: email,
    };
    this.loginRegisterService.checkIsEmailExists(payload).subscribe(
      (result: any) => {
        if (result.newEmail) {
          this.toastr.success(result.message || 'Otp sent successfully');
          this.isLoginEmailIsExists = false;
          this.otpReceived = true;
          this.forgotPasswordOtpReceived = false;
          this.showUserRegister = false;
        } else {
          if (result.existsEmail) {
            this.isLoginEmailIsExists = true;
            if (type == 'loginWithEmail') {
              if (result?.userdata) {
                localStorage.setItem(
                  'userDetails',
                  JSON.stringify(result?.userdata)
                );
                this.userService.userDetails.next(result?.userdata);
              }
            }
          } else if (!result.success) {
            this.toastr.error(
              result.message ||
              'Some error occured while check email is exists!'
            );
            return false;
          }
        }
      },
      (error) => {
        this.toastr.error('Some error occurred while check email is exists!');
      }
    );
  }

  onDigitInput(event, data?, data2?) {

    let element;
    if (event.code !== 'Backspace')
      element = event.srcElement.nextElementSibling;

    if (event.code === 'Backspace')
      element = event.srcElement.previousElementSibling;

    if (element == null)
      return;
    else
      element.focus();
  }


  hidePassword1 = true;
  hidePassword2 = true;
  hidePassword3 = true;
  isPasswordVisible: boolean = false;
  togglePasswordVisibility(passwordId: string, iconId: string) {
    if (isPlatformBrowser(this.platformId)) {

      this.isPasswordVisible = !this.isPasswordVisible;
      const input = document.getElementById('password1') as HTMLInputElement;
      if (input) {
        input.type = this.isPasswordVisible ? 'text' : 'password';
      }
    }
  }
  
  togglePasswordVisibility2(passwordId: string, iconId: string) {
    if (isPlatformBrowser(this.platformId)) {

      this.isPasswordVisible = !this.isPasswordVisible;
      const input = document.getElementById('password2') as HTMLInputElement;
      if (input) {
        input.type = this.isPasswordVisible ? 'text' : 'password';
      }
    }
  }



  createUserPassword() {
    let payload = {
      password: this.userCreatePassForm.value.newPassword,
    };
    if (
      this.userCreatePassForm.value.newPassword ==
      this.userCreatePassForm.value.confirmPassword
    ) {
      let email =
        this.mobileNumberForm.value.email ||
        this.userEmailRegisterForm.get('email').value ||
        this.socialUser?.email;
      this.isLoading = true;
      this.loginRegisterService
        .createUserPassword(email, payload)
        .subscribe((res: any) => {
          if (res?.success) {
            this.isLoading = false;
            this.createPassword = false;
            this.userAction = 'login';
            this.toastr.success('Profile completed');
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('authToken', res?.data?.accessToken);
            localStorage.setItem('userDetails', JSON.stringify(res?.data));
            this.userService.isLoggedInSource.next(true);
            this.dialogRef.close(true);
          }
        });
    } else {
      this.isLoading = false;
      this.toastr.error('Please enter new password and confirm password same');
    }
  }

  forgotPasswordOtpVerify() { }

  verifyForgotOtp() {
    if (this.forgotOtpForm.valid) {
      let otp =
        this.forgotOtpForm.value.otp1 +
        this.forgotOtpForm.value.otp2 +
        this.forgotOtpForm.value.otp3 +
        this.forgotOtpForm.value.otp4;
      this.isLoading = true;
      this.loginRegisterService
        .verifyForgotEmailOTP(this.forgotEmailOtpForm.value.email, otp)
        .subscribe(
          (res: any) => {
            if (res['success'] === true) {
              this.isLoading = false;
              this.toastr.success(res.message || 'OTP verified successfully!');
              this.emailOtpForgotReceived = false;
              this.resetPasswordForLogin = true;
            } else {
              this.isLoading = false;
              this.toastr.error(
                res.message || 'Some error occurred while otp verification!'
              );
            }
          },
          (err) => {
            this.isLoading = false;
            this.toastr.error(
              err.error.message || 'Some error occurred otp verification!'
            );
          }
        );
    } else {
      this.otpForm.markAllAsTouched();
    }
  }

  resetUserPassword() {
    if (
      this.resetPasswordForm.value.newPassword ==
      this.resetPasswordForm.value.confirmPassword
    ) {
      let data = {
        password: this.resetPasswordForm.value.newPassword,
        reset_password_code:
          this.forgotOtpForm.value.otp1 +
          this.forgotOtpForm.value.otp2 +
          this.forgotOtpForm.value.otp3 +
          this.forgotOtpForm.value.otp4,
        email: this.forgotEmailOtpForm.value.email,
      };
      this.isLoading = true;
      this.loginRegisterService.resetForgotPassword(data).subscribe((res) => {
        if (res['success'] === true) {
          this.isLoading = false;
          this.resetPasswordForLogin = false;
          this.toastr.success('Password reset successfully Please login');
        }
      });
    } else {
      this.isLoading = false;
      this.toastr.error('Please enter new password and confirm password same');
    }
  }
  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return (
      ('00' + minutes).slice(-2) +
      ':' +
      ('00' + Math.floor(value - minutes * 60)).slice(-2)
    );
  }
  sendMobileLoginOTP() {
    if (!this.mobileLoginForm.valid) {
      this.mobileLoginForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    this.loginRegisterService
      .LoginWithMobile(this.mobileLoginForm.value.mobile, this.mobileLoginForm.value.phone_code)
      .subscribe((res: any) => {
        if (res.success === true) {
          if (!res?.existingUser) {
            this.userAction = 'login';
            this.toastr.success(res.message);

            // if (res?.User.existsEmail) {
            //   if (res?.User?.status=== "De-Active"){
            //     this.toastr.error('Your Acount is not Activated. Please contact to Administator.');
            //     this.closeDialog(true);
            //   } else {
            //     this.showUserRegister = true;
            //     localStorage.setItem('userDetails', JSON.stringify(res?.User));
            //     // this.userService.userDetails.next(res?.user);
            //     localStorage.setItem('isLoggedIn', 'true');
            //     localStorage.setItem('authToken', res?.User?.accessToken);
            //     // window.location.reload();
            //     this.userService.isLoggedInSource.next(true);
            //     this.toastr.success(res.msg || 'Login Successfully');
            //     this.closeDialog(true);
            //   }
            // }

          } else {

            this.counter = 30;
            this.startCounter();
            this.isLoading = false;
            this.loginOtpReceived = true;
            this.toastr.success(res['message'] || 'Otp send to your mobile');
          }
        } else {
          this.toastr.error(res['message']);
          this.isLoading = false;
        }
      });
  }

  verifyLoginOtp() {
    if (!this.loginVerifyForm.valid) {
      this.loginVerifyForm.markAllAsTouched();
      return;
    }
    let mobile = this.mobileLoginForm.value.mobile;
    let otp =
      this.loginVerifyForm.value.otp1 +
      this.loginVerifyForm.value.otp2 +
      this.loginVerifyForm.value.otp3 +
      this.loginVerifyForm.value.otp4;
    this.isLoading = true;
    this.loginRegisterService
      .verifyLoginOtp(mobile, otp)
      .subscribe((res: any) => {
        if (res['success'] === true) {
          this.isLoading = false;
          this.loginOtpReceived = false;
          if (res.user.newUser) {
            localStorage.setItem('userDetails', JSON.stringify(res?.user));
            res?.user?.accessToken ? localStorage.setItem('authToken', res?.user?.accessToken) : '';
            this.showUserRegister = true;
            this.showEmailUserRegister = true;
            this.userAction = 'register';
            this.selectedLoginType === LoginTypeEnum.Mobile;
            this.userEmailRegisterForm.get('mobile')?.clearValidators();
            this.userEmailRegisterForm.get('mobile').updateValueAndValidity();
            this.userEmailRegisterForm
              .get('email')
              ?.setValidators([Validators.required, Validators.email]);
            this.userEmailRegisterForm.get('email').updateValueAndValidity();
          } else {
            this.dialogRef.close(true);
            if (res?.user) {

              if (res?.user?.status === "De-Active") {
                this.toastr.error(res.msg || 'Your Acount is not Activated. Please contact to Administator.');
              } else {
                localStorage.setItem('userDetails', JSON.stringify(res?.user));
                localStorage.setItem('authToken', res?.user?.accessToken);
                localStorage.setItem('isLoggedIn', 'true');
                this.toastr.success('Login Successfully');
              }
            }
          }
        } else {
          this.isLoading = false;
          this.toastr.error("Please enter correct OTP");
        }
      });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
  }
  // this.socialAuthService.signOut();
}
