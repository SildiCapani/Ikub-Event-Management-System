import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CardComponent } from './card/card.component';
import { TranslateModule } from '@ngx-translate/core';
import { UserListComponent } from './user-list/user-list.component';
import { CommentsComponent } from './comments/comments.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BookingsListComponent } from './bookings-list/bookings-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { BookingComponent } from './booking/booking.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    CardComponent,
    UserListComponent,
    CommentsComponent,
    BookingsListComponent,
    BookingComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    ReactiveFormsModule,
    TranslateModule,
    MatButtonModule,
    HttpClientModule,
    NgbModalModule, 
    MatTableModule,
  ],
  exports: [
    CardComponent,
    UserListComponent,
    CommentsComponent,
    BookingsListComponent,
    LoadingSpinnerComponent
  ]
})
export class SharedModule { }
