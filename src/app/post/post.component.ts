import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';


import { Post } from '../post';
import { ActivatedRoute, Router } from '@angular/router';
=======
import { AuthService } from '../services/auth.service';

import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
>>>>>>> master

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
<<<<<<< HEAD
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {


public newPost: Post={
  category_name: "",
  title: "",
  details: "",
  picture: undefined!,
  user_id: 0,
  category_id: 0,
  date_created: undefined!
}

  private sub;
  private sub2;
  private submitNewPost;
  private editPost;
  private _token;
  public id;
  private userId;
  

  public currentPost;
  public paramsCheck;
  public success = false;
  public warning;

  categories: Array<any> = [];
=======
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  public currentPost; // stores data from page or fills data from subscription is editing.
  private sub: Subscription = new Subscription(); //grab the params id
  private sub2: Subscription = new Subscription(); //grab post id if there is params id
  private sub3: Subscription = new Subscription(); //grab categories for post
  private submitPageSub: Subscription = new Subscription(); // submit post or put request
  private categoryName: Subscription = new Subscription(); // gets the category name before we push the data to API.
  public id; // stores id from params
  public categories: Array<any> = []; // stores categories from get request
  public warnings: Array<string> = [];
>>>>>>> master

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
<<<<<<< HEAD
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
   }

  categoryList: any[] = [
    {id: 1, text: "Buy/Sell"},
    {id: 3, text: "Lost/Found"},
    {id: 4, text: "Advice"},
    {id: 5, text: "Events"},
    {id: 6, text: "Other"}
  ];

   
  ngOnInit(): void {

=======
    private router: Router,
    private _snackbar: MatSnackBar
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  categoryList: Array<any> = [];

  ngOnInit(): void {
>>>>>>> master
    this.sub = this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

<<<<<<< HEAD
    this.sub2 = this.auth.getPost(this.id).subscribe(data =>{
      this.currentPost = data;
      console.log(this.currentPost);
    })
  }
  onSubmit(f: NgForm): void {
    

    if(this.newPost.category_id == 1){
      this.newPost.category_name = "Buy/Sell";
    }
    if(this.newPost.category_id == 3){
      this.newPost.category_name = "Lost/Found"
    }
    if(this.newPost.category_id == 4){
      this.newPost.category_name = "Advice"
    }
    if(this.newPost.category_id == 5){
      this.newPost.category_name = "Events"
    }
    if(this.newPost.category_id == 6){
      this.newPost.category_name = "Other"
    }

    this._token = this.auth.readToken();
        // get the user information and store it
        this.sub = this.auth.getProfile(this._token.userId).subscribe((data) => {
          console.log("data", data.toString())
          this.userId = data.user_id;
        })
        this.newPost.user_id = this.userId;
        console.log(this.newPost.user_id);

        if(this.id == null){
          this.submitNewPost = this.auth.createPost(this.newPost).subscribe(
            (success) =>{
            this.success = true;
          },
          (err) =>{
            console.log(err);
            this.success = false;
            this.warning = err.error.message;
          })
        }
        {
          this.editPost = this.auth.updatePost(this.id,this.newPost).subscribe(
            (success) =>{
              this.success = true;
            },
            (err) =>{
              this.success = false;
              this.warning = err.error.message;
              
            }
          )
        }
         
    
    
    console.log(this.newPost)
    



  }

=======
    if (this.id) {
      this.sub2 = this.auth.getPost(this.id).subscribe((data) => {
        this.currentPost = data;
        console.log(this.currentPost);
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
      this.categoryName = this.auth
        .getPostCategory(this.currentPost.category_id)
        .subscribe((category) => {
          this.currentPost.category_name = category.title;
          console.log('category name:', this.currentPost.category_name);
          this.id ? this.updatePost() : this.createNewPost();
        });
    }
  }

  // Attempts to create a post
  createNewPost(): void {
    this.submitPageSub = this.auth.createPost(this.currentPost).subscribe(
      (success) => {
        this.openDialogue('Changes were saved!');
      },
      (err) => {
        console.log(err);
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
        console.log(err);
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
      this.currentPost.picture =
        reader.result?.toString() || '../../assets/default_avatar.png';
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
>>>>>>> master
}
