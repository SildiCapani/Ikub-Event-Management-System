import { Component, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Booking } from 'src/app/core/models/booking';
import { BookingService } from 'src/app/core/services/booking.service';

@Component({
  selector: 'app-bookings-list',
  templateUrl: './bookings-list.component.html',
  styleUrls: ['./bookings-list.component.css'],
})
export class BookingsListComponent {
  columns = ['name', 'email', 'age', 'phoneNumber', 'eventId', 'verify'];

  item: Booking;

  bookings$ = this.booking.getBookings();

  constructor(
    private booking: BookingService,
    private modalService: NgbModal
  ) {}

  openBookingForm(bookingDialog: TemplateRef<any>, item: Booking) {
    this.modalService.open(bookingDialog);
    this.item = item;
  }
}
