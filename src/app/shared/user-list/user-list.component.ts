import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { EventsService } from 'src/app/core/services/events.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})


export class UserListComponent {

  @Input() event: Event
  user: User = this.userService.user$.getValue()

  constructor(private eventService: EventsService, private userService: UserService, private activatedRoute: ActivatedRoute,) {}

}
