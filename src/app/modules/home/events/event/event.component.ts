import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from 'src/app/core/models/Event';
import { EventsService } from 'src/app/core/services/events/events.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/core/models/User';
import { UserService } from 'src/app/core/services/user/user.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})



export class EventComponent implements OnInit {

  eventId: string;
  event: Event;
  user: User;

  constructor(
    private eventService: EventsService, 
    private route: ActivatedRoute, 
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

  ngOnInit(): void {
      this.eventId = this.route.snapshot.paramMap.get('id')
      this.eventService.getEventById(this.eventId).subscribe(event => this.event = event)
      this.userService.userObservable.subscribe(user => this.user = user)
  }

}
