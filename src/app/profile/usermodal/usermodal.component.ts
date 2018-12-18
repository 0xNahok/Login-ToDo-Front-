import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AuthenticationService, TokenPayload } from '../../authentication.service';


export interface UserDetails {
  _id: string;
  email: string;
  username: string;
  name: string;
  exp: number;
  iat: number;
};


@Component({
  selector: 'app-usermodal',
  templateUrl: './usermodal.component.html',
  styleUrls: ['./usermodal.component.css'],
  providers: [NgbModalConfig, NgbModal]
})


export class UsermodalComponent implements OnInit {

  credentials: TokenPayload = {
    userID : '',
    email: '',
    username: '',
    password: '',
    name: ''
  };

  private token: string;

  private User;

  constructor(config: NgbModalConfig, private modalService: NgbModal, private auth: AuthenticationService, private router: Router) {
    config.backdrop = 'static';
    config.keyboard = false;
   }

  ngOnInit() {
    this.User=this.getUserDetails();
    this.updateInput();
    console.log(this.credentials);
    console.log(this.User);
  }
  
  updateInput(){
    this.credentials.userID = this.User._id;
    this.credentials.name = this.User.name;
    this.credentials.username = this.User.username;
    this.credentials.email = this.User.email;
  }

  update() {
    this.modalService.dismissAll();
    console.log(this.credentials);
    this.auth.update(this.credentials).subscribe((data) => {
      console.log(data);
      
     this.token = '';
     window.localStorage.removeItem('mean-token');
     this.router.navigateByUrl('/');
     location.reload();
    }, (err) => {
      console.log(this);

      console.error(err.error.message);
 
    });
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      let JSONpayload = JSON.parse(payload);

      return JSONpayload;
    } else {
      return null;
    }
  }

  open(content) {
    this.modalService.open(content);
  }
  close(content)
  {
    this.modalService.dismissAll(content);
  }
}
