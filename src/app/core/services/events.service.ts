import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, map, take } from 'rxjs';
import { Event, Events } from 'src/app/core/models/event';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class EventsService {

  databaseURL: string = environment.firebase.databaseURL

  constructor(private db: AngularFireDatabase, private toastrService: ToastrService, private httpClient: HttpClient) { }

  getEventsData(): Observable<Events[]>{
    return this.httpClient.get<Events[]>(`${this.databaseURL}/events.json`).pipe(
      map((data: Events[]) =>
        Object.keys(data).map((key) => {
          return data[key];
        })
      )
    );
  }

  
  getEventById(id: string): Observable<Event> {
    return this.httpClient.get<Event>(`${this.databaseURL}/events/${id}/data.json`)
  }


  registerForEvent(id: string, uid: string): void {
    const Event = this.db.object(`events/${id}/data`);

    // Fetch the current data from the database
    const subscription = Event.valueChanges().subscribe((event: Event) => {
      if (!event.namesOfRegisteredAttenders.includes(uid)) {
        const updatedRegisteredAttenders = event.registeredAttenders + +1;
        // const updatedNamesOfRegisteredAttenders = [event.namesOfRegisteredAttenders, uid];
    
        event.namesOfRegisteredAttenders.push(uid);

        // Update the event in the database
        Event.update({
          registeredAttenders: updatedRegisteredAttenders,
          namesOfRegisteredAttenders: event.namesOfRegisteredAttenders
        }).then(() => {
          this.toastrService.success('Registration succeed')
        }).catch((error) => {
          this.toastrService.error(`Error updating event: ${error}`);
        })

        subscription.unsubscribe();
        
      } else {
        this.toastrService.error(`you are already registered for this event!`, "Event booking faild")
        subscription.unsubscribe();
      }
    });
  }

}
