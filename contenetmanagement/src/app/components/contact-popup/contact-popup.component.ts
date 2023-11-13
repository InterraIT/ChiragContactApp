import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../interfaces/Users';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-contact-popup',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './contact-popup.component.html',
  styleUrl: './contact-popup.component.scss',
})
export class ContactPopupComponent {
  @Input() public user: any;
  @Input() public new: boolean;
  @Input() public title: string;

  @Output() editUser = new EventEmitter<User>();

  public contactForm: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder
  ) {
    this.title = '';
    this.new = false;
    this.contactForm = this.formBuilder.group({
      id:[0],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get firstName() {
    return this.contactForm.get('firstName');
  }
  get lastName() {
    return this.contactForm.get('lastName');
  }
  get email() {
    return this.contactForm.get('email');
  }
  get id() {
    return this.contactForm.get('id');
  }

  ngOnInit(): void {

    if(!this.new){
      this.contactForm.patchValue(this.user);
    }

  }

  editAction(user: User) {

    if(this.contactForm.valid){
      let user = this.contactForm.value
      this.editUser.emit(user);
      this.activeModal.dismiss('clicked');
    }

    
  }
}
