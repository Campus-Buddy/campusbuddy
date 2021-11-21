import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit {
  @Input() id = '1';
  @Input() height :number = 15;
  @Input() image: '';
  @Input() details: '';
  @Input() title: '';
  @Input() category_name: '';
  @Input() date_created: '';
  @Input() user_id: '';
  @Input() username: '';

  private sub: Subscription = new Subscription();

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    const images = window.document.getElementsByClassName('profile-img');
    for (let image of images)
    image.setAttribute("style", `height:${this.height}rem; width:${this.height}rem`)

    this.sub = this.auth.getProfile(this.user_id).subscribe((data) => {
      this.username = data.profile_name;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
