import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-find-a-buddy',
  templateUrl: './find-a-buddy.component.html',
  styleUrls: ['./find-a-buddy.component.css'],
})
export class FindABuddyComponent implements OnInit {
  users: Array<any> = [];
  private sub: Subscription = new Subscription();
  private sub2: Subscription = new Subscription();
  private sub3: Subscription = new Subscription();
  public tagList: Array<any>;
  private id: any;

  constructor(private auth: AuthService, private route: ActivatedRoute, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.sub2 = this.auth.getAllProfiles().subscribe((data) => {
      this.users = data.rows;
      let newUsers = <any>[];
      if (this.id) {
        for (let user of this.users) {
          if (user.tags) {
            for (let tag of user.tags) {
              if (tag == this.id) {
                newUsers.push(user);
              }
            }
          }
        }
        this.users = newUsers;
      }
    });

    this.sub = this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    // Initialize subscription for tags
    this.sub3 = this.auth.getTags().subscribe((data) => {
      this.tagList = data.rows;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe();
  }
}
