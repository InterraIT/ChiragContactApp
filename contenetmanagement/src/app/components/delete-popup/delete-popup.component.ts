import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-delete-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-popup.component.html',
  styleUrl: './delete-popup.component.scss',
})
export class DeletePopupComponent {
  @Input() public user: any;
  constructor(public activeModal: NgbActiveModal) {
    console.log(this.user)
  }
  ngOnInit(): void {
  }
}
