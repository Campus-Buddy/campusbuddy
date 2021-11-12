import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';


import { Post } from '../post';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {


public newPost: Post={
  category_name: "",
  title: "",
  details: "",
  picture: undefined!,
  user_id: 0,
  category_id: 0
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

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
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

    this.sub = this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

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
        }else{
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

}
