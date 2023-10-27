import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent {

  user = this.userService.user$
  searchValue: string = '';


  constructor(private userService: UserService, private languageService: LanguageService) {
  }

  onLogout(): void{
    this.userService.onLogout()
  }

  changeLanguage(language: string) {
    this.languageService.setLanguage(language);
  }

}
