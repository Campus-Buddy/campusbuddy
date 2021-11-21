import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { any } from 'sequelize/types/lib/operators';
import { AuthService } from '../services/auth.service';
import { NavigationStart, Router, Event } from '@angular/router';

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

  constructor(private auth: AuthService, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this._token = this.auth.readToken();
    this.sub2 = this.auth.getProfile(this._token.userId).subscribe((data) => {
      this.username = data.profile_name;
      this.age = data.age;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
