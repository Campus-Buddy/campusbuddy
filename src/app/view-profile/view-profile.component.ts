import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

import { RegisteredUser } from './../registered-user';
import { ActivatedRoute, Router } from '@angular/router';

export class Profile {
  profile_id: number;
  profile_name: string;
  age: number;
  image: string;
  biography: string;
}

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css'],
})
export class ViewProfileComponent implements OnInit {
  profileList: any;
  private sub: Subscription = new Subscription();
  private sub2: Subscription = new Subscription();
  private sub3: Subscription = new Subscription();

  public currentProfile;
  private id: any;
  public tagList: Array<any>;

  constructor(private auth: AuthService, private route: ActivatedRoute, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.tagList = [];
    this.sub = this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.sub2 = this.auth.getProfile(this.id).subscribe((data) => {
      this.currentProfile = data;
      for (let tag of this.currentProfile.tags) {
        this.sub3 = this.auth.getTagById(tag).subscribe((tagfound) => {
          this.tagList.push(tagfound.title);
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
  }
}
