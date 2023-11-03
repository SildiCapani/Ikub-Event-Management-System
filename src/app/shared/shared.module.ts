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



@NgModule({
  declarations: [
    CardComponent,
    UserListComponent,
    CommentsComponent,
    BookingsListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    ReactiveFormsModule,
    TranslateModule,
    MatButtonModule,
    MatTableModule
  ],
  exports: [
    CardComponent,
    UserListComponent,
    CommentsComponent,
    BookingsListComponent
  ]
})
export class SharedModule { }
