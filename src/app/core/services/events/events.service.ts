import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, map, tap } from 'rxjs';
import { Event, Events } from 'src/app/core/models/Event';

@Injectable({
  providedIn: 'root'
})

export class EventsService {

  

  constructor(private db: AngularFireDatabase, private toastrService: ToastrService, private httpClient: HttpClient, private router: Router) { }

  getEventsData(): Observable<any[]>{
    return this.db.list<any>('events').valueChanges()
  }

  getEventById(id: string): Observable<Event> {
    return this.db.object<Event>(`events/${id}/data`).valueChanges()
  }

  registerForEvent(id: string,fullName: string): void {
    const tutRef = this.db.object(`events/${id}`);

    // Fetch the current data from the database
    const subscription = tutRef.valueChanges().subscribe((event: any) => {
      if (!event.namesOfRegisteredAttenders.includes(fullName)) {
        const updatedRegisteredAttenders = event.registeredAttenders + +1;
        const updatedNamesOfRegisteredAttenders = [...event.namesOfRegisteredAttenders, fullName];
    
        // Update the event in the database
        tutRef.update({
          registeredAttenders: updatedRegisteredAttenders,
          namesOfRegisteredAttenders: updatedNamesOfRegisteredAttenders
        }).then(() => {
          console.log(`Successfully updated event with ID ${id}`);
        }).catch((error) => {
          console.error(`Error updating event: ${error}`);
        })

        subscription.unsubscribe();
        
      } else {
        this.toastrService.error(`you are already registered for the event ${fullName}!`, "Event booking faild")
        subscription.unsubscribe();
      }
    });
  }

  updateEvent(id: string,data: Event): void {
    const event = this.db.object(`events/${id}/data`)
    event.update({ title: data.title,description: data.description, date: data.date, price: data.price, maxAttenders: data.maxAttenders, lastDate: data.lastDate, image: data.image  })
    .then(() => {
      this.toastrService.success("Event has been updated")
      this.router.navigateByUrl('/dashboard')
    })
  }

  getHighestEventId(): Observable<number> {
    return this.db.list('events', (ref) => ref.orderByChild('id').limitToLast(1))
      .valueChanges()
      .pipe(
        map((events: any[]) => {
          if (events.length === 0) {
            return 0; // No existing events
          }
          return events[0].id;
        })
      );
  }

  createEvent(data: any): void {
    const event = this.db.list(`events`).push({data}).key
    this.db.object(`events/${event}/data`).update({id: event})
    .then(() => {
      this.toastrService.success("Event has been created")
      this.router.navigateByUrl('/dashboard')
    })
  }

}
