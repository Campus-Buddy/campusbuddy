import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { RegisterUser } from '../models/RegisterUser';
import { RegisteredUser } from '../registered-user';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css'],
})
export class UserRegistrationComponent implements OnInit {
  institutions: Array<any> = [];
  private sub: Subscription = new Subscription();
  private subRegister: Subscription = new Subscription();

  public registeredUser: RegisteredUser;

  // private r =  {
  //        "role_id": 2,
  //        "institution_id": 1,
  //        "profile_id": 1,
  //        "password": "123123123",
  //        "email": "j.nalbandian@live.ca"
  //    }

  public warning;
  public success = false;
  public loading = false;
  public password2;

  selectedValue = null;

  constructor(private auth: AuthService, private http: HttpClient) {}

  ngOnInit(): void {
    this.registeredUser = {
      email: '',
      password: '',
      role_id: 2,
      profile_id: 1,
      institution_id: 0
    };

    // Initialize subscription for institutions
    this.sub = this.auth.getInstitutions().subscribe((data) => {
      console.log("DATA INSTITUTE: ", data.rows)
      this.institutions = data.rows;
    });
  }

  

  onSubmit(f: NgForm): void {
    if (
      this.registeredUser.email != '' &&
      this.registeredUser.password == this.password2
    ) {
      this.loading = true;

      // Open subscription to register the user:
      this.subRegister = this.auth.register(this.registeredUser).subscribe(
        (success) => {
          this.success = true;
          this.warning = null;
          this.loading = false;
        },
        (err) => {
          console.log(err)
          this.success = false;
          this.warning = err.error.message;
          this.loading = false;
        });
      // this.RegisterUser(this.registeredUser); do we need?
      console.log(this.registeredUser);
    } else {
      this.success = false;
      this.warning = 'Please Check your password';
      this.loading = false;
    }
  }


  ngOnDestroy() {
    this.sub?.unsubscribe();
    this.subRegister?.unsubscribe();
  }
}
