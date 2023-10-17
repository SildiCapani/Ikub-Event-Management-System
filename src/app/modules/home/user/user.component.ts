import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/core/models/User';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})


export class UserComponent implements OnInit {

  @ViewChild('editMode') editMode: ElementRef;

  userDetails: User
  localUser: User
  userFrom: FormGroup
  
  constructor(private userService: UserService, private location: Location) {

    this.userFrom = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl('', [Validators.email, Validators.required]),
      age: new FormControl(0, [Validators.required, Validators.minLength(2)]),
      address: new FormControl('', Validators.required),
      phoneNumber: new FormControl(0, [Validators.required, Validators.minLength(10)])
    })
  }

  toggleEditSection() {
    this.editMode.nativeElement.style.display = this.editMode.nativeElement.style.display === 'none' ? 'block' : 'none';
  }

  saveChanges() {

    const user = {
        fullName: this.userFrom.get('name')?.value,
        email: this.userFrom.get('email')?.value,
        age: this.userFrom.get('age')?.value,
        address: this.userFrom.get('address')?.value,
        phoneNumber: this.userFrom.get('phoneNumber')?.value,
    }

    this.userService.updateUserData(user, this.userDetails.uid)

    this.toggleEditSection(); // Hide the edit section after saving
  }

  setFormValues() {
    if(this.userDetails) {
      this.userFrom.patchValue({
        name: this.userDetails.fullName,
        email: this.userDetails.email,
        age: this.userDetails.age,
        address: this.userDetails.address,
        phoneNumber: this.userDetails.phoneNumber
      })
    }
  }

  goBack(): void {
    this.location.back()
  }

  ngOnInit(): void {
    this.userService.userObservable.subscribe(user => this.localUser = user)
    this.userService.getUser(this.localUser.uid).subscribe(user => {this.userDetails = user; this.setFormValues(); })
  }

}
