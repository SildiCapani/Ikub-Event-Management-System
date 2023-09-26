import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { UserService } from '../services/user/user.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})


export class EventsComponent implements OnInit {
  
  user?: User;
  
  constructor(private userService: UserService) {
      
    }
  
  ngOnInit(): void {
      this.userService.userObservable.subscribe( user => this.user = user)
    }

}
