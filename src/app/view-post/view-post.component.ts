import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../post';
import { AuthService } from '../services/auth.service';
import { Comment } from '../models/comment';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  public commentedUser: any = [ ];
  public commentedUserImage: any = [ ];
  public newComment: Comment = {
    user_id: 0,
    post_id: 0,
    comment: "",
    comment_id: 0
  }

  public warning;
  public success = false;
  public authorisation: any = [ ];
  public editClicked = false;
  public editComment; // storing comment for editing
 
  public id;
  private _token: any;
  private sub;
  private getPost;
  private getUser;
  private getComment;
  private getCommentedUser;
  private submitNewComment;
  private commentUserId;
  private editableComment;
  private deleteComment;
  private getEdit;
  

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
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
        var i =0;
        this.commentList.forEach(element => {
          if(element.post_id == this.postDetails.post_id){
            this.postComment.push(element);
            this._token = this.auth.readToken();
            if(element.user_id == this._token.userId){
              this.authorisation[element.user_id] = true;
         //     console.log(this.authorisation[element.user_id])
            }
         //   console.log(this.postComment)
          }
          this.getCommentedUser = this.auth.getProfile(element.user_id).subscribe(data =>{
            this.commentedUser[element.user_id] = data.profile_name;
            this.commentedUserImage[element.user_id] = data.img;
          })
          //console.log(this.postComment);
        });
      })

      
    })

    

    
    
  }

  onSubmit(f): void {
    if(f == "create"){
      this._token = this.auth.readToken();
    this.commentedUser = this._token.user_id;
    console.log('user', this._token);
    this.newComment.user_id = this._token.userId;
    this.newComment.post_id = this.postDetails.post_id;
   // console.log(this.newComment);

     this.submitNewComment = this.auth.newComment(this.newComment).subscribe(
       (success) => {
         this.success = true;
         this.warning = null;
         location.reload();
       },
       (err) => {
         console.log(err);
         this.success = false;
         this.warning = err.error.message;
         
       }
     );
    }
    if(f == "edit"){
      console.log(this.editComment)
      this.getEdit = this.auth.updateComment(this.editComment).subscribe(
        (success) => {
          this.openDialogue('Comment Updated!');
          location.reload();
        },
        (err) => {
          console.log(err);
          this.openDialogue('There was an error.' + err);
        }
      );
    }

    
  }

  openDialogue(message: string) {
    this._snackBar.open(message, 'x');
  }

  enableEditor(id: any){
    this.editClicked = true;
    
    this.editableComment = this.auth.getCommentbyId(id).subscribe(data =>{
      this.editComment = data;
      console.log("clicked", this.editComment)
    })
  }

  enableDelete(id: any){
    this.deleteComment = this.auth.deleteComment(id).subscribe();
  }

}
