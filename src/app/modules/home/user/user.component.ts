import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, switchMap, tap } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  @ViewChild('editMode') editMode: ElementRef;

  localUser: User;

  userDetails$ = this.userService.userObservable.pipe(
    switchMap((localUser) =>
      this.userService.getUser(localUser.uid).pipe(
        tap((user) => {
          this.localUser = localUser;
          this.setFormValues(user);
        })
      )
    )
  );

  userFrom = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    age: new FormControl(0, [Validators.required, Validators.minLength(2)]),
    address: new FormControl('', Validators.required),
    phoneNumber: new FormControl(0, [
      Validators.required,
      Validators.minLength(10),
    ]),
  });

  constructor(private userService: UserService, private location: Location) {}

  toggleEditSection() {
    this.editMode.nativeElement.style.display =
      this.editMode.nativeElement.style.display === 'none' ? 'block' : 'none';
  }

  saveChanges() {
    const user = {
      fullName: this.userFrom.get('name')?.value,
      age: this.userFrom.get('age')?.value,
      address: this.userFrom.get('address')?.value,
      phoneNumber: this.userFrom.get('phoneNumber')?.value,
    };

    this.userService.updateUserData(user, this.localUser.uid);

    this.toggleEditSection(); // Hide the edit section after saving
  }

  setFormValues(user: User) {
    if (user) {
      this.userFrom.patchValue({
        name: user.fullName,
        age: user.age,
        address: user.address,
        phoneNumber: user.phoneNumber,
      });
    }
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {}
}
