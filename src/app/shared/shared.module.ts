import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CardComponent } from './card/card.component';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    CardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    TranslateModule
  ],
  exports: [
    CardComponent
  ]
})
export class SharedModule { }
