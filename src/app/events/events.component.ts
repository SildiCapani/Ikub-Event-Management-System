import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { UserService } from '../services/user/user.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})


export class EventsComponent implements OnInit {
  
  user!: User[]
  users?: User;
  usersSubscription!: Subscription;

  constructor(private userService: UserService, private db: AngularFireDatabase) {
    
  }

  ngOnInit(): void {
      this.userService.getUsers().subscribe(user => this.user = user)
      this.userService.userObservable.subscribe( user => this.users = user)
    }

}
