import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserProfile } from 'src/app/user-profile';
import { FormControl, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  public userProfile: UserProfile;

  public warning: string = '';
  url: any = '../../assets/landingpage.jpg'; // placeholder for images not existing

  // success: boolean = true;
  private sub: Subscription = new Subscription();
  private sub2: Subscription = new Subscription();
  private sub3: Subscription = new Subscription();
  private sub4: Subscription = new Subscription();

  public tags: Array<any> = []; // used to display the multidropdown list
  public tagList: Array<any> = [];
  public tagSelection: FormControl = new FormControl();
  private _token;

  @ViewChild('fileUpload') fileUpload: ElementRef;
  constructor(private auth: AuthService, private _snackBar: MatSnackBar) {
    // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    // Initialize subscription for tags
    this.sub = this.auth.getTags().subscribe((data) => {
      this.tagList = data.rows;
    });

    // Subscribe to get current information from this user.
    this._token = this.auth.readToken();
    // Read the information for the profile:
    this.sub2 = this.auth.getProfile(this._token.userId).subscribe((data) => {
      console.log('user: ', data);
      this.userProfile = data;
      // For each tag of the user profile, get the name.
      for (let tag of this.userProfile.tags) {
        this.sub3 = this.auth.getTagById(tag).subscribe((tagfound) => {
          this.tags.push(tagfound.title);
        });
      }
    });
  }

  // This function is called when you hit save - it makes out the API call to save.
  saveNewValues(): void {
    this.sub4 = this.auth.updateProfile(this.userProfile).subscribe(
      (success) => {
        this.openDialogue('Changes were saved!');
      },
      (err) => {
        console.log(err);
        this.openDialogue('There was an error.');
      }
    );
  }

  openDialogue(message: string) {
    this._snackBar.open(message, 'x');
  }

  // Grabs the file inputted and returns the binary data.
  selectFile(event: any) {
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.warning = '';
      this.userProfile.img = reader.result?.toString() || '../../assets/default_avatar.png';
    };
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe();
    this.sub4.unsubscribe();
  }
}
