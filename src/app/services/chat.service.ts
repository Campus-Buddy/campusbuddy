import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';
import { Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private socket; //: SocketIOClient.Socket; // The client instance of socket.io
  private socket2;
  private socket3;
  public getMessages: any;
  public getMessages2: any;
  public getMessages3: any;

  constructor() {
    this.getMessages = new Subject();
    this.getMessages2 = new Subject();
    this.getMessages3 = new Subject();

    //this.socket = io(this.url); // we can also use io.connect() to connect to the current host
    this.socket = io.connect(environment.socketServer);
    this.socket2 = io.connect(environment.socketServer2);
    this.socket3 = io.connect(environment.socketServer3);

    this.socket.on('send-username', (username) => {
      this.socket.emit(username); // send the new message
    });
    this.socket2.on('send-username', (username) => {
      this.socket2.emit(username); // send the new message
    });
    this.socket3.on('send-username', (username) => {
      this.socket3.emit(username); // send the new message
    });

    this.socket.on('chat message', (msg) => {
      this.getMessages.next(msg); // send the new message
    });
    this.socket2.on('chat message', (msg) => {
      this.getMessages2.next(msg); // send the new message
    });
    this.socket3.on('chat message', (msg) => {
      this.getMessages3.next(msg); // send the new message
    });
  }

  sendUsername(username) {
    this.socket.emit('send-username', username);
  }
  sendUsername2(username) {
    this.socket2.emit('send-username', username);
  }
  sendUsername3(username) {
    this.socket3.emit('send-username', username);
  }

  sendMessage(msg) {
    this.socket.emit('chat message', msg);
  }
  sendMessageTwo(msg) {
    this.socket2.emit('chat message', msg);
  }
  sendMessageThree(msg) {
    this.socket3.emit('chat message', msg);
  }
}
