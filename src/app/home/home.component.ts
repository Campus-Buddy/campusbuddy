import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { any } from 'sequelize/types/lib/operators';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public username: string = '';
  private sub: Subscription = new Subscription();

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    
  }
}
