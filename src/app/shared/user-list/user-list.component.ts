import { Component, Input } from '@angular/core';
import { User } from 'src/app/core/models/user';
import { EventsService } from 'src/app/core/services/events.service';
import { UserService } from 'src/app/core/services/user.service';
import { Roles } from 'src/app/enums';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})


export class UserListComponent {

  @Input() event: Event;
  Roles: typeof Roles = Roles;
  user: User = this.userService.user$.getValue()

  constructor(private eventService: EventsService, private userService: UserService,) {}

}
