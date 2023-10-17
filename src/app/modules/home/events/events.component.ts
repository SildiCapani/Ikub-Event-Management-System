import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/User';
import { Observable} from 'rxjs';
import { Event, Events } from 'src/app/core/models/Event';
import { EventsService } from 'src/app/core/services/events/events.service';
import { SearchService } from 'src/app/core/services/search/search.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})


export class EventsComponent implements OnInit {
  
  user?: User;
  events$: Observable<Event[]> = this.eventsService.getEventsData()
  search?: string;
  Events: Event[]
  
  constructor(private eventsService: EventsService, private searchService: SearchService ) {
      
    }
  
    getSearch(): void {
      this.getSearchByInput();
    }

    getSearchByInput(): void {
      this.searchService.search.subscribe(searchValue => {
      this.search = searchValue
      this.eventsService.getEventsData().subscribe( searchedEvents => {
        if(this.search){
          this.Events = searchedEvents.filter(item => item.data.title.toLocaleLowerCase().includes(this.search.toLocaleLowerCase()))
        } else {
          this.Events = searchedEvents
        }
      } )
    })
    }

    calculateDaysLeft(date): number {
      const registrationEndDate  = new Date(date);
      const today  = new Date();

      const differenceInTime = registrationEndDate.getTime() - today.getTime();

      const daysLeft = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24))

      return daysLeft
    }

  ngOnInit(): void {
      this.getSearch();
    }

}
