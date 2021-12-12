import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

import { User, Profile } from '../models/User';
import { RegisterUser } from '../models/RegisterUser';
import { RegisteredUser } from '../registered-user';
import { UserProfile } from '../user-profile';
import { Comment } from '../models/comment';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userId;
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private router: Router) {}

  // Grabs the current token and sets it into the header for the API Requests
  private headers = new HttpHeaders().set('x-access-token', this.getToken()?.toString());

  //Returns the token
  public getToken(): string {
    const token = localStorage.getItem('access_token') || '';
    return token;
  }

  // Reads the token to get the various key/pairs from the object
  public readToken(): any {
    const token = localStorage.getItem('access_token');
    return helper.decodeToken(token?.toString());
  }

  public getuserId(): number {
    return this.userId;
  }

  // Checks that the token exists
  isAuthenticated(): boolean {
    const token = this.getToken();

    if (!this.jwtHelper.isTokenExpired(token)) {
      return true;
    } else {
      return false;
    }
  }

  // checks to see if the user is allowed to do an action
  isAuthorized(id: any): boolean {
    const token = this.readToken();

    if (token.userId == id) {
      return true;
    }
    return false;
  }

  // Route used to verify your email in the DB
  verify(token: string): Observable<any> {
    return this.http
      .post<any>(
        `${environment.userAPIBase}api/v1/users/authenticate`,
        { verifyToken: token },
        { headers: this.headers }
      )
      .pipe(
        catchError((error) => {
          this.router.navigate(['/verify']);
          return throwError(error);
        })
      );
  }

  isVerified(): Observable<any> {
    const id = this.readToken().userId;

    return this.http.get<any>(`${environment.userAPIBase}api/v1/users/isVerified/${id}`, { headers: this.headers });
  }

  getEmailAddress(): Observable<any> {
    const id = this.readToken().userId;
    return this.http.get<any>(`${environment.userAPIBase}api/v1/users/email/${id}`, { headers: this.headers });
  }

  resendVerificationCode(email: string): Observable<any> {
    const id = this.readToken().userId;
    return this.http.post<any>(`${environment.userAPIBase}api/v1/users/authenticate/resend/${id}`, { email: email });
  }

  // Sends a request to the API to authenticate the user, and receives back a token
  login(user: User): Observable<any> {
    return this.http.post<any>(`${environment.userAPIBase}api/v1/users/login`, user).pipe(
      map((result) => {
        this.userId = result.token.userId;
        localStorage.setItem('access_token', result.token);
        this.headers = new HttpHeaders().set('x-access-token', this.getToken()?.toString());
        return true;
      })
    );
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
    // will redirect if the user profile does not exist
    return this.http.get<Profile>(`${environment.userAPIBase}api/profiles/${id}`, { headers: this.headers }).pipe(
      catchError((error) => {
        this.router.navigate(['/not-found']);
        return throwError(error);
      })
    );
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

  deletePost(id: any): Observable<any> {
    return this.http.delete<any>(`${environment.userAPIBase}api/posts/${id}`, { headers: this.headers });
  }

  getAllPosts() {
    return this.http.get<any>(`${environment.userAPIBase}api/posts`, {
      headers: this.headers,
    });
  }

  getPost(id: any): Observable<any> {
    // Will redirect if the post does not exist
    return this.http
      .get<any>(`${environment.userAPIBase}api/posts/${id}`, {
        headers: this.headers,
      })
      .pipe(
        catchError((error) => {
          this.router.navigate(['/not-found']);
          return throwError(error);
        })
      );
  }

  getPostCategories(): Observable<any> {
    return this.http.get<any>(`${environment.userAPIBase}api/categories`, { headers: this.headers });
  }

  getPostCategory(id: any): Observable<any> {
    return this.http.get<any>(`${environment.userAPIBase}api/categories/${id}`, { headers: this.headers });
  }

  // API request for Comment
  getComments(): Observable<any> {
    return this.http.get<any>(`${environment.userAPIBase}api/comments`, { headers: this.headers }).pipe();
  }

  getCommentbyId(id: any): Observable<any> {
    return this.http.get<any>(`${environment.userAPIBase}api/comments/${id}`, { headers: this.headers });
  }

  updateComment(comment: Comment): Observable<any> {
    return this.http.put<any>(`${environment.userAPIBase}api/comments/${comment.comment_id}`, comment, {
      headers: this.headers,
    });
  }

  getCommentByPostId(postId: number): Observable<any> {
    return this.http.get<any>(`${environment.userAPIBase}api/comments/post/${postId}`);
  }

  deleteComment(id: any): Observable<any> {
    return this.http.delete<any>(`${environment.userAPIBase}api/comments/${id}`, { headers: this.headers });
  }

  createComment(comment: any): Observable<any> {
    return this.http.post<any>(`${environment.userAPIBase}api/comments`, comment);
  }

  profile(profile: Profile): Observable<any> {
    return this.http.post<any>(`${environment.userAPIBase}/api/profiles`, profile);
  }
}
