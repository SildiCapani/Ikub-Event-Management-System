import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';
import { Roles } from 'src/app/enums';

@Component({
  selector: 'app-register-organizer',
  templateUrl: './register-organizer.component.html',
  styleUrls: ['./register-organizer.component.scss'],
})
export class RegisterOrganizerComponent {
  registerForm = new FormGroup(
    {
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    {
      validators: this.passwordsMatchValidator('password', 'confirmPassword'),
    }
  );

  isSubmitted: boolean = false;
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
  returnUrl: string = '';

  constructor(private userService: UserService) {}

  submit(): void {
    this.isSubmitted = true;
    if (this.registerForm.invalid) return;

    const user: User = {
      fullName: this.registerForm.get('name')?.value,
      email: this.registerForm.get('email')?.value,
      role: Roles.ORGANIZER,
      emailVerified: false,
    };

    const password: string = this.registerForm.get('password')?.value;

    this.userService.registerOrganizer(user, password);
  }

  ngOnInit(): void {}

  passwordsMatchValidator(
    passwordControlName: string,
    confirmPasswordControlName: string
  ): ValidatorFn {
    return (from: AbstractControl): ValidationErrors | null => {
      const passwordControl = from.get(passwordControlName);
      const confirmPasswordControl = from.get(confirmPasswordControlName);

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ notMatch: true });
      } else {
        const errors = confirmPasswordControl.errors;
        if (!errors) {
          return null;
        }

        delete errors['notMatch'];
        confirmPasswordControl.setErrors(errors);
      }

      return null;
    };
  }
}
