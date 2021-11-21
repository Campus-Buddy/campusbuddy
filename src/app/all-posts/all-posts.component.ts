import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit {
  posts: Array<any> = [];
  private sub: Subscription = new Subscription();
  private sub2: Subscription = new Subscription();
  private sub3: Subscription = new Subscription();
  public tagList: Array<any>;
  private id: any;

  constructor(private auth: AuthService, private route: ActivatedRoute, private router: Router) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.sub = this.auth.getAllPosts().subscribe((data) => {
      this.posts = data.rows;
      console.log(this.posts);
      // let newPosts = <any>[];
      // if (this.id) {
      //   for (let post of this.posts) {
      //     if (post.tags) {
      //       for (let tag of post.tags) {
      //         newPosts.push(post);
      //       }
      //     }
      //   }
      // }
      //this.posts = newPosts;
    });

    this.sub2 = this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    // GET POST CATEGORIES, not tags
    // this.sub3 = this.auth.getTags().subscribe((data) => {
    //   this.tagList = data.rows;
    // });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe();
  }
}
