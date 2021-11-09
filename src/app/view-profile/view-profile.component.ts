import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';


import { RegisteredUser } from './../registered-user';

export class Profile{
  profile_id: number;
  profile_name: string;
  age: number;
  image: string;
  biography: string;
}

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  profileList: any;

  
  

  private profileId;
  public currentProfile;
  private userList;

  constructor(private auth:AuthService,  private http: HttpClient) { }


  ngOnInit(): void {

    this.userList = this.auth.getUserInfo().subscribe((data) => {
      console.log("Profile : ", data.rows);
      data.rows.forEach(profile =>{
        if(profile.profile_id == 5){
          this.profileList = profile;
          console.log("Current Profile : ", profile)
        }
      })
    })

    

    
  }

}
