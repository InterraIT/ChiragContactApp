import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactPopupComponent } from '../contact-popup/contact-popup.component';
import { User } from '../../interfaces/Users';
import { UsersService } from '../../services/users.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeletePopupComponent } from '../delete-popup/delete-popup.component';
import { ToastrService } from 'ngx-toastr';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import {
  Observable,
  Subject,
  debounce,
  map,
  switchMap,
  tap,
  timer,
} from 'rxjs';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ContactPopupComponent,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  usersList: Array<User> = [];
  subjectMain = new Subject<any>();
  public dataListObs: Observable<any[]>;
  public pageSize = 2;
  public numberOfrecords = -1;
  public currentPageNumber = 1;
  public searchForm: FormGroup;
  searchFieldValueOutputDelay: number;
  public totalNumberOfrecords: number;
  constructor(
    private userService: UsersService,
    private modalService: NgbModal,
    private toastrService: ToastrService,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      searchTxt: [''],
    });
  }

  ngOnInit(): void {
    this.getUserList();

    setTimeout(() => {
      this.getDatalist(1, true);
    }, 100);
  }

  onSearch(event: any) {
    if (
      !(
        this.searchForm.value.searchTxt.trim().length == 0 ||
        this.searchForm.value.searchTxt.trim().length > 2
      )
    ) {
      return;
    }
    this.getDatalist(1, true);
  }

  getUserList() {
    this.dataListObs = this.subjectMain.pipe(
      debounce(() => timer(this.searchFieldValueOutputDelay)),
      switchMap((dataFilter: any) =>
        this.userService
          .getUsersList(
            dataFilter.pageNumber,
            dataFilter.pageSize,
            dataFilter.globalSearchPattern
          )
          .pipe(
            tap((res: any) => {
              this.totalNumberOfrecords = res.totalCount;
              this.numberOfrecords = res.users.length;
              this.currentPageNumber = dataFilter.pageNumber;
              console.log(this.currentPageNumber);
            }),
            map((res) => res.users)
          )
      )
    );
  }

  deleteUser(user: User) {
    const modalRef = this.modalService.open(DeletePopupComponent, {
      centered: true,
    });
    modalRef.componentInstance.user = user;
    modalRef.componentInstance.deleteUser.subscribe((userData: User) => {
      if (userData.id) {
        this.userService.deleteUser(userData.id).subscribe((res: any) => {
          if (res) {
            this.toastrService.success('User Deleted');
            this.getDatalist(1, true);
          }
        });
      }
    });
  }

  editUser(user: User) {
    const modalRef = this.modalService.open(ContactPopupComponent, {
      centered: true,
    });
    modalRef.componentInstance.user = user;
    modalRef.componentInstance.title = 'Edit User';
    modalRef.componentInstance.new = false;
    modalRef.componentInstance.editUser.subscribe((userData: User) => {
      if (userData.id) {
        this.userService.editUser(userData).subscribe((res: any) => {
          if (res) {
            this.toastrService.success('User Updated');
            this.getDatalist(1, true);
          }
        });
      }
    });
  }

  addUser() {
    const modalRef = this.modalService.open(ContactPopupComponent, {
      centered: true,
    });
    modalRef.componentInstance.title = 'Add User';
    modalRef.componentInstance.new = true;
    modalRef.componentInstance.editUser.subscribe((userData: User) => {
      if (userData) {
        this.userService.postUser(userData).subscribe((res: any) => {
          if (res) {
            this.toastrService.success('User Added');
            this.getDatalist(1, true);
          }
        });
      }
    });
  }

  getDatalist(pageNumber: number, debounceNeeded: boolean = false) {
    let globalSearchPattern = encodeURIComponent(
      this.searchForm.value.searchTxt
    );
    let dataFilter = {
      pageNumber: pageNumber,
      pageSize: this.pageSize,
      globalSearchPattern: globalSearchPattern,
    };
    if (debounceNeeded) {
      this.searchFieldValueOutputDelay = 500;
    } else {
      this.searchFieldValueOutputDelay = 5;
    }
    this.subjectMain.next(dataFilter);
  }
}
