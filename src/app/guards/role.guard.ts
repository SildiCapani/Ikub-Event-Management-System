import { Injectable } from "@angular/core";
import { CanLoad, Route, Router, UrlSegment, UrlTree } from "@angular/router";


@Injectable({
    providedIn: 'root'
})

export class RoleGuard implements CanLoad {

    private USER_KEY = 'User';

    constructor(private router: Router) { }

    
    canLoad(route: Route): boolean {
        return true
    }

}