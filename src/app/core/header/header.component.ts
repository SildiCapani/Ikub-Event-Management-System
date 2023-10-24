import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from 'src/app/core/models/user';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent {

  user?: User
  searchValue: string = '';


  constructor(private userService: UserService, private languageService: LanguageService) {
    userService.userObservable.subscribe(user => this.user = user)
  }

  onLogout(): void{
    this.userService.onLogout()
  }

  changeLanguage(language: string) {
    this.languageService.setLanguage(language);
  }

}
