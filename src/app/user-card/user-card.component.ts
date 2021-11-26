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
  @Input() id :number = 0;
  @Input() height :number = 6;
  @Input() buttons : boolean = true;
  @Input() tagList: Array<any> = [];
  @Input() showTagList: boolean = false;
  @Input() image: String;
  // should be only pass id and then grab using a get request?

  constructor() { }


  /**
   * TO DO:
   * We need to pass an id for this components to grab the information for that user to display
   * and then use this same id to pass to view profile if someone wants to view profile */ 
  ngOnInit(): void {
    // Changes height of the profile image in the card
    const images = window.document.getElementsByClassName('profile-img');
    for (let image of images)
    image.setAttribute("style", `height:${this.height}rem; width:${this.height}rem`)
  }

}
