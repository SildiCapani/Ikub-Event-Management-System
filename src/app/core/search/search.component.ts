import { Component } from '@angular/core';
import { SearchService } from '../services/search.service';
import { EventsService } from '../services/events.service';
import { Events } from '../models/event';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})


export class SearchComponent {

  searchValue: string = '';
  Locations: string[]; 

  constructor(private searchService: SearchService, private eventService: EventsService) {
    this.eventService.getEventsData().subscribe(item => {
      const tagsSet = new Set<string>();

      item.forEach(item => {
          tagsSet.add(item.data.location);
        });
        this.Locations = Array.from(tagsSet)
      });
  }

  setValue(input: string): void {
    this.searchValue = input
    this.searchService.setSearchInputValue(this.searchValue);
  }

  updateSearchValue(event: Event): void {
    this.searchService.setSearchInputValue(this.searchValue)
  }

}
