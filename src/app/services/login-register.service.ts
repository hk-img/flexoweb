import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppGlobals } from './app-globals';

@Injectable({
  providedIn: 'root',
})
export class LoginRegisterService {
  apiUri: string = environment.apiUrl;

  constructor(private http: HttpClient, private appGlobals: AppGlobals) {}

  getRegisteredUsersList() {
    return this.http.get(`${this.apiUri}/api/v1/user/users`);
  }
  checkGoogleAccountLogin(data:any) {
    return this.http.post(`${this.apiUri}/api/v1/user/checkGoogleAccount`,data)
  }

  LoginWithMobile(mobile: string,phone_code:Number) {
    let data = {
      "mobile": mobile,
      "phone_code":phone_code
    }
    return this.http.post(`${this.apiUri}/api/v1/user/login-Mobile-New`,
      data);
}

  sendMobileOTP(mobile: string,phone_code:Number) {
    let data = {
      "mobile": mobile,
      "phone_code":phone_code
    }
    return this.http.post(`${this.apiUri}/api/v1/user/loginWithMobile`,
      data);
  }
  sendEmailOTP(email: string) {
    let data = {
      "email": email
    }
    return this.http.post(`${this.apiUri}/api/v1/user/check-email`, data);
  }
  sendForgotEmailOTP(email: string) {
    return this.http.post(`${this.apiUri}/api/v1/user/forgotPasswordSendEmail`, {
      email,
    });
  }

  verifyregisterOTP(mobile: number, otp: number){
    return this.http.post(`${this.apiUri}/api/v1/user/registrationVerifyOTP/${mobile}`, {
      otp,
    });
  }
  verifyOTP(mobile: number, otp: number) {
    return this.http.post(`${this.apiUri}/api/v1/user/verifyOTP/${mobile}`, {
      otp,
    });
  }
  verifyLoginOtp(mobile: number, otp: number) {
    return this.http.post(`${this.apiUri}/api/v1/user/verifyOTP/${mobile}`, {
      otp,
    });
  }

  verifyEmailOTP(email: string, otp: number) {
    return this.http.post(`${this.apiUri}/api/v1/user/verifyemailotp/${email}`, {
      otp,
    });
  }
  verifyForgotEmailOTP(email: string, otp: number) {
    let data = {
      "otp": otp,
      "email": email
  }
    return this.http.post(`${this.apiUri}/api/v1/user/verifyEmailResetOtp/${email}`,
      data,
    );
  }

  checkUserExist(mobile: string) {
    return this.http.post(`${this.apiUri}/api/v1/user/login`, { mobile });
  }

  loginWithGoogle() {
    return this.http.get(`${this.apiUri}/auth/google`);
  }

  registerMobile(EmpId: string, data) {
    return this.http.post(`${this.apiUri}/api/v1/user/loginWithMobilePopup`, data, { headers:  this.appGlobals.setHeaders()});
  }

  registerEmail(email,data,type?) {
    if (type == 'Email' || type == 'Google') {
      data.regType=(type).toLowerCase();
      return this.http.post(`${this.apiUri}/api/v1/user/newemail/${email}`, data);
    } else {
      return this.http.post(`${this.apiUri}/api/v1/user/loginWithMobilePopup`, data);
    }
  }

  registerByEmail(data) {
    return this.http.post(`${this.apiUri}/api/v1/user/signup`, data);
  }

  loginByEmail(data) {
    return this.http.post(`${this.apiUri}/api/v1/user/userlogin`, data);
  }

  register(EmpId: string, data) {
    return this.http.post(`${this.apiUri}/api/v1/user/updateProfile/${EmpId}`, data);
  }
  forgotPassword(data) {
    return this.http.post(`${this.apiUri}/api/v1/user/forgotPasswordSendEmail`, data);
  }
  resetPassword(data) {
    return this.http.post(`${this.apiUri}/api/v1/user/resetpassword`, data);
  }
  resetForgotPassword(data) {
    return this.http.post(`${this.apiUri}/api/v1/user/forgotPasswordVerifyOtp`, data);
  }

  userLogOut(){
    return this.http.post(`${this.apiUri}/api/v1/user/userLogOut`,{}, { headers:  this.appGlobals.setHeaders()});
  }
  
  createUserPassword(email,data) {
    return this.http.post(`${this.apiUri}/api/v1/user/createPassword/${email}`, data);
    // https://flexoapinew.revolotech.com/api/v1/user/createPassword/:email
  
}


  checkIsEmailExists(data){
    return this.http.post(`${this.apiUri}/api/v1/user/check-email`,data);
  }
}
