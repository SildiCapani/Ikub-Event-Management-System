import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Event } from 'src/app/models/Event';

@Injectable({
  providedIn: 'root'
})

export class EventsService {

  constructor(private db: AngularFireDatabase, private toastrService: ToastrService) { }

  getEventsData(): Observable<Event[]>{
    return this.db.list<Event>('events').valueChanges()
  }

  getEventById(id: string): Observable<Event> {
    return this.db.object<Event>(`events/${id}`).valueChanges()
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

}
