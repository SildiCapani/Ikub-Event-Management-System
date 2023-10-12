import { Injectable } from "@angular/core";
import { CanLoad, Route, Router, UrlSegment, UrlTree } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { User } from "../models/User";


@Injectable({
    providedIn: 'root'
})

export class RoleGuard implements CanLoad {

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
    
    canLoad(route: Route): boolean {
        const user = this.getUserFromLocalStorage()
        if(user?.role == "organizer") {
            return true
        } else if (user) {
            this.toastrService.warning('Not Authorized!')
            return false
        } else {
            this.router.navigate(['/login'])
            return false
        }
    }

}