import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  private getMessagesSub: any;
  messages: string[] = [];
  currentMessage: string;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
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