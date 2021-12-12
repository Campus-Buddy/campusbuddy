import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css'],
})
export class AllPostsComponent implements OnInit {
  posts: Array<any> = [];
  private sub: Subscription = new Subscription();
  private sub2: Subscription = new Subscription();
  private sub3: Subscription = new Subscription();
  public categoryList: Array<any>;
  private category: any;
  private _token: any;
  usernames: Array<any> = [];

  constructor(private auth: AuthService, private route: ActivatedRoute, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this._token = this.auth.readToken();

    this.sub = this.auth.getAllPosts().subscribe((data) => {
      this.posts = data.rows;
      let newPosts = <any>[];
      if (this.category) {
        for (let post of this.posts) {
          if (post.category_name === this.category) {
            newPosts.push(post);
          }
          if (this.category === 'mine') {
            if (post.user_id == this._token.userId) {
              newPosts.push(post);
            }
          }
        }
        this.posts = newPosts;
      }
      this.posts = this.posts.sort((val1, val2) => {
        return <any>new Date(val2.date_created) - <any>new Date(val1.date_created);
      });
    });

    this.sub2 = this.route.params.subscribe((params) => {
      this.category = params['category'];
    });

    this.sub3 = this.auth.getPostCategories().subscribe((data) => {
      this.categoryList = data.rows;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe();
  }
}
