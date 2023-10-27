import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from 'src/app/core/models/event';
import { EventsService } from 'src/app/core/services/events.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';
import { Location } from '@angular/common';
import { EMPTY } from 'rxjs';
import { calculateDaysLeft } from 'src/app/core/const/calculate-days';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommentsService } from 'src/app/core/services/comments.service';


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
      
  }

}
