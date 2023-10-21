import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/core/models/user';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})


export class RegisterComponent implements OnInit {

  registerForm!: FormGroup
  isSubmitted: boolean = false;
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
  returnUrl: string = '';

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router) {

  }

  submit(): void {
    this.isSubmitted = true
    if(this.registerForm.invalid)return;

    const user: User = {
      fullName: this.registerForm.get('name')?.value,
      email: this.registerForm.get('email')?.value,
      role: 'costumer',
      age: this.registerForm.get('age')?.value,
      address: this.registerForm.get('address')?.value,
      phoneNumber: this.registerForm.get('phoneNumber')?.value,
      emailVerified: false
    }

    const password: string = this.registerForm.get('password')?.value

    this.userService.userSignUp(user, password)
    console.log(this.registerForm)
  }

  ngOnInit(): void {
      this.registerForm = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(4)]),
        email: new FormControl('', [Validators.email, Validators.required]),
        age: new FormControl(0, [Validators.required, Validators.minLength(2)]),
        address: new FormControl('', Validators.required),
        phoneNumber: new FormControl(0, [Validators.required, Validators.minLength(10)]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        confirmPassword: new FormControl('', [Validators.required])
      },
      {
        validators: this.PasswordsMatchValidator('password', 'confirmPassword')
      });
      this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
  }

  PasswordsMatchValidator(passwordControlName: string, confirmPasswordControlName: string): ValidatorFn {
    return (from: AbstractControl): ValidationErrors | null => {
      const passwordControl = from.get(passwordControlName);
      const confirmPasswordControl = from.get(confirmPasswordControlName)

      if(!passwordControl || !confirmPasswordControl) {
        return null
      }

      if(passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ notMatch: true });
      } else {
        const errors = confirmPasswordControl.errors
        if(!errors) {
          return null
        }

        delete errors['notMatch'];
        confirmPasswordControl.setErrors(errors)
      }

      return null;
    };
  }

}
