import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  inLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void { }

  onSwichLoginMode() {
    this.inLoginMode = !this.inLoginMode;
  }

  onSubmit(signInForm: NgForm) {
    this.error = null;
    if (this.inLoginMode) {
      this.login(signInForm);
    } else {
      this.signUp(signInForm);
    }
  }

  login(signInForm: NgForm) {
    const email = signInForm.value.email;
    const password = signInForm.value.password;
    throw new Error("Method not implemented.");
  }

  signUp(signInForm: NgForm) {
    const email = signInForm.value.email;
    const password = signInForm.value.password;
    this.isLoading = true;
    console.log('isLoading: ' + this.isLoading);

    this.authService.signUp(email, password).subscribe(
      response => {
        console.log(response);
        signInForm.reset();
        this.isLoading = false;
        console.log('isLoading: ' + this.isLoading);
      },
      ( errorMessage: string) => {
          console.log(errorMessage);
          this.error = errorMessage;
          this.isLoading = false;
      })
  }
}
