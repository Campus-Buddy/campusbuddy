import { Component, OnInit } from '@angular/core';
import { UserProfile } from 'src/app/user-profile';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  public userProfile: UserProfile ={
    userName: '',
    userPic: undefined,
    age: 0,
    program: '',
    tag1: '',
    tag2: '',
    tag3: '',
    tag4: '',
    tag5: '',
    tag6: '',
    userBio: ''
  }
   editMode: boolean = false;
   defImg: boolean = true;
   tags: any[] = [{name:"Gym"}, {name:"Hiking"}, {name:"LoveFood"}, {name:"Dating"}, {name:"Dancing"}, {name:"Art"}, {name:"Gaming"}, {name:"International"}];
   public warning: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  public onEditMode(result : boolean){
    this.editMode = result;
  }

  public defualtImgOn(result : boolean){
    this.defImg = result;
  }

  onSubmit(f: NgForm): void{
    if(this.userProfile.userName !="" && this.userProfile.age >=17 && this.userProfile.program !=""){
      console.log("form submitted");
    }
  }
}
