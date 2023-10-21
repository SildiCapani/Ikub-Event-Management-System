import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Event } from 'src/app/core/models/event';
import { User } from 'src/app/core/models/user';
import { EventsService } from 'src/app/core/services/events/events.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  // eventsData$: Observable<Event[]> = this.eventsService.getEventsData();
  user: User;
  columns = [
    'title',
    'lastDate',
    'date',
    'maxAttenders',
    'registeredAttenders',
    'modify',
  ];

  myEvents$ = this.eventsService
    .getEventsData()
    .pipe(
      map((data: any) =>
        data
          .map((item: any) => item.data)
          .filter((item) => item.creator == this.user.fullName)
      )
    );

  events$ = this.eventsService
    .getEventsData()
    .pipe(map((data: any) => data.map((item: any) => item.data)));

  constructor(
    private eventsService: EventsService,
    private userService: UserService
  ) {
    this.userService.userObservable.subscribe((user) => (this.user = user));
  }
}
