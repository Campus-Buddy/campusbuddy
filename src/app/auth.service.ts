import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';

import { RegisteredUser } from './registered-user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  getInstitutions(): Observable<any> {
    return this.http.get<any>(
      `${environment.userAPIBase}/api/institutions`
    );
  }

  register(registerUser: RegisteredUser): Observable<any> {
    return this.http.post<any>(
      `${environment.userAPIBase}/api/v1/users`,
      registerUser
    );
  }
}
