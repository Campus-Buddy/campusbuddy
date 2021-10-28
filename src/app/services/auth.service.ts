import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

import { User } from '../models/User';
import { RegisterUser } from '../models/RegisterUser';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  //environment.userAPIBase
  public getToken(): string {  
    return JSON.parse(localStorage.getItem('access_token')!); // making sure that the return is a STR and not null
  }

  public readToken(): any {
    const token = JSON.parse(localStorage.getItem('access_token')!);
    return helper.decodeToken(token);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');

    if (token) {
      console.log('token exists');
      return true;
    } else {
      console.log('no token');
      return false;
    }
  }

  login(user: User): Observable<any> {
    console.log(this.http.post<any>(`${environment.userAPIBase}/api/v1/users/login`, user ));
    return this.http.post<any>(`${environment.userAPIBase}/api/v1/users/login`, user);
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  /*
  register(registerUser: RegisterUser): Observable<any> {
    return this.http.post<any>(`${environment.userAPIBase}/register`, registerUser);
  }
  */
}
