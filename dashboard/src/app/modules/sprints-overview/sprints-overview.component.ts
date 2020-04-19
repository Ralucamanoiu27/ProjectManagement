import { Component, OnInit } from '@angular/core';
import { SprintService } from '../sprint/sprint.service';
import { Observable } from 'rxjs';
import { Sprint } from 'src/app/shared/model/sprint';
import { Todo } from 'src/app/interfaces/todo';

import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-sprints-overview',
  templateUrl: './sprints-overview.component.html',
  styleUrls: ['./sprints-overview.component.scss'],
  animations: [
    trigger('fade', [

      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate(200, style({ opacity: 1, transform: 'translateY(0px)'}))
      ]),

      transition(':leave', [
        animate(200, style({ opacity: 0, transform: 'translateY(30px)' }))
      ]),

    ])
  ]
})
export class SprintsOverviewComponent implements OnInit {

  todos: Todo[];
  todoTitle: string;
  idForTodo: number;
  beforeEditCache: string;
  filter: string;
  anyRemainingModel: boolean;

  sprints: Observable<Sprint[]>;
  columnsToDisplay: string[];


  constructor(private sprintService: SprintService) {}

  ngOnInit() {

    this.sprints = this.sprintService.getAllSprints();
    this.columnsToDisplay = ['id', 'name', 'project', 'dateFrom', 'dateTo', 'plannedStoryPoint', 'actions'];

    this.anyRemainingModel = true;
    this.filter = 'all';
    this.beforeEditCache = '';
    this.idForTodo = 4;
    this.todoTitle = '';
    this.todos = [
      {
        id: 1,
        title: 'Finish Angular Screencast',
        completed: false,
        editing: false,
      },
      {
        id: 2,
        title: 'Take over world',
        completed: false,
        editing: false,
      },
      {
        id: 3,
        title: 'One more thing',
        completed: false,
        editing: false,
      },
    ];
  }


  displayFnTwo(sprint?: Sprint): string | undefined {
    return sprint ? sprint.name : undefined;
  }

  deleteSprint(id: number) {
      this.sprintService.deleteSprint(id)
        .subscribe(result => this.sprints = this.sprintService.getAllSprints());
  }




addTodo(): void {
  if (this.todoTitle.trim().length === 0) {
    return;
  }

  this.todos.push({
    id: this.idForTodo,
    title: this.todoTitle,
    completed: false,
    editing: false
  });

  this.todoTitle = '';
  this.idForTodo++;
}

editTodo(todo: Todo): void {
  this.beforeEditCache = todo.title;
  todo.editing = true;
}

doneEdit(todo: Todo): void {
  if (todo.title.trim().length === 0) {
    todo.title = this.beforeEditCache;
  }

  this.anyRemainingModel = this.anyRemaining();
  todo.editing = false;
}

cancelEdit(todo: Todo): void {
  todo.title = this.beforeEditCache;
  todo.editing = false;
}

deleteTodo(id: number): void {
  this.todos = this.todos.filter(todo => todo.id !== id);
}

remaining(): number {
  return this.todos.filter(todo => !todo.completed).length;
}

atLeastOneCompleted(): boolean {
  return this.todos.filter(todo => todo.completed).length > 0;
}

clearCompleted(): void {
  this.todos = this.todos.filter(todo => !todo.completed);
}

checkAllTodos(): void {
  // tslint:disable-next-line: deprecation
  this.todos.forEach(todo => todo.completed = (event.target as HTMLInputElement).checked);
  this.anyRemainingModel = this.anyRemaining();
}

anyRemaining(): boolean {
  return this.remaining() !== 0;
}

todosFiltered(): Todo[] {
  if (this.filter === 'all') {
    return this.todos;
  } else if (this.filter === 'active') {
    return this.todos.filter(todo => !todo.completed);
  } else if (this.filter === 'completed') {
    return this.todos.filter(todo => todo.completed);
  }

  return this.todos;
}

}
