import { Component } from '@angular/core';
import { SearchService } from '../services/search/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})


export class SearchComponent {

  searchValue: string = '';

  constructor(private searchService: SearchService) {}

  updateSearchValue(event: Event): void {
    this.searchService.setSearchInputValue(this.searchValue)
  }

}
