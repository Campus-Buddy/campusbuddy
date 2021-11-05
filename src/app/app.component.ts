import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LogoutModalComponent } from './components/logout-modal/logout-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'campus-buddy';

  constructor(private modalService: NgbModal) {}

  displayLogoutModal() {
    this.modalService.open(LogoutModalComponent)
  }
}
