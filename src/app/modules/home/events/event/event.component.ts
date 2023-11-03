import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from 'src/app/core/models/event';
import { EventsService } from 'src/app/core/services/events.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';
import { Location } from '@angular/common';
import { EMPTY } from 'rxjs';
import { calculateDaysLeft } from 'src/app/core/const/calculate-days';
import { BookingService } from 'src/app/core/services/booking.service';


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})



export class EventComponent implements OnInit {

  eventId = this.activatedRoute.snapshot.paramMap.get('id')
  event$ = this.eventId? this.eventService.getEventById(this.eventId) : EMPTY;
  user: User = this.userService.user$.getValue()


  calculateDaysLeftFunction = calculateDaysLeft

  constructor(
    private eventService: EventsService, 
    private activatedRoute: ActivatedRoute, 
    private modalService: NgbModal, 
    private userService: UserService, 
    private booking: BookingService, 
    private location: Location) {}

  openBookingForm(bookingDialog: TemplateRef<any>) {
    this.modalService.open(bookingDialog);
  }

  bookEvent(): void {
    // this.eventService.registerForEvent(this.eventId,this.user.fullName)
    const bookingInfo = {
      name: this.user.fullName,
      email: this.user.email,
      phoneNumber: this.user.phoneNumber,
      age: this.user.age,
      id: this.user.uid
    }
    this.booking.bookEventRequest(bookingInfo, this.eventId)
  }

  goBack(): void {
    this.location.back();
  }

  isRegistrationAllowed(event: Event): string {
    const daysLeft = this.calculateDaysLeftFunction(event.lastDate);
    if (daysLeft <= 0) {
      return 'timeExpired';
    } else if (event.namesOfRegisteredAttenders?.includes(this.user?.fullName)) {
      return 'alreadyRegistered';
    } else if (event.waiting?.includes(this.user?.fullName)) {
      return 'waiting'
    } else if (!this.user) {
      return 'pleaseLogin';
    } else if (event.maxAttenders > event.registeredAttenders) {
      return 'bookNow';
    } else if (event.maxAttenders <= event.registeredAttenders) {
      return 'soldOut'
    } else {
      return 'soldOut';
    }
  }

  ngOnInit(): void {
      
  }

}
