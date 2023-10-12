import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private search$: BehaviorSubject<string> = new BehaviorSubject<string>('')
  public search = this.search$.asObservable();

  
  constructor() { }

  setSearchInputValue(value: string): void {
    this.search$.next(value)
  }
}
