import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/User';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})


export class RegisterComponent implements OnInit {

  registerForm!: FormGroup
  isSubmitted: boolean = false;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  returnUrl: string = '';

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router) {

  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  submit(): void {
    this.isSubmitted = true
    if(this.registerForm.invalid)return;

    const user: User = {
      fullName: this.registerForm.get('name')?.value,
      email: this.registerForm.get('email')?.value,
      role: 'costumer',
      emailVerified: false
    }

    const password: string = this.registerForm.get('password')?.value

    this.userService.userSignUp(user, password)
    console.log(user)
  }

  ngOnInit(): void {
      this.registerForm = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(4)]),
        email: new FormControl('', [Validators.email, Validators.required]),
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
