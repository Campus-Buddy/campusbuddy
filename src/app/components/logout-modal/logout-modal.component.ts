import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-logout-modal',
  templateUrl: './logout-modal.component.html',
  styleUrls: ['./logout-modal.component.css'],
})
export class LogoutModalComponent implements OnInit {
  constructor(private modalService: NgbModal, private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  dismissModal() {
    this.modalService.dismissAll();
  }

  confirmLogout() {
    this.auth.logout();
    this.dismissModal();
    this.router.navigate(['landing-page']).then(() => {
      window.location.reload();
    });
  }
}
