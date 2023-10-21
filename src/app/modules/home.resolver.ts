import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { Event } from '../core/models/event';
import { EventsService } from '../core/services/events/events.service';

@Injectable({
  providedIn: 'root'
})
export class HomeResolver implements Resolve<Observable<Event> | undefined> {

  constructor( private eventsService: EventsService, private router: Router ) {

  }

  resolve(route: ActivatedRouteSnapshot): Observable<Event> | null {
    if (route.paramMap.has('id')) {
      const postId: string = route.paramMap.get('') as string;
      const post: Observable<Event> = this.eventsService.getEventById(postId);

      if (post) return post;
  }

  this.router.navigateByUrl('')
  return null;
}
}
