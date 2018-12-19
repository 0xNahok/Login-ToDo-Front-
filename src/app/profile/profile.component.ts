import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from '../interfaces/todo';
import { TodoListService } from '../services/todo-list.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';

import { UsermodalComponent } from './usermodal/usermodal.component';
import { AuthenticationService } from '../authentication.service';

import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

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
  Todo1: Todo[];
  Todo2: Todo[];
  Todo3: Todo[];
  userID;

  drop(event: CdkDragDrop<string[]>) {
    console.log(event.container.id);
    console.log(event.item.element.nativeElement.id);
    if(event.container.id == 'trash'){
      console.log("papelera");
      this.deleteTodo(event.item.element.nativeElement.id);
    }else if(event.container.id == '0' ||  event.container.id == '1' ||  event.container.id == '2'){
      console.log(event.item.element.nativeElement.id);
      this.updateTodo( event.item.element.nativeElement.id, event.container.id )
    }
    
  }


 private readonly notifier: NotifierService;
  private readonly modal: UsermodalComponent;

  constructor(private todoservice: TodoListService, notifierService: NotifierService, private router: Router, private fb: FormBuilder, public auth: AuthenticationService ) { 
    this.notifier = notifierService;
  
    this.createForm = this.fb.group({
      title: ['', Validators.required],
      userID: ''
    });
   }

  ngOnInit() {
    this.userID =this.auth.getUserDetails()._id;
    this.fetchTodo();
  }

  openmodal(){
    this.modal.open;
  }
 show(id){
   console.log(id)
 }
  fetchTodo() {
    console.log("fetch");
    console.log(this.userID);
    console.log("fetch");
    //this.userID =this.todoservice.getUserDetails();
    this.todoservice.getlist(this.userID)
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
      this.notifier.notify(data.type, data.message);
      this.fetchTodo();
    }, (err)=>{
      this.notifier.notify( err.error.type, err.error.message );
    });
  }

  addTodo(title) {
    this.createForm.reset();
    
    console.log(title + " "+ this.userID );
    this.todoservice.addTodo(title,this.userID).subscribe((data:DataResponse) => {
    this.notifier.notify(data.type, data.message);
      this.fetchTodo();
    }, (err)=>{
      this.notifier.notify( err.error.type, err.error.message );
    });

   
  }
  deleteTodo(id) {
    this.todoservice.deleteTodo(id).subscribe((data:DataResponse) => {
      this.fetchTodo();
      this.notifier.notify(data.type, data.message);
    });
  }
}


