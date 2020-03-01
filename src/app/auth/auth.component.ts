import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { AuthResponse } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  inLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void { }

  onSwichLoginMode() {
    this.inLoginMode = !this.inLoginMode;
  }

  onSubmit(signInForm: NgForm) {
    const email = signInForm.value.email;
    const password = signInForm.value.password;
    this.error = null;
    this.isLoading = true;

    let authObservable: Observable<AuthResponse>;
    
    if (this.inLoginMode) {
      authObservable = this.authService.login(email, password);
    } else {
      authObservable = this.authService.signUp(email, password);
    }
    authObservable.subscribe(
      (response: AuthResponse) => {
        signInForm.reset();
        this.isLoading = false;
        console.log('login/signUp;  ' + response.email +  ' succesful');
        console.log('response'+ JSON.stringify(response) );
        
        this.router.navigate(['/recipes'])
      },
      ( errorMessage: string) => {
          this.error = errorMessage;
          this.isLoading = false;
      })
  }
}
