import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  isSubmitted: boolean = false;
  returnUrl = '';
  hidePassword: boolean = true;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private router: Router) {}

  submit(): void {
    this.isSubmitted = true
    this.userService.userLogin(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value)
    // .then(() => {
    //   this.router.navigateByUrl(this.returnUrl);
    // })
  }

  ngOnInit(): void {
      this.loginForm = new FormGroup({
        email: new FormControl('', [Validators.email, Validators.required]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)])
      });

      this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl']
  }

}
