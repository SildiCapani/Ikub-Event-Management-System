import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EventsService } from './events.service';

@Injectable({
  providedIn: 'root'
})
export class EventCrudService {

  constructor(private db: AngularFireDatabase, private toastrService: ToastrService, private storage: AngularFireStorage, private router: Router,private eventService: EventsService) { }


  updateEvent(id: string,data: Event): void {
    const event = this.db.object(`events/${id}/data`)
    event.update(data)
    .then(() => {
      this.toastrService.success("Event has been updated")
      this.router.navigateByUrl('/dashboard')
    })
  }

  
  createEvent(data: any, imageFile: File): void {
    const event = this.db.list(`events`).push({data}).key
    this.uploadImageAndSaveData(data, imageFile, event);
    this.db.object(`events/${event}/data`).update({id: event})
    .then(() => {
      this.toastrService.success("Event has been created")
      this.router.navigateByUrl('/dashboard')
    })
  }


  deleteEvent(id: string): void {
    this.db.object(`events/${id}`).remove().then(() => {
      this.toastrService.success('Event deleted')
    })
    
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
