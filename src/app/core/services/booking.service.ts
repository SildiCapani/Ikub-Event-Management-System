import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Booking } from '../models/booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private db: AngularFireDatabase, private toastrService: ToastrService, private storage: AngularFireStorage, private router: Router) { }

  getBookings(): Observable<any[]>{
    return this.db.list<any>('bookings').valueChanges()
  }

  bookEventRequest(data: any, eventId: string): void {
    const booking = this.db.list(`bookings`).push({data}).key
    this.db.object(`events/${eventId}/data/waiting`).update([data.name])
    this.db.object(`bookings/${booking}/data`).update({id: booking, eventId: eventId})
    .then(() => {
      this.toastrService.success("Thank you for the registration you will be informed for the status of the registration")
      this.router.navigateByUrl('/')
    })
  }
}
