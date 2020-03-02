import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpParams} from '@angular/common/http'
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { exhaustMap, take} from 'rxjs/operators';
import { User } from './user.model';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
    
    constructor(private autService: AuthService){}
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
           
        return this.autService.user.pipe(
            take(1), 
            exhaustMap(user => {
                
                if (user === null) {
                    return next.handle(req);
                }
                let newRequest: HttpRequest<any> = req.clone(
                {
                    params: new HttpParams().set('auth', user.token)
                }
            );
            return next.handle(newRequest);
        })) 
    }

}