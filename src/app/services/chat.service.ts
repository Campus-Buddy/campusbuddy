import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';
import { Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private socket; //: SocketIOClient.Socket; // The client instance of socket.io
  public getMessages: any;

  constructor() {
    this.getMessages = new Subject();

    //this.socket = io(this.url); // we can also use io.connect() to connect to the current host
    this.socket = io.connect(environment.socketServer);

    this.socket.on('send-username', (username) => {
      console.log('enter send username');
      this.socket.emit(username); // send the new message
    });

    this.socket.on('chat message', (msg) => {
      this.getMessages.next(msg); // send the new message
    });
  }

  sendUsername(username) {
    console.log('usernameeeeee:' + username);
    this.socket.emit('send-username', username);
  }

  sendMessage(msg) {
    this.socket.emit('chat message', msg);
  }
}
