import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Observable, Subject, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { Sauce } from 'protractor/built/driverProviders';

export interface AuthResponse {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

    firebaseApiKey = environment.firebaseApiKey;
    user = new BehaviorSubject<User>(null);

    autoLogoffTimer: any;

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

        let httpParams = new HttpParams();
        httpParams = httpParams.append('key', this.firebaseApiKey);

        return this.http.post<AuthResponse>(endpoint,
            {
                email: email,
                password: password,
                returnSecureToken: true
            },
            {
                params: httpParams
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
                        response.idToken,
                        expirationDate
                    )
                    this.user.next(user);
                    localStorage.setItem('userData', JSON.stringify(user));
                    this.autoLogout(user);
                })
            );
    }

    autoLogin(){
        const savedUser : { 
            email: string, 
            id: string, 
            _token: string, 
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));
        if (savedUser) {
            const user =
                new User(savedUser.email, savedUser.id, savedUser._token, new Date(savedUser._tokenExpirationDate));
            if (user.token) {
                this.user.next(user);
                this.autoLogout(user)                
            }
        }
    }

    private autoLogout(user: User){
        
        const millisecondsLeft = user.tokenExpirationDate.getTime() - new Date().getTime();
        console.log("logout after: " + millisecondsLeft);
        
        this.autoLogoffTimer = setTimeout(() => {
            this.logout();
            console.log('autologoff triggerd now');
        }, millisecondsLeft);
    }

    logout(){
        localStorage.removeItem('userData');
        if (this.autoLogoffTimer) {
            clearTimeout(this.autoLogoffTimer)
        }
        this.user.next(null);
        this.router.navigate(['/auth']);
    }

    private getErrorMessage(errorResponse) {

        let errorMessage = "Un error occured"
        if (!errorResponse.error || !errorResponse.error.error) {
            console.log(errorResponse);
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