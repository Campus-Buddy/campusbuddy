import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

import { User, Profile } from '../models/User';
import { RegisterUser } from '../models/RegisterUser';
import { RegisteredUser } from '../registered-user';
import { Comment } from '../models/comment';


const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  //environment.userAPIBase
  public getToken(): string {
    return localStorage.getItem('access_token')!; // making sure that the return is a STR and not null
  }

  public readToken(): any {
    const token = localStorage.getItem('access_token');
    return helper.decodeToken(token?.toString());
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
    console.log(
      this.http.post<any>(`${environment.userAPIBase}/api/v1/users/login`, user)
    );
    return this.http.post<any>(
      `${environment.userAPIBase}/api/v1/users/login`,
      user
    );
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  getAllProfiles() {
    return this.http.get<any>(`${environment.userAPIBase}/api/profiles`);
  }

  getProfile(id: any): Observable<any> {
    const headers = new HttpHeaders().set(
      'x-access-token',
      this.getToken().toString()
    );
    return this.http.get<Profile>(
      `${environment.userAPIBase}/api/profiles/${id}`,
      { headers: headers }
    );
  }

  getTags(): Observable<any> {
    return this.http.get<any>(`${environment.userAPIBase}/api/tags`);
  }

  getTagById(id: any): Observable<any> {
    return this.http.get<any>(`${environment.userAPIBase}/api/tags/${id}`);
  }

  getInstitutions(): Observable<any> {
    return this.http.get<any>(`${environment.userAPIBase}/api/institutions`);
  }

  register(registerUser: RegisteredUser): Observable<any> {
    return this.http.post<any>(
      `${environment.userAPIBase}/api/v1/users`,
      registerUser
    );
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

  getComment(): Observable<any>{
    const headers = new HttpHeaders().set(
      'x-access-token',
      this.getToken().toString()
    );
    return this.http.get<any>(
      `${environment.userAPIBase}/api/comments`,
      { headers: headers }
    );
  }

  getCommentbyId(id: any): Observable<any>{
    const headers = new HttpHeaders().set(
      'x-access-token',
      this.getToken().toString()
    );
    return this.http.get<any>(
      `${environment.userAPIBase}/api/comments/${id}`,
      { headers: headers }
    );
  }
  
  updateComment(comment: Comment): Observable<any>{
    const headers = new HttpHeaders().set(
      'x-access-token',
      this.getToken().toString()
    );
    return this.http.put<any>(
      `${environment.userAPIBase}/api/comments/${comment.comment_id}`, comment,
      { headers: headers }
    )
  }

  deleteComment(id:any): Observable<any>{
    const headers = new HttpHeaders().set(
      'x-access-token',
      this.getToken().toString()
    );
    return this.http.delete<any>(
      `${environment.userAPIBase}/api/comments/${id}`,
      { headers: headers }
    );
  }

  newComment(comment: any): Observable<any>{
    return this.http.post<any>(
      `${environment.userAPIBase}/api/comments`,
      comment
    );
  }
}
