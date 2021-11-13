import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LogoutModalComponent } from './components/logout-modal/logout-modal.component';
import { FormsModule } from '@angular/forms';
import { NavigationStart, Router, Event } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public title = 'campus-buddy';
  public _token: any;
  public username: any;
  private sub: Subscription = new Subscription();

  constructor(private auth: AuthService, private router: Router, private modalService: NgbModal) {
    // if(auth.getToken()){
    //   router.navigate(['home']);
    // }
  }

  displayLogoutModal() {
    this.modalService.open(LogoutModalComponent);
  }

  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this._token = this.auth.readToken();
        // get the user information and store it
        this.sub = this.auth.getProfile(this._token.userId).subscribe((data) => {
          console.log('data', data.toString());
        //  console.log("data", data.toString())
          this.username = data.profile_name;
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
