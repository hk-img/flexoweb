import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppGlobals } from '../services/app-globals';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FavouriteWorkSpaceService {
    apiUri: string = environment.apiUrl;
    constructor(private http: HttpClient, private appGlobals: AppGlobals) {}

    getFavoriteList() {
        return this.http.get(`${this.apiUri}/api/v1/favorite/favoriteSpaceList`,{ headers: this.appGlobals.setHeaders()});
        // return this.http.get(`${this.apiUri}/api/v1/favorite/favoriteList`,{ headers: this.appGlobals.setHeaders()});
    }
    addRemoveFavouriteWorkSpace(id) {
        return this.http.post(`${this.apiUri}/api/v1/favorite/addToFavorite/${id}`,{},{ headers: this.appGlobals.setHeaders()});
    }
}
