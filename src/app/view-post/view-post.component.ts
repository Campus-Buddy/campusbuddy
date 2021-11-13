import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../post';
import { AuthService } from '../services/auth.service';

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

  public id;
  private sub;
  private getPost;
  private getUser;
  

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
        console.log(this.userInfo)       
      })
    })

    
    
  }

}
