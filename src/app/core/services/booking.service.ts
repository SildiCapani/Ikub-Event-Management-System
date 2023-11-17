import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, map, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Booking } from '../models/booking';
import { EventsService } from './events.service';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(
    private db: AngularFireDatabase,
    private toastrService: ToastrService,
    private eventService: EventsService,
    private router: Router,
    private httpClient: HttpClient
  ) {}

  getBookings(): Observable<Booking[]> {
    return this.httpClient
      .get<Booking[]>(`${environment.firebase.databaseURL}/bookings.json`)
      .pipe(
        map((data: Booking[]) =>
          Object.keys(data).map((key) => {
            return data[key].data;
          })
        )
      );
    // return this.db.list<Booking>('bookings').valueChanges()
  }

  getBookingById(id: string): Observable<Event> {
    return this.db.object<Event>(`bookings/${id}/data`).valueChanges();
  }

  acceptBooking(item: Booking): void {
    this.eventService.registerForEvent(item.eventId, item.uid);
    this.db
      .list(`events/${item.eventId}/data/waiting`, (ref) =>
        ref.orderByValue().equalTo(item.uid)
      )
      .remove()
      .then(() => {});
    this.db
      .object(`bookings/${item.id}`)
      .remove()
      .then(() => {
        this.toastrService.success('succes');
        this.router.navigateByUrl('/dashboard');
      });
  }

  rejectBooking(item: Booking): void {
    this.db
      .list(`events/${item.eventId}/data/waiting/`, (ref) =>
        ref.orderByValue().equalTo(item.uid)
      )
      .remove()
      .then(() => {
        this.toastrService.success('succes');
      });
    this.db
      .object(`bookings/${item.id}`)
      .remove()
      .then(() => {
        this.toastrService.success('succes');
        this.router.navigateByUrl('/dashboard');
      });
  }

  bookEventRequest(data: any, eventId: string): void {
    const booking = this.db.list(`bookings`).push({ data }).key;

    this.db
      .object(`events/${eventId}/data/waiting`)
      .valueChanges()
      .pipe(take(1))
      .subscribe((currentData: any[]) => {
        if (Array.isArray(currentData)) {
          currentData.push(data.uid);
        } else {
          currentData = [data.uid];
        }
        this.db.object(`events/${eventId}/data/waiting`).set(currentData);
      });

    this.db
      .object(`bookings/${booking}/data`)
      .update({ id: booking, eventId: eventId })
      .then(() => {
        this.toastrService.success(
          'Thank you for the registration you will be informed for the status of the registration'
        );
        this.router.navigateByUrl('/');
      });
  }
}
