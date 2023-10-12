import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Event, Events } from 'src/app/core/models/Event';
import { EventsService } from 'src/app/core/services/events/events.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {

  eventsData$: Observable<Event[]> = this.eventsService.getEventsData();
  events: any;

  constructor(private eventsService: EventsService) {
   
  }

  ngOnInit(): void {
     this.eventsService.getEventsData().subscribe(data =>  {this.events = data.map((item: any) => item.data); // Map to the "data" key
    console.log(this.events);
    })
  }
}
