import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-find-a-buddy',
  templateUrl: './find-a-buddy.component.html',
  styleUrls: ['./find-a-buddy.component.css']
})
export class FindABuddyComponent implements OnInit {
  users: Array<any> = [];
  private sub: Subscription = new Subscription();

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.sub = this.auth.getAllProfiles().subscribe((data) => {
      this.users = data.rows;
    })
  }

}
