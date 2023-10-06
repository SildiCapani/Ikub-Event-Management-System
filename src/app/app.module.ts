import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import {MatIconModule} from '@angular/material/icon';
import { ToastrModule } from 'ngx-toastr';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';


import { UsersComponent } from './users/users.component';
import { EventsComponent } from './events/events.component';
import { EventComponent } from './events/event/event.component';
import { UserComponent } from './users/user/user.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpGlobalErrorHandlerInterceptor } from './http-global-error-handler.interceptor';
import { MatRippleModule } from '@angular/material/core';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    EventsComponent,
    EventComponent,
    UserComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    PageNotFoundComponent,
    HeaderComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    NgbModule,
    NgbAlertModule,
    MatIconModule,
    FormsModule, 
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    MatRippleModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass:'toast-bottom-left',
      newestOnTop: false
    }) 
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpGlobalErrorHandlerInterceptor,
      multi: true

    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
