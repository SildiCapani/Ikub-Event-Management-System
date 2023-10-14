import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Event, Events } from 'src/app/core/models/Event';
import { User } from 'src/app/core/models/User';
import { EventsService } from 'src/app/core/services/events/events.service';
import { UserService } from 'src/app/core/services/user/user.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],

})


export class DashboardComponent implements OnInit {

  eventsData$: Observable<Event[]> = this.eventsService.getEventsData();
  events: any[];
  user: User
  displayedColumns = ['title', 'lastDate', 'date', 'maxAttenders', 'registeredAttenders', 'modify'];

  constructor(private eventsService: EventsService, private userService: UserService) {
    this.userService.userObservable.subscribe(user => this.user = user)

  }

  ngOnInit(): void {
     this.eventsService.getEventsData().subscribe(data =>  {this.events = data.map((item: any) => item.data);
    })
  }
}
