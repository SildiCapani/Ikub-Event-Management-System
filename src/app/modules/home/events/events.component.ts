import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { Observable} from 'rxjs';
import { Event } from 'src/app/models/Event';
import { EventsService } from 'src/app/services/events/events.service';
import { SearchService } from 'src/app/services/search/search.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})


export class EventsComponent implements OnInit {
  
  user?: User;
  Events$: Observable<Event[]> = this.eventsService.getEventsData()
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
          this.Events = searchedEvents.filter(item => item.title.toLocaleLowerCase().includes(this.search.toLocaleLowerCase()))
        } else {
          this.Events = searchedEvents
        }
      } )
    })
    }

  ngOnInit(): void {
      this.getSearch();
    }

}
