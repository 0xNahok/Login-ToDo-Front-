import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface TodoDetails {
  _id: string;
  title: string;
  userID: string;
  completed: boolean;
}
export interface UserDetails {
  _id: string;
  email: string;
  name: string;
  exp: number;
  iat: number;
}


export interface TokenPayload {
  email: string;
  password: string;
  name?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  private token: string;
  uri = 'http://localhost:3000/api/todo';

  constructor(private http: HttpClient, private router: Router) {
  
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
      console.log(JSONpayload._id);
      return JSONpayload._id;
    } else {
      return null;
    }
  }
  
  getlist() {
   let userID= this.getUserDetails();
  
    return this.http.get(`${this.uri}/`+userID);
  }

  addTodo(title, userID) {
    const todo = {
      title: title,
      userID: userID
    };
    return this.http.post(`${this.uri}/create`, todo);
  }

  deleteTodo(id) {
 
    console.log(this.http.get(`${this.uri}/delete/${id}`));
    return this.http.get(`${this.uri}/delete/${id}`);
    
  }

}