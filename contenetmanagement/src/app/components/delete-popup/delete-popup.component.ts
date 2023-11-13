import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../interfaces/Users';
@Component({
  selector: 'app-delete-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-popup.component.html',
  styleUrl: './delete-popup.component.scss',
})
export class DeletePopupComponent {
  @Input() public user: any;

  @Output() deleteUser = new EventEmitter<User>();
  constructor(public activeModal: NgbActiveModal) {
  }
  ngOnInit(): void {

  }

  deleteAction(user:User){
    this.deleteUser.emit(user);
    this.activeModal.dismiss("clicked");
  }
}
