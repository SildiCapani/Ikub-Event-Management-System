import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Roles } from 'src/app/enums';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  private USER_KEY = 'User';

    constructor(private router: Router, private toastrService: ToastrService) { }

    getUserFromLocalStorage(): User | null {
        const userJson = localStorage.getItem(this.USER_KEY);
        if(userJson){
            const user = JSON.parse(userJson) as User;
            return user
        }
        return null
    }

    canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const user = this.getUserFromLocalStorage();
      if ( user.role == Roles.ADMIN ) {
        return true;
      } else if (user) {
        this.toastrService.warning('Not Authorized!')
        this.router.navigateByUrl('/dashboard')
        return false
      } else {
        this.router.navigateByUrl('/dashboard')
      return false 
      }
    }
  
}
