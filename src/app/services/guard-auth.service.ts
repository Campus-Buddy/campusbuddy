import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class GuardAuthService implements CanActivate {
  private isVerifiedSubscription: Subscription = new Subscription();
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.auth.isAuthenticated()) {
      // logged in so return true
      // check if they are verified
      this.isVerifiedSubscription = this.auth.isVerified().subscribe((data) => {
        if (data.email_token !== 'true') {
          this.router.navigate(['/verify']);
        }
      });
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
