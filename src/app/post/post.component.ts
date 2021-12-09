import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  public currentPost; // stores data from page or fills data from subscription is editing.
  private sub: Subscription = new Subscription(); //grab the params id
  private sub2: Subscription = new Subscription(); //grab post id if there is params id
  private sub3: Subscription = new Subscription(); //grab categories for post
  private sub4: Subscription = new Subscription(); //grab categories for post
  private submitPageSub: Subscription = new Subscription(); // submit post or put request
  private categoryName: Subscription = new Subscription(); // gets the category name before we push the data to API.
  public id; // stores id from params
  public categories: Array<any> = []; // stores categories from get request
  public warnings: Array<string> = [];
  private _token: any;

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackbar: MatSnackBar
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  categoryList: Array<any> = [];

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    this._token = this.auth.readToken();

    if (this.id) {
      this.sub2 = this.auth.getPost(this.id).subscribe((data) => {
        // CHECKS to see if user is authorized for this page, otherwise redirects to home.
        if (data.user_id != this._token.userId) {
          this.router.navigate(['/home']);
        }
        this.currentPost = data;
      });
    } else {
      this.currentPost = {
        category_name: '',
        title: '',
        details: '',
        picture: '../../assets/cover.png',
        user_id: this.auth.readToken().userId,
      };
    }

    this.sub3 = this.auth.getPostCategories().subscribe((data) => {
      this.categoryList = data.rows;
    });
  }

  // will determine if the click submit button is editing or creating a post
  submitData(): void {
    this.warnings = [];
    if (this.currentPost.details === '') {
      this.warnings.push('Please provide details.');
    }
    if (this.currentPost.title === '') {
      this.warnings.push('Please provide a post title.');
    }
    if (!this.currentPost.category_id) {
      this.warnings.push('Please select a category.');
    }
    if (this.warnings.length === 0) {
      this.categoryName = this.auth.getPostCategory(this.currentPost.category_id).subscribe((category) => {
        this.currentPost.category_name = category.title;
        this.id ? this.updatePost() : this.createNewPost();
      });
    }
  }

  // Attempts to create a post
  createNewPost(): void {
    this.submitPageSub = this.auth.createPost(this.currentPost).subscribe(
      (success) => {
        this.router.navigate(['/all-posts']).then(() => {
          this.openDialogue('Changes were saved!');
        });
      },
      (err) => {
        this.openDialogue('There was an error.');
      }
    );
  }

  // updates a post.
  updatePost(): void {
    this.submitPageSub = this.auth.updatePost(this.currentPost).subscribe(
      (success) => {
        this.openDialogue('Changes were saved!');
      },
      (err) => {
        this.openDialogue('There was an error.');
      }
    );
  }

  // Creates a little pop up to confirm your changes were saved.
  openDialogue(message: string) {
    this._snackbar.open(message, 'x');
  }

  // Takes file and reads into string for the database.
  selectFile(event: any) {
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.currentPost.picture = reader.result?.toString() || '../../assets/default_avatar.png';
    };
  }

  ngOnDestroy() {
    // destroy the subscriptions here.
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe();
    this.submitPageSub.unsubscribe();
    this.categoryName.unsubscribe();
  }
}
