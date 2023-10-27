import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, map, tap } from 'rxjs';
import { Event, Events } from 'src/app/core/models/event';

@Injectable({
  providedIn: 'root'
})

export class EventsService {

  

  constructor(private db: AngularFireDatabase, private toastrService: ToastrService, private storage: AngularFireStorage, private router: Router) { }

  getEventsData(): Observable<Events[]>{
    return this.db.list<Events>('events').valueChanges()
  }

  
  getEventById(id: string): Observable<Event> {
    return this.db.object<Event>(`events/${id}/data`).valueChanges()
  }


  registerForEvent(id: string,fullName: string): void {
    const Event = this.db.object(`events/${id}/data`);

    // Fetch the current data from the database
    const subscription = Event.valueChanges().subscribe((event: Event) => {
      if (!event.namesOfRegisteredAttenders.includes(fullName)) {
        const updatedRegisteredAttenders = event.registeredAttenders + +1;
        const updatedNamesOfRegisteredAttenders = [event.namesOfRegisteredAttenders, fullName];
    
        // Update the event in the database
        Event.update({
          registeredAttenders: updatedRegisteredAttenders,
          namesOfRegisteredAttenders: updatedNamesOfRegisteredAttenders
        }).then(() => {
          this.toastrService.success('Registration succeed')
        }).catch((error) => {
          this.toastrService.error(`Error updating event: ${error}`);
        })

        subscription.unsubscribe();
        
      } else {
        this.toastrService.error(`you are already registered for the event ${fullName}!`, "Event booking faild")
        subscription.unsubscribe();
      }
    });
  }
  
  
  private uploadImageAndSaveData(eventData: any, imageFile: File, eventId: string): void {
    if (imageFile) {
      const storageRef = this.storage.ref(`images/${imageFile.name}`);
      storageRef.put(imageFile).then(snapshot => {
        snapshot.ref.getDownloadURL().then(url => {
          eventData.image = url;
          this.saveEventData(eventData, eventId);
        });
      });
    } else {
      this.saveEventData(eventData, eventId);
    }
  }

  private saveEventData(eventData: any, eventId: string): void {
    this.db.object(`events/${eventId}/data`).update(eventData).then(() => {
      this.toastrService.success('Event has been created');
      this.router.navigateByUrl('/dashboard');
    });
  }

}
