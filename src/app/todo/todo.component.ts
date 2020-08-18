import { Component, OnInit } from '@angular/core';
import { Todo } from '../interfaces/todo';
import { NgForm } from '@angular/forms';

//@Component is a decorator that provides meta-data for Angular to know what this file is all about.
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [
    {
      task: 'Make a pot of coffee',
      completed: false,
    },
    {
      task: 'Exercise for 30 mins',
      completed: false,
    },
    {
      task: 'Wash and fold laundry',
      completed: true,
    },
  ];

  // This line of code below initializes searchTerm -- we wnat it to be a string.
searchTerm: string;

showIndex: number;

  constructor() {}

  setShowIndex(index: number) {
    this.showIndex = index;
  }

  resetShowIndex() {
    this.showIndex = undefined;
  }

// This is a method to add a task through a form input.
// The Todo after newToDo simply means we want the newTodo to match the Todo interface format/properties.
// Task: and Complated: are properties within that interface so they are required here.
  addTask(form: NgForm) {
    let newTodo: Todo = {
      task: form.value.task,
      completed: false,
    };
    this.todos.push(newTodo);
    // This line of code below resets the form
    form.reset();
  }

  // This method removes a task at a specific index so only that single task is removed.
  removeTask(index: number) {
    this.todos.splice(index, 1);
  }

  // This method 
  completeTask(index: number) {
    // this line of code below is saying we are taking the task at a specific index and changing the completed state from the default of false and making it true.
    this.todos[index].completed = true;
  }

// This method allows us to filter. Before we proceed with the method we need to inital searchTerm as a value above the constructor.
setSearchTerm(form: NgForm) {
  this.searchTerm = form.value.searchTerm.toLowerCase().trim();
}

// above we added at the end of searchTerm .toLowerCase() and .trim() so that capital letters are converted to lowercase and additional spaces are removed since the searchTerm input field is case sensitive
filter() {
  if(!this.searchTerm) {
    return this.todos; // this line of code returns the todo list as is when no searchterm is entered
  } else { // the code block below says otherwise when a term is entered filter through the array and look at each item in the todo array as a chore.
    return this.todos.filter((chore) => {
      let currentTask = chore.task.toLowerCase().trim();
      // by implementing the task above we converted the task to lowercase and trimmed additional spaces
      //the below line of code says look at each chore (or each todo item) get the task using dot notation to see if the text of that task includes the character of whatever is in the search term (includes.searchTerm)
      return currentTask.includes(this.searchTerm);
      // above we now return currentTask so we are returning the converted/trimmed task that matches the searchTerm
    });
  }
}
  ngOnInit(): void {}
}
