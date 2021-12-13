import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { User } from '../models/User';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public user: User = {
    user_id: 0,
    institution_id: 0,
    profile_id: 0,
    role_id: 0,
    email: '',
    password: '',
  };
  public warning: string = '';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.user = new User();
  }

  onSubmit(f: NgForm): void {
    if (this.user.email != '' && this.user.password != '') {
      this.auth
        .login(this.user)
        .pipe(first())
        .subscribe(
          (success) => {
            this.warning = '';
            this.router.navigate(['/home']);
          },
          (err) => {
            this.warning = err.error.message;
          }
        );
    }
  }
}
