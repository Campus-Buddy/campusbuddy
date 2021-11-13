import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

import { User, Profile } from '../models/User';
import { RegisterUser } from '../models/RegisterUser';
import { RegisteredUser } from '../registered-user';
import { UserProfile } from '../user-profile';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  // Grabs the current token and sets it into the header for the API Requests
  private headers = new HttpHeaders().set('x-access-token', this.getToken()?.toString());

  //Returns the token
  public getToken(): string {
    return localStorage.getItem('access_token')!;
  }

  // Reads the token to get the various key/pairs from the object
  public readToken(): any {
    const token = localStorage.getItem('access_token');
    return helper.decodeToken(token?.toString());
  }

  // Checks that the token exists
  isAuthenticated(): boolean {
    const token = this.getToken();

    if (token) {
      console.log('token exists');
      return true;
    } else {
      console.log('no token');
      return false;
    }
  }

  // Sends a request to the API to authenticate the user, and receives back a token
  login(user: User): Observable<any> {
    return this.http.post<any>(`${environment.userAPIBase}api/v1/users/login`, user);
  }

  // Destroys the token inside the localstorate
  logout() {
    localStorage.removeItem('access_token');
  }

  // Register a user with the valid details.
  register(registerUser: RegisteredUser): Observable<any> {
    return this.http.post<any>(`${environment.userAPIBase}api/v1/users`, registerUser);
  }

  // API Requests for user profiles:
  getAllProfiles() {
    return this.http.get<any>(`${environment.userAPIBase}api/profiles`, { headers: this.headers });
  }

  getProfile(id: any): Observable<any> {
    return this.http.get<Profile>(`${environment.userAPIBase}api/profiles/${id}`, { headers: this.headers });
  }

  updateProfile(newInformation: UserProfile): Observable<any> {
    return this.http.put<Profile>(`${environment.userAPIBase}api/profiles/${newInformation.user_id}`, newInformation, {
      headers: this.headers,
    });
  }

  // API Requests for user tags
  getTags(): Observable<any> {
    return this.http.get<any>(`${environment.userAPIBase}api/tags`, { headers: this.headers });
  }

  getTagById(id: any): Observable<any> {
    return this.http.get<any>(`${environment.userAPIBase}api/tags/${id}`, { headers: this.headers });
  }

  // Gets institutions list for registration - no auth required.
  getInstitutions(): Observable<any> {
    return this.http.get<any>(`${environment.userAPIBase}api/institutions`);
  }

  // API Requests for Posts
  createPost(post: any): Observable<any> {
    return this.http.post<any>(`${environment.userAPIBase}api/posts`, post, { headers: this.headers });
  }

  updatePost(post: any): Observable<any> {
    return this.http.put<any>(`${environment.userAPIBase}api/posts/${post.post_id}`, post, { headers: this.headers });
  }

  getAllPosts() {
    const headers = new HttpHeaders().set('x-access-token', this.getToken().toString());
    return this.http.get<any>(`${environment.userAPIBase}api/posts`, {
      headers: headers,
    });
  }

  getPost(id: any): Observable<any> {
    const headers = new HttpHeaders().set('x-access-token', this.getToken().toString());
    return this.http.get<any>(`${environment.userAPIBase}api/posts/${id}`, {
      headers: headers,
    });
  }

  getPostCategories(): Observable<any> {
    return this.http.get<any>(`${environment.userAPIBase}api/categories`, { headers: this.headers });
  }

  getPostCategory(id: any): Observable<any> {
    return this.http.get<any>(`${environment.userAPIBase}api/categories/${id}`, { headers: this.headers });
  }

  createPost(post: any): Observable<any> {
    return this.http.post<any>(
      `${environment.userAPIBase}/api/posts`,
      post
    );
  }
  updatePost(id: any, post:any): Observable<any>{
    return this.http.put<any>(
      `${environment.userAPIBase}/api/posts/${id}`,post
    );
  }

  getPost(id:any): Observable<any>{
    const headers = new HttpHeaders().set(
      'x-access-token',
      this.getToken().toString()
    );
    return this.http.get<any>(
      `${environment.userAPIBase}/api/posts/${id}`,
      { headers: headers }
    );
  }
}
