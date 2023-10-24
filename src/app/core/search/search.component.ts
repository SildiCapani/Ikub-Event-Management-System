import { Component } from '@angular/core';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})


export class SearchComponent {

  searchValue: string = '';

  constructor(private searchService: SearchService) {}

  updateSearchValue(event: Event): void {
    this.searchService.setSearchInputValue(this.searchValue)
  }

}
