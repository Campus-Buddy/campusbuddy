import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private socket; //: SocketIOClient.Socket; // The client instance of socket.io
  public getMessages: any;
  private url = 'http://localhost:8080';

  constructor() {
        this.getMessages = new Subject();

        //this.socket = io(this.url); // we can also use io.connect() to connect to the current host
        this.socket = io.connect(this.url);

        this.socket.on('chat message', (msg) => {
          this.getMessages.next(msg); // send the new message
        });
      }

      sendMessage(msg) {
        this.socket.emit('chat message', msg);
      }

}
