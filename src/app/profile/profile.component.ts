import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from "../interfaces/todo";
import { TodoListService } from '../services/todo-list.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  createForm: FormGroup;
  Todo: Todo[];
  userID;


  constructor(private todoservice: TodoListService,  private router: Router,  private fb: FormBuilder, ) {

    this.createForm = this.fb.group({
      title: ['', Validators.required],
      userID: ''
    });
   }

  ngOnInit() {
    this.todoservice.getUserDetails();
    this.fetchIssues();
  }

  fetchIssues() {
    this.userID =this.todoservice.getUserDetails();
    this.todoservice
    .getlist()
    .subscribe((data: Todo[]) => {
      this.Todo = data;
      console.log('Data requested ... ');
      console.log(this.Todo);
    });
  }

 
  deleteTodo(id) {
    this.todoservice.deleteTodo(id).subscribe(() => {
      this.fetchIssues();
    });
  }

  addTodo(title) {
    this.userID =this.todoservice.getUserDetails();

    this.todoservice.addTodo(title,this.userID).subscribe(() => {
      this.fetchIssues();
    });

   
  }
}


