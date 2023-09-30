import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { UserService } from '../services/user/user.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Event } from '../models/Event';
import { EventsService } from '../services/events/events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})


export class EventsComponent implements OnInit {
  
  user?: User;
  Events$: Observable<Event[]> = this.eventsService.getEventData()
  
  constructor(private userService: UserService, private eventsService: EventsService ) {
      
    }
  
  ngOnInit(): void {
      
    }

}
