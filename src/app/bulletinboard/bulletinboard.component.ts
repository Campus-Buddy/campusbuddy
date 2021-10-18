import { Component, OnInit } from '@angular/core';
import * as userData from '../data/users.json';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { User } from '../interfaces';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-bulletinboard',
  templateUrl: './bulletinboard.component.html',
  styleUrls: ['./bulletinboard.component.css']
})
export class BulletinboardComponent implements OnInit {

  users: Array<any> = [];
  private sub: Subscription = new Subscription;

  users2 = userData;
  // users2 = [];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // this.users2 = this.http.get(`https://campus-buddy-db.herokuapp.com/campusbuddy?table=user`)
    

    this.sub = this.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  public getUsers() : Observable<any> {
    return this.http.get<any>(`${environment.APIBase}?table=user`, {})
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

}
