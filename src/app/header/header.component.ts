import { Component } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { User } from '../models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent {

  user?: User
  searchValue: string = '';


  constructor(private userService: UserService) {
    userService.userObservable.subscribe(user => this.user = user)
  }

  onLogout(): void{
    this.userService.onLogout()
  }

}
