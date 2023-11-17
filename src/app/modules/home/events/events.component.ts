import { Component, OnInit } from '@angular/core';
import { calculateDaysLeft } from 'src/app/core/const/calculate-days';
import { Events } from 'src/app/core/models/event';
import { EventsService } from 'src/app/core/services/events.service';
import { SearchService } from 'src/app/core/services/search.service';
import { TranslateService } from '@ngx-translate/core';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  
  search?: string;
  events: Events[] = [];

  calculateDaysLeftFunction = calculateDaysLeft

  constructor(
    private eventsService: EventsService,
    private searchService: SearchService,
  ) {}

  getSearchByLocation(): void {
    this.searchService.location
      .pipe(
        switchMap((searchValue: string) => {
          this.search = searchValue;
          return this.eventsService.getEventsData();
        }),
      )
      .subscribe((searchedEvents: Events[]) => {
        this.events =
          this.search ? searchedEvents.filter((item) => item.data.location.toLocaleLowerCase().includes(this.search.toLocaleLowerCase()))
            : searchedEvents;
      });
  }

  getSearchByInput(): void {
    this.searchService.search
      .pipe(
        switchMap((searchValue: string) => {
          this.search = searchValue;
          return this.eventsService.getEventsData();
        }),
      )
      .subscribe((searchedEvents: Events[]) => {
        this.events =
          this.search ? searchedEvents.filter((item) => item.data.title.toLocaleLowerCase().includes(this.search.toLocaleLowerCase()))
            : searchedEvents;
      });
  }

  ngOnInit(): void {
    this.getSearchByInput();
    this.getSearchByLocation();
  }
}
