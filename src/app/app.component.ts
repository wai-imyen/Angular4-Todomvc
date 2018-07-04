import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  inputHint = 'Hello Yen! What needs to be done?';
  todos: any[] = [];
  todo = '';
  filterType = 'All';
  toggleAll = false;

  private requestOptions = new RequestOptions({
    headers: new Headers({
      'authorization': 'token f5884e0b-f691-4779-a2be-e2b5275d1409'
    })
  });
  constructor(private http: Http) {

  }
  ngOnInit() {
    this.getTodos().subscribe(data => {
      this.todos = data;
    })
  }

  getTodos() {
    return this.http.get('/me/todomvc', this.requestOptions).map(res => {
      return res.json();
    }).catch(error => {
      console.log(error);
      return Observable.of<any[]>([]);
    })
  }

  saveTodos(newTodos: any[]) {
    return this.http.post('./me/todomvc', newTodos, this.requestOptions).map(res => {
      this.todos = res.json();
    }).catch(error => {
      console.log(error);
      return Observable.of<any[]>([]);
    })
  }


  addTodo() {

    if (this.todo !== '') {
      this.todos.push({
        text: this.todo,
        done: false
      });
      this.todo = '';

    }

  }

  clearCompleted() {
    this.todos = this.todos.filter(item => !item.done); // 選出所有未完成的 = todos
  }

  filterTypeChanged(filterType: string) {
    this.filterType = filterType;
  }

  toggleAllChanged(value: boolean) {
    this.todos.forEach(item => {
      item.done = value;
    });

  }

  updateToggleState() {
    this.toggleAll = this.todos.filter(item => !item.done).length === 0; // All selected = Ture
  }

  removeTodo(todo) {
    this.todos.splice(this.todos.indexOf(todo), 1);

  }


}
