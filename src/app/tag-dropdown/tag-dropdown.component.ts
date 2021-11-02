import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';



@Component({
  selector: 'app-tag-dropdown',
  templateUrl: './tag-dropdown.component.html',
  styleUrls: ['./tag-dropdown.component.css']
})
export class TagDropdownComponent implements OnInit {
  private sub : Subscription = new Subscription();
  public tagList: Array<any>

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
      // Initialize subscription for tags
      this.sub = this.auth.getTags().subscribe((data) => {
        this.tagList = data.rows;
      });
  }

  
}
