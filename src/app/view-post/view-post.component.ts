import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../post';
import { AuthService } from '../services/auth.service';
import { Comment } from '../comment';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  public postDetails;
  public postDate;
  public postDay;
  public dayString;
  public userInfo;
  public userId;
  public commentList: any = [ ];
  public postComment: any = [ ];
  public commentedUser;
  public newComment: Comment = {
    user_id: 0,
    post_id: 0,
    comment: ""
  }

  public warning;
  public success = false;
 
  public id;
  private _token: any;
  private sub;
  private getPost;
  private getUser;
  private getComment;
  private getCommentedUser;
  private submitNewComment;
  private commentUserId;
  

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  getDay(day: any){
    switch(day){
      case 1:{
        this.dayString = "Monday";
        break;
      }
      case 2:{
        this.dayString = "Tuesday";
        break;
      }
      case 3:{
        this.dayString = "Wednesday";
        break;
      }
      case 4:{
        this.dayString = "Thursday";
        break;
      }
      case 5:{
        this.dayString = "Friday";
        break;
      }
      case 6:{
        this.dayString = "Saturday";
        break;
      }
      case 7:{
        this.dayString = "Sunday";
        break;
      }
      
    }
  }

  ngOnInit(): void {

    this._token = this.auth.readToken();
    this._token.userId = this.commentUserId;
    console.log('user', this._token.userId);

    this.sub = this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.getPost = this.auth.getPost(this.id).subscribe(data =>{
      this.postDetails = data;         
      this.postDate = new Date(this.postDetails.date_created).toLocaleDateString("en-us");
      this.postDay = new Date(this.postDetails.date_created).getDay();
      this.getDay(this.postDay);
      this.userId = this.postDetails.user_id;
      console.log(this.userId)
      this.getUser = this.auth.getProfile(this.userId).subscribe((data) =>{
        this.userInfo = data;
        console.log(this.postDetails)       
      })

      this.getComment = this.auth.getComment().subscribe(data =>{
        this.commentList = data.rows;
//        console.log(this.commentList);
        this.commentList.forEach(element => {
          if(element.post_id == this.postDetails.post_id){
            this.postComment.push(element);
         //   console.log(this.postComment)
            this.getCommentedUser = this.auth.getProfile(element.user_id).subscribe(data =>{
              data.profile_name = this.commentedUser;
              console.log(data)
            })
          }
 //         console.log(this.postComment);
        });
      })
    })

    

    
    
  }

  onSubmit(f: NgForm): void {
    

    this.newComment.user_id = this.commentUserId;
    this.newComment.post_id = this.postDetails.post_id;
    console.log(this.newComment);

    // this.submitNewComment = this.auth.newComment(this.newComment).subscribe(
    //   (success) => {
    //     this.success = true;
    //     this.warning = null;
    //   },
    //   (err) => {
    //     console.log(err);
    //     this.success = false;
    //     this.warning = err.error.message;
    //   }
    // );
  }

}
