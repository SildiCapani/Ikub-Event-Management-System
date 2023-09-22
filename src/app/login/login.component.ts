import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  isSubmitted: boolean = false;
  returnUrl = '';
  showPassword: boolean = false;

  constructor(private activatedRoute: ActivatedRoute) {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  submit(): void {
    this.isSubmitted = true
  }

  ngOnInit(): void {
      this.loginForm = new FormGroup({
        email: new FormControl('', [Validators.email, Validators.required]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)])
      });

      this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl']
  }

}
