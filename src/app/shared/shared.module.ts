import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CardComponent } from './card/card.component';
import { TranslateModule } from '@ngx-translate/core';
import { UserListComponent } from './user-list/user-list.component';
import { CommentsComponent } from './comments/comments.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CardComponent,
    UserListComponent,
    CommentsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  exports: [
    CardComponent,
    UserListComponent,
    CommentsComponent
  ]
})
export class SharedModule { }
