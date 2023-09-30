import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { Event } from 'src/app/models/Event';

@Injectable({
  providedIn: 'root'
})

export class EventsService {

  constructor(private db: AngularFireDatabase) { }

  getEventData(): Observable<Event[]>{
    return this.db.list<Event>('events').valueChanges()
  }

}
