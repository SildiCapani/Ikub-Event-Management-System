import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from 'src/app/core/models/event';
import { EventsService } from 'src/app/core/services/events/events.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user/user.service';
import { Location } from '@angular/common';
import { EMPTY } from 'rxjs';
import { calculateDaysLeft } from 'src/app/core/const/calculate-days';


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})



export class EventComponent implements OnInit {

  eventId = this.activatedRoute.snapshot.paramMap.get('id')
  event$ = this.eventId? this.eventService.getEventById(this.eventId) : EMPTY;
  user: User;

  calculateDaysLeftFunction = calculateDaysLeft

  constructor(
    private eventService: EventsService, 
    private activatedRoute: ActivatedRoute, 
    private modalService: NgbModal, 
    private userService: UserService, 
    private router: Router, 
    private location: Location) {}

  openBookingForm(bookingDialog: TemplateRef<any>) {
    this.modalService.open(bookingDialog);
  }

  bookEvent(): void {
    this.eventService.registerForEvent(this.eventId,this.user.fullName)
    this.router.navigateByUrl('/')
  }

  goBack(): void {
    this.location.back();
  }

  calculateDaysLeft(date: string): number {
    const registrationEndDate  = new Date(date);
    const today  = new Date();

    const differenceInTime = registrationEndDate.getTime() - today.getTime();

    const daysLeft = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24))

    return daysLeft
  }

  ngOnInit(): void {
      
      // this.activatedRoute.data.subscribe((data) => {
      //   const post = data as Event;
      //   this.event = post;
      // });
      this.userService.userObservable.subscribe(user => this.user = user)
  }

}
