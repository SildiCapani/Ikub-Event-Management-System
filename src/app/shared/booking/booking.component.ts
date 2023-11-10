import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Booking } from 'src/app/core/models/booking';
import { BookingService } from 'src/app/core/services/booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})


export class BookingComponent {

  @Input() item: Booking; 

  constructor (private booking: BookingService, private activatedRoute: ActivatedRoute, private location: Location) {}

  accept() {
    this.booking.acceptBooking(this.item)
  }

  goBack(): void {
    this.location.back();
  }
}
