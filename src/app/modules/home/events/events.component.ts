import { Component, OnInit } from '@angular/core';
import { calculateDaysLeft } from 'src/app/core/const/calculate-days';
import { Events } from 'src/app/core/models/event';
import { EventsService } from 'src/app/core/services/events/events.service';
import { SearchService } from 'src/app/core/services/search/search.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  // events$: Observable<Event[]> = this.eventsService.getEventsData()
  search?: string;
  events: Events[] = [];

  calculateDaysLeftFunction = calculateDaysLeft

  constructor(
    private eventsService: EventsService,
    private searchService: SearchService,
  ) {}

  getSearch(): void {
    this.getSearchByInput();
  }

  getSearchByInput(): void {
    this.searchService.search.subscribe((searchValue) => {
      this.search = searchValue;
      this.eventsService.getEventsData().subscribe((searchedEvents) => {
        if (this.search) {
          this.events = searchedEvents
            // .map(({ data }) => data)
            .filter((item) =>
              item.data.title
                .toLocaleLowerCase()
                .includes(this.search.toLocaleLowerCase())
            );
        } else {
          this.events = searchedEvents;
        }
      });
    });
  }

  ngOnInit(): void {
    this.getSearch();
  }
}
