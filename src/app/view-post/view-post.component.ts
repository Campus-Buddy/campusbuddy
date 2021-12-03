import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Comment } from '../models/comment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeletePostComponent } from '../components/delete-post/delete-post.component';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css'],
})
export class ViewPostComponent implements OnInit {
  public postDetails;
  public postDay;
  public userInfo;
  public userId;
  public commentList: Array<any> = [];
  public newComment: Comment = {
    user_id: 0,
    post_id: 0,
    comment: '',
    comment_id: 0,
  };

  public nComment;
  public warning;
  public success = false;
  public postEditAuthorisation: boolean = false;
  public editClicked = false;
  public editComment; // storing comment for editing

  public id;
  private _token: any;

  // Subscriptions
  private sub: Subscription = new Subscription();
  private getPost: Subscription = new Subscription();
  private getUser: Subscription = new Subscription();
  private getComment: Subscription = new Subscription();
  private getCommentedUser: Subscription = new Subscription();
  private submitNewComment: Subscription = new Subscription();
  private deleteCommentSubscription: Subscription = new Subscription();
  private getEdit: Subscription = new Subscription();

  readMode = true;
  @ViewChild('editCommentValue') editCommentValue: ElementRef;

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    private modalService: NgbModal
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    // Listen to the route parametre for the post id
    this.sub = this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    // Get the post details
    this.getPost = this.auth.getPost(this.id).subscribe((data) => {
      // Gets all post details
      this.postDetails = data;

      this.postDay = new Date(this.postDetails.date_created).toUTCString();

      this.userId = this.postDetails.user_id;

      this._token = this.auth.readToken();

      // Sets the authorization for if a user can edit a post.
      this.postEditAuthorisation = this.postDetails.user_id == this._token.userId;

      // Get user details for each post
      this.getUser = this.auth.getProfile(this.userId).subscribe((data) => {
        this.userInfo = data;
      });

      // Get all comments for the post
      this.getComment = this.auth.getCommentByPostId(this.postDetails.post_id).subscribe((data) => {
        this.commentList = data.rows;

        // Sorts the comments by their dates.
        this.commentList.sort((a, b) => {
          return a.date.localeCompare(b.date);
        });

        // Get user name and user image for the comment section
        for (let comment of this.commentList) {
          this.getCommentedUser = this.auth.getProfile(comment.user_id).subscribe((profile) => {
            comment.profile_name = profile.profile_name;
            comment.image = profile.img;
          });
        }
      });
    });
  }

  // will get the index from the list by the use of comment_id
  getCommentIndex(id: number) {
    return this.commentList.findIndex((comment) => comment.comment_id == id);
  }

  // Takes the comment from the input field using viewchild, and then sends the request to the API
  updateComment(id: any) {
    const commentIndex = this.getCommentIndex(id);
    this.commentList[commentIndex].comment = this.editCommentValue.nativeElement.value;

    this.getEdit = this.auth.updateComment(this.commentList[commentIndex]).subscribe(
      (success) => {
        this.openDialogue('Comment Updated!');
        this.commentList[commentIndex].editMode = false;
      },
      (err) => {
        this.openDialogue('There was an error.' + err);
      }
    );
  }

  // Adds new comment to the page and reloads
  onSubmit(): void {
    this.newComment.user_id = this._token.userId;
    this.newComment.post_id = this.id;

    this.submitNewComment = this.auth.createComment(this.newComment).subscribe(
      (success) => {
        this.success = true;
        this.warning = null;
        // Need to reload and get back to place where we were
        location.reload();
      },
      (err) => {
        this.success = false;
        this.warning = err.error.message;
      }
    );
  }

  openDialogue(message: string) {
    this._snackBar.open(message, 'x');
  }

  // Takes a value, and returns boolean if the user is authorized
  showEditDelete(id: number): boolean {
    return this._token.userId == id;
  }

  enableEditor(id: any) {
    // Mark all comments as not edit mode
    this.commentList.forEach((comment) => (comment.editMode = false));

    // mark the one id as editmode to show input field
    const editComment = this.getCommentIndex(id);
    this.commentList[editComment].editMode = true;
  }

  confirmDeletePost() {
    const mValue = this.modalService.open(DeletePostComponent);

    mValue.dismissed.subscribe((data) => {
      if (data) {
        this.auth.deletePost(this.id).subscribe();
        this.router.navigate(['/all-posts']);
      }
    });
  }

  deleteComment(id: any) {
    this.deleteCommentSubscription = this.auth.deleteComment(id).subscribe();
    this.commentList.splice(this.getCommentIndex(id));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.getPost.unsubscribe();
    this.getUser.unsubscribe();
    this.getComment.unsubscribe();
    this.getCommentedUser.unsubscribe();
    this.submitNewComment.unsubscribe();
    this.deleteCommentSubscription.unsubscribe();
    this.getEdit.unsubscribe();
  }
}
