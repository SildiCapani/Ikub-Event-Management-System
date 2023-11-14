import { Component } from '@angular/core';
import { map } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { EventCrudService } from 'src/app/core/services/event-crud.service';
import { EventsService } from 'src/app/core/services/events.service';
import { UserService } from 'src/app/core/services/user.service';
import { Roles } from "src/app/enums";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  Roles: typeof Roles = Roles;
  user: User =  this.userService.user$.getValue()
  columns = [
    'title',
    'lastDate',
    'date',
    'maxAttenders',
    'registeredAttenders',
    'modify',
    'delete',
  ];

  myEvents$ = this.eventsService
    .getEventsData()
    .pipe(
      map((data: any) =>
        data
          .map((item: any) => item.data)
          .filter((item) => item.creator == this.user.uid)
      )
    );

  

  events$ = this.eventsService
    .getEventsData()
    .pipe(map((data: any) => data.map((item: any) => item.data)));


  constructor(
    private eventsService: EventsService,
    private eventCrudService: EventCrudService,
    private userService: UserService,
  ) {
  
  }

  confirmDelete(eventId: string) {
    if (confirm('Are you sure you want to delete this event?')) {
      
      this.deleteEvent(eventId);
    }
  }

  deleteEvent(id: string): void {
    this.eventCrudService.deleteEvent(id)
  }
}
