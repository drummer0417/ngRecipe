import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Observable, Subject, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { Sauce } from 'protractor/built/driverProviders';
import { RecipeStartComponent } from '../recipes/recipe-start/recipe-start.component';

export interface AuthResponse {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

interface RefreshResponse {
    access_token: string;
    expires_in: string;
    token_type: string;
    refresh_token: string;
    id_token: string;
    user_id: string;
    project_id: string;
}


@Injectable({ providedIn: 'root' })
export class AuthService {

    firebaseApiKey = new HttpParams().set('key',environment.firebaseApiKey) ;
    user = new BehaviorSubject<User>(null);

    autoLogoffTimer: any;
    autoRefreshTimer: any;

    constructor(private http: HttpClient,
                private router: Router) { }

    login(email: string, password: string) {

        let endpoint = environment.firebaseSignInUrl;
        return this.loginOrSignUp(email, password, endpoint);
    }

    signUp(email: string, password: string): Observable<AuthResponse> {

        let endpoint = environment.firebaseSignUpUrl;
        return this.loginOrSignUp(email, password, endpoint);
    }

    private loginOrSignUp(email: string, password: string, endpoint: string): Observable<AuthResponse> {

        return this.http.post<AuthResponse>(endpoint,
            {
                email: email,
                password: password,
                returnSecureToken: true
            },
            {
                params: this.firebaseApiKey
            }
        )
            .pipe(
                catchError(errorResponse => {
                    return throwError(this.getErrorMessage(errorResponse));
                }),
                tap( (response: AuthResponse) => {
                    const expirationDate = 
                        new Date(new Date().getTime() + ( +response.expiresIn * 1000 )); 
                    let user = new User(
                        response.email,
                        response.localId,
                        response.refreshToken,
                        response.idToken,
                        expirationDate
                    )
                    this.user.next(user);
                    localStorage.setItem('userData', JSON.stringify(user));
                    this.autoLogout(user);
                    this.autoRefreshToken();
                })
            );
    }

    autoLogin(){
        const savedUser : { 
            email: string, 
            id: string, 
            refreshToken: string,
            _token: string, 
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));
        if (savedUser) {
            const user =
                new User(savedUser.email, savedUser.id, savedUser.refreshToken, savedUser._token, new Date(savedUser._tokenExpirationDate));
            if (user.token) {
                this.user.next(user);
                this.autoLogout(user)                
            }
        }
    }

    private autoLogout(user: User){
        
        const millisecondsLeft = user.tokenExpirationDate.getTime() - new Date().getTime();
        
        this.autoLogoffTimer = setTimeout(() => {
            this.logout();
        }, millisecondsLeft);
    }

    logout(){
        localStorage.removeItem('userData');
        if (this.autoLogoffTimer) {
            clearTimeout(this.autoLogoffTimer)
        }  
        if (this.autoRefreshTimer) {
            clearTimeout(this.autoRefreshTimer)
        }
        this.user.next(null);
        this.router.navigate(['/auth']);
    }
    
    private autoRefreshToken() {

        this.autoRefreshTimer = setTimeout(() =>{
            this.refreshToken();
        } , 3540000);
        // } , 15000);
    }

    private refreshToken(){

        clearTimeout(this.autoRefreshTimer);

        if (this.user) {
            const user = this.user.getValue();
            const endpoint = environment.firebaseRefreshUrl;
            const body = 'grant_type=refresh_token&refresh_token=' + user.refreshToken

            this.http.post<RefreshResponse>(endpoint , body,
                {
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    params: this.firebaseApiKey
                },
            ).pipe(
                    catchError(errorResponse => {
                        return throwError(this.getErrorMessage(errorResponse));
            }),
            ).subscribe( response => {

                const expirationDate = new Date(new Date().getTime() + ( +response.expires_in * 1000 )); 
                
                user.token = response.id_token;
                user.tokenExpirationDate = expirationDate;
                user.refreshToken = response.refresh_token;

                this.user.next(user);
                localStorage.setItem('userData', JSON.stringify(user));
                
                clearTimeout(this.autoLogoffTimer); // clear the current logoff timer
                this.autoLogout(user); // call autoLogout for the next auto logout
                this.autoRefreshToken(); // call autoRefresh for next refresh
            });
        }
    }

    private getErrorMessage(errorResponse) {

        let errorMessage = "Un error occured"
        if (!errorResponse.error || !errorResponse.error.error) {
            return errorMessage;
        }
        switch (errorResponse.error.error.message) {
            case "EMAIL_EXISTS":
                errorMessage = "The email address is already in use by another account";
                console.log("The email address is already in use by another account");
                break;
            case "EMAIL_NOT_FOUND":
                console.log("There is no user record corresponding to this identifier");
                errorMessage = "Invalid userid or password";
                break;
            case "INVALID_PASSWORD":
                console.log("The password is invalid or the user does not have a password");
                errorMessage = "Invalid userid or password"
                break;
            case "EUSER_DISABLED":
                errorMessage = "Invalid userid or password";
                console.log("The user account has been disabled by an administrator");
                break;
        }
        return errorMessage;
    }
}