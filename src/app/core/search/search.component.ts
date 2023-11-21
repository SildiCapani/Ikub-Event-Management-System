import { Component } from '@angular/core';
import { EventsService } from '../services/events.service';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})


export class SearchComponent {

  searchValue: string = '';
  locationInput$ = this.searchService.location
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
    this.searchService.setSearchLocation(input)
  }

  updateSearchValue(): void {
    this.searchService.setSearchInputValue(this.searchValue)
  }

}
