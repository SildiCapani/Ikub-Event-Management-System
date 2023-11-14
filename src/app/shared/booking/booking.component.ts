import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Booking } from 'src/app/core/models/booking';
import { BookingService } from 'src/app/core/services/booking.service';
import { BookingsListComponent } from '../bookings-list/bookings-list.component';
import { MatDialogRef } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})


export class BookingComponent {

  @Input() item: Booking; 

  constructor (private booking: BookingService,private modalService: NgbModal , private location: Location) {}

  accept() {
    this.booking.acceptBooking(this.item);
    this.modalService.dismissAll()
   
  }

  goBack(): void {
    this.location.back();
  }
}
