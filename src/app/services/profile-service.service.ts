import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProfileServiceService {

  constructor(private http: HttpClient) {

  }
  getProfileInfo(userName) {
    return this.http.get('https://api.github.com/users/' + userName + '?access_token=beba3c150021bfb49769385927dfa59fac2cdf04');
  }
}
