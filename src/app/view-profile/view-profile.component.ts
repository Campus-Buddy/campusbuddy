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

  profileDetails: Profile;
  
  

  

  private userList;

  constructor(private auth:AuthService,  private http: HttpClient) { }

  getUserInfo(): Observable<any> {
    return this.http.get<any>(`${environment.userAPIBase}user`);
  }

  ngOnInit(): void {
    this.profileDetails = {
      profile_id : 1,
      profile_name : "Alexi Stone",
      age : 22,
      image: "https://mdbootstrap.com/img/Photos/Avatars/img%20(31).jpg",
      biography : "Hi. I am Alexi. I learn about computers when I am not sleeping"
    };
    console.log(this.profileDetails);
  }

}
