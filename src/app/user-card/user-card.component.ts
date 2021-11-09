import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})


export class UserCardComponent implements OnInit {
  @Input() username = '';
  @Input() age = '';
  @Input() program = '';
  @Input() id = '';
  @Input() height = 30;
  // should be only pass id and then grab using a get request?

  constructor() { }


  /**
   * TO DO:
   * We need to pass an id for this components to grab the information for that user to display
   * and then use this same id to pass to view profile if someone wants to view profile */ 
  ngOnInit(): void {
  }

}
