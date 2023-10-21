import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { SearchComponent } from './search/search.component';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
import { TranslateModule } from '@ngx-translate/core'



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    SearchComponent,
    HeaderComponent,
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    MatButtonModule,
    MatToolbarModule,
    HttpClientModule,
    TranslateModule
  ],
  exports: [
    HeaderComponent,
    SearchComponent
  ]
})
export class CoreModule { }
