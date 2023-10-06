import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsComponent } from './events/events.component';
import { EventComponent } from './events/event/event.component';



@NgModule({
  declarations: [
    EventsComponent,
    EventComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
