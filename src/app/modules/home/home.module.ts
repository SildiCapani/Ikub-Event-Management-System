import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsComponent } from './events/events.component';
import { EventComponent } from './events/event/event.component';
import { HomeRoutingModule } from './home-routing.module';
import { MatRippleModule } from '@angular/material/core';
import { CoreModule } from 'src/app/core/core.module';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { EventsService } from 'src/app/core/services/events/events.service';
import { HomeResolver } from '../home.resolver';



@NgModule({
  declarations: [
    EventsComponent,
    EventComponent,
    UsersComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatRippleModule,
    MatIconModule,
    CoreModule,
    ReactiveFormsModule
  ],
  providers: [
    EventsService,
    HomeResolver
  ]
})
export class HomeModule { }
