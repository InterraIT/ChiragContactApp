import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from '../paginator/paginator.component';
import { ContactPopupComponent } from '../contact-popup/contact-popup.component';
import { User } from '../../interfaces/Users';
import { UsersService } from '../../services/users.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { DeletePopupComponent } from '../delete-popup/delete-popup.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PaginatorComponent, ContactPopupComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  usersList: Array<User> = [];

  public ngbModalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    centered: true,
    windowClass: ''
  };
  constructor(
    private userService: UsersService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList(searchTerm = '') {
    this.userService.getUsersList(searchTerm).subscribe((data: any) => {
      if (data && Array.isArray(data)) {
        this.usersList = data;
      }
    });
  }

  deleteUser(user: User) {
    const modalRef = this.modalService.open(DeletePopupComponent, { centered: true });
    modalRef.componentInstance.user = user;
  }
}
