import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../authentication.service';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent   {
  credentials: TokenPayload = {
    email: '',
    username: '',
    password: '',
    repassword: '',
    name: ''
  };

  private readonly notifier: NotifierService;

  constructor(private auth: AuthenticationService,  notifierService: NotifierService, private router: Router) {
    this.notifier = notifierService;
  }

  register() {

    this.auth.register(this.credentials).subscribe(() => {
      console.log("Log");
      this.router.navigateByUrl('/profile');
    }, (err) => {
      console.log(this);
      console.log(err);
      this.notifier.notify( err.error.type, err.error.message );
      console.error(err.error.message);
 
    });
  }

}
