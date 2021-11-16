import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { RegisterUser } from '../models/RegisterUser';
import { RegisteredUser } from '../registered-user';
import { Profile } from '../models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css'],
})
export class UserRegistrationComponent implements OnInit {
  institutions: Array<any> = [];
  private sub: Subscription = new Subscription();
  private subRegister: Subscription = new Subscription();
  private subProfile: Subscription = new Subscription();
  private subNewUser: Subscription = new Subscription();
  public _token: any;

  public registeredUser: RegisteredUser;
  public profile: Profile;

  public warning;
  public success = false;
  public success2 = false;
  public loading = false;
  public password2;

  selectedValue = null;

  constructor(private auth: AuthService, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.registeredUser = {
      email: '',
      password: '',
      role_id: 2,
      profile_id: 1,
      institution_id: 0,
    };
    this.profile = {
      profile_name: '', 
      age: new Date().getFullYear(),
      img: '',
      biography: '',
      user_id: 0, 
      tags: []
    };

    // Initialize subscription for institutions
    this.sub = this.auth.getInstitutions().subscribe((data) => {
      console.log('DATA INSTITUTE: ', data.rows);
      this.institutions = data.rows;
    });
  }

  onSubmit(f: NgForm): void {
    if (
      this.registeredUser.email != '' &&
      this.profile.profile_name != '' &&
      this.profile.age > 1900 &&
      this.registeredUser.password == this.password2
    ) {
      this.loading = true;

      // Open subscription to register the user:
      this.subRegister = this.auth.register(this.registeredUser).subscribe(
        (success) => {
          this.success = true;
          this.warning = null;
          this.loading = false;
          localStorage.setItem('access-token', success.token);
          this._token = this.auth.readToken();

          // Open subscription to create profile for user:
          this.profile.user_id = this._token.userId;
          console.log("reading the ID over HEREEEE -> " + this.profile.user_id);
          this.profile.age = new Date().getFullYear() - this.profile.age;

          this.subProfile = this.auth.profile(this.profile).subscribe(
            (success) => {
              console.log("We entered the success call of the auth profile");
              this.success2 = true;
              this.warning = null;
              this.loading = false;

              this.router.navigate(['/home']);
            },
            (err) => {
              console.log("we did not succeed");
              console.log(err);
              this.success2 = false;
              this.warning = err.error.message;
              this.loading = false;
            }
          );
        },
        (err) => {
          console.log(err);
          this.success = false;
          this.warning = err.error.message;
          this.loading = false;
        }
      );
    } else {
      this.success = false;
      this.success2 = false;
      this.warning = 'Please Check your password';
      this.loading = false;
    }
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
    this.subRegister?.unsubscribe();
    this.subProfile?.unsubscribe();
  }
}
