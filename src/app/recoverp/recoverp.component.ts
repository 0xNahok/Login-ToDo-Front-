import { Component } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../authentication.service';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-recoverp',
  templateUrl: './recoverp.component.html',
  styleUrls: ['./recoverp.component.css']
})
export class RecoverpComponent  {
  private readonly notifier: NotifierService;
  credentials: TokenPayload = {
    email: '',
  };
  constructor(private auth: AuthenticationService, private router: Router, notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  ngOnInit() {
  }

  resetpassword(){
    this.auth.resetpassword(this.credentials).subscribe(() => {
      console.log("Log");
      //this.router.navigateByUrl('/profile');
    }, (err) => {
      
      this.notifier.notify( err.error.type, err.error.message );
      console.error(err.error.message);
 
    });
  }
}
