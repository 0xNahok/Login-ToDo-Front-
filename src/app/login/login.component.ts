import { Component } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../authentication.service';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {
  credentials: TokenPayload = {
    email: '',
    password: ''
  };
  private readonly notifier: NotifierService;

  constructor(private auth: AuthenticationService, private router: Router, notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  login() {
    
    this.auth.login(this.credentials).subscribe(() => {
      console.log("Login")
   
      this.router.navigateByUrl('/profile');
    }, (err) => {
      console.log(this);
      this.notifier.notify( err.error.type, err.error.message );
      console.error(err.error.message);
    });
  }
}