import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { take, tap, exhaustMap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root'})
export class AuthGuardService implements CanActivate {
    
    constructor(private authService: AuthService,
                private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

        const user = this.authService.user.getValue();
        if (user && user.token) {
            // console.log('user is authenticated');
            return true;
        } else {
            // console.log('user is not authenticated, navigate to /auth');
            return this.router.parseUrl('/auth');
        }
    }

}