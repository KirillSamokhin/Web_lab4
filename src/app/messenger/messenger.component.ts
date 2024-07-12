import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css'],
})
export class MessengerComponent implements OnInit {
  status: string;
  messages: string[] = [];
  inputMessage: string = '';
  name: string;

  constructor(private userService: UserService, private router: Router,) {
  }

  ngOnInit(): void {
    this.name = this.userService.getAuthorizedUser().name;

    this.connectWebSocket();
  }

  setStatus(value: string) {
    this.status = value;
  }

  printMessage(value: string) {
    const name = this.userService.getAuthorizedUser().name
    console.log(value.includes(name))
    this.messages.push(value);
  }

  ws: WebSocket;

  connectWebSocket() {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => this.setStatus('Состояние: ONLINE');
    ws.onclose = () => this.setStatus('Состояние: DISCONNECTED');

    ws.onmessage = response => this.printMessage(response.data);

    this.ws = ws;
  }

  sendMessage() {
    if (this.ws && this.inputMessage.trim() !== '') {
      this.ws.send(this.name + ": " + this.inputMessage);
      this.inputMessage = '';
    }
  }
}
