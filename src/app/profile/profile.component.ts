import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from "../interfaces/todo";
import { TodoListService } from '../services/todo-list.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';

import { UsermodalComponent } from './usermodal/usermodal.component';

export interface DataResponse {
  type: string;
  message: string;
};


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})



export class ProfileComponent implements OnInit {
  createForm: FormGroup;
  Todo: Todo[];
  userID;

 private readonly notifier: NotifierService;
  private readonly modal : UsermodalComponent

  constructor(private todoservice: TodoListService, notifierService: NotifierService, private router: Router, private fb: FormBuilder ) {
    
    this.notifier = notifierService;
    
    this.createForm = this.fb.group({
      title: ['', Validators.required],
      userID: ''
    });
   }

  ngOnInit() {
    this.todoservice.getUserDetails();
    this.fetchTodo();
  }

  openmodal(){
    this.modal.open;
  }
 
  fetchTodo() {
    this.userID =this.todoservice.getUserDetails();
    this.todoservice
    .getlist()
    .subscribe((data: Todo[]) => {
      this.Todo = data;
      console.log('Data requested ... ');
      console.log(this.Todo);
    });
  }

 
  updateTodo(id, status) {
    console.log(id);
    console.log(status);

    this.todoservice.updateTodo(id, status).subscribe((data:DataResponse) => {
    //  this.notifier.notify(data.type, data.message);
     
      this.fetchTodo();
    }, (err)=>{
      this.notifier.notify( err.error.type, err.error.message );
    });
  }

  addTodo(title) {
    this.userID =this.todoservice.getUserDetails();
    this.todoservice.addTodo(title,this.userID).subscribe((data:DataResponse) => {
    this.notifier.notify(data.type, data.message);

      this.fetchTodo();
    }, (err)=>{
      this.notifier.notify( err.error.type, err.error.message );
    });

   
  }
}


