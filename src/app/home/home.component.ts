import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UserProfile } from 'src/app/user-profile';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public username: any;
  public age: any;
  public _token: any;
  private sub: Subscription = new Subscription();
  private sub2: Subscription = new Subscription();
  public userProfile: UserProfile;

  constructor(private auth: AuthService, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this._token = this.auth.readToken();
    this.sub2 = this.auth.getProfile(this._token.userId).subscribe((data) => {
      this.userProfile = data;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
  }
}
