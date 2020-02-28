import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

interface AuthResponse{
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService{

    firebaseApiKey = environment.firebaseApiKey;
    endpoint = environment.firbasseSignUpUrl;

    constructor(private http: HttpClient){}
    
    signUp(email: string, password: string){
        
        let httpParams = new HttpParams();
        httpParams = httpParams.append('key', this.firebaseApiKey);

        return this.http.post<AuthResponse>(this.endpoint,
            {
                email: email,
                password: password,
                returnSecureToken: true
            },
            {
               params: httpParams 
            }
        )
        .pipe( catchError (errorResponse => {
           
            return throwError(this.getErrorMessage(errorResponse));
        }));
    }
    
    private getErrorMessage(errorResponse){

        let errorMessage = "Un error occured"
        if (!errorResponse.error || !errorResponse.error.error) {
            console.log('niet gevonden');
            return "errorMessage";
        }
        switch (errorResponse.error.error.message) {
            case "EMAIL_EXISTS":
                errorMessage = "The email address is already in use by another account.";
                break;
        }
        return errorMessage;
    }
}