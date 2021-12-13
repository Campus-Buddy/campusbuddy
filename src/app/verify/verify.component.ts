import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first, subscribeOn } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css'],
})
export class VerifyComponent implements OnInit {
  private sub: Subscription = new Subscription();

  private verifySubscription: Subscription = new Subscription();
  private getEmailSubscription: Subscription = new Subscription();
  private resendEmailSubscription: Subscription = new Subscription();

  private token: string;
  public email;
  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params) => {
      this.token = params['id'];
    });

    // If theres a token provided, verify it
    if (!!this.token) {
      this.verifySubscription = this.auth.verify(this.token).subscribe(
        (data) => {
          console.log('verify', data);
          this.router.navigate(['/profile']).then(() => {
            window.location.reload();
          });
        },
        (err) => {
          console.log('could not verify');
        }
      );
    } else {
      // grab subscription for email to fill in
      this.verifySubscription = this.auth.isVerified().subscribe((data) => {
        if (data.email_token == 'true') {
          this.router.navigate(['/profile']).then(() => {
            window.location.reload();
          });
        }
      });
      this.getEmailSubscription = this.auth.getEmailAddress().subscribe((data) => {
        this.email = data.email;
        console.log('user email', this.email);
      });
    }
  }

  onSubmit(f: NgForm): void {
    if (this.email !== '') {
      console.log('email123', this.email);
      this.resendEmailSubscription = this.auth.resendVerificationCode(this.email).subscribe(() => {
        this._snackBar.open('Email was sent!', 'x');
      });
    }
  }
}
