import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css'],
})
export class PostCardComponent implements OnInit {
  @Input() id = '';
  @Input() image: '';
  @Input() details: '';
  @Input() title: '';
  @Input() category_name: '';
  @Input() date_created: '';
  @Input() user_id: '';
  @Input() username: '';

  private sub: Subscription = new Subscription();

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.sub = this.auth.getProfile(this.user_id).subscribe((data) => {
      this.username = data.profile_name;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
