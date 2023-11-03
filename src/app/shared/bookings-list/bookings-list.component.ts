import { Component } from '@angular/core';
import { map } from 'rxjs';
import { BookingService } from 'src/app/core/services/booking.service';

@Component({
  selector: 'app-bookings-list',
  templateUrl: './bookings-list.component.html',
  styleUrls: ['./bookings-list.component.css']
})



export class BookingsListComponent {

  columns = [
    'name',
    'email',
    'age',
    'phoneNumber',
    'eventId',
    'verify',
  ]

  bookings$ = this.booking.getBookings().pipe(map((data: any) => data.map((item: any) => item.data)));

  constructor (private booking: BookingService) {}

}
