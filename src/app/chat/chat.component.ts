import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ChatService } from '../services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  private getMessagesSub: any;
  messages: string[] = [];
  username: any;
  currentMessage: string;
  public _token: any;
  private sub: Subscription = new Subscription();
  private sub2: Subscription = new Subscription();

  constructor(private chatService: ChatService, private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this._token = this.auth.readToken();
    this.sub2 = this.auth.getProfile(this._token.userId).subscribe((data) => {
      this.username = data.profile_name;
      this.chatService.sendUsername(this.username);
      console.log(this.username);
    });

    this.getMessagesSub = this.chatService.getMessages.subscribe((data) => {
      this.messages.push(data);
    });

  }

  sendMessage() {
    this.chatService.sendMessage(this.currentMessage);
    this.currentMessage = "";
  }

  ngOnDestroy() {
    this.getMessagesSub.unsubscribe();
  }

}
