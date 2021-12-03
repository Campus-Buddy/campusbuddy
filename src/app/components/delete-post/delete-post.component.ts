import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-delete-post',
  templateUrl: './delete-post.component.html',
  styleUrls: ['./delete-post.component.css'],
})
export class DeletePostComponent implements OnInit {
  constructor(private modalService: NgbModal, private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  dismissModal(d: boolean) {
    this.modalService.dismissAll(d);
  }

  deletePost() {
    // this.auth.deletePost(1);

    this.dismissModal(true);
    this.router.navigate(['/all-posts']);
  }
}
