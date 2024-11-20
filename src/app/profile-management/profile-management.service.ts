import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { AppGlobals } from "../services/app-globals";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root',
  })
export class ProfileManagementService {
    apiUri: string = environment.apiUrl;
    private getAllCountries = environment.apiUrl + "/api/v1/user/getAllCountries";
    private getAllStates = environment.apiUrl + "/api/v1/user/getAllStatesById";
    private getAllCity = environment.apiUrl + "/api/v1/user//getAllCities";

    

    constructor(private http: HttpClient, private appGlobals: AppGlobals) {}

    updateProfileDetails(id, data) {
        return this.http.post(`${this.apiUri}/api/v1/user/updateProfile`,data, { headers: this.appGlobals.setHeaders()});
    }
    changeUserPassword(data) {
        return this.http.post(`${this.apiUri}/api/v1/user/changeUserPassword`,data, { headers: this.appGlobals.setHeaders()});
    }

    uploadProfileImage(formData:any){
        return this.http.post(`${this.apiUri}/api/v1/user/updateProfileImage`,formData, { headers: this.appGlobals.setHeaders()});
    }

    fetchProfiledata(){
        return this.http.get(`${this.apiUri}/api/v1/user/viewProfile`, { headers: this.appGlobals.setHeaders()});
    }

    getAllCountry() {
        return this.http.get(this.getAllCountries , { headers: this.appGlobals.setHeaders()} );
    }

    getAllState(cityId:any){
        let search_condition =`?countryId=${cityId}`;
        return this.http.get(this.getAllStates + search_condition , { headers: this.appGlobals.setHeaders()});
    }

    getAllCities(stateId:any){
        let search_condition =`?stateId=${stateId}`;
        return this.http.get(this.getAllCity + search_condition , { headers: this.appGlobals.setHeaders()});
    }
}