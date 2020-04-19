import { Component, OnInit } from '@angular/core';
import { Sprint } from 'src/app/shared/model/sprint';
import { User } from 'src/app/shared/model/user';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { TaskService } from './task.service';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';
import { startWith, map, flatMap } from 'rxjs/operators';
import { Task } from 'src/app/shared/model/task';
import { SprintService } from '../sprint/sprint.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  nameTask: string;
  descriptionTask: string;
  sprint: Sprint;
  difficulty: string;
  storyPoints: string;
  progress: string;
  assignedPerson: User;

  difficulties: string[] = ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE'];
  progresses: string[] = ['BACKLOG', 'TO_DO', 'IN_PROGRESS', 'QA', 'DONE'];

  myControl = new FormControl();
  myControlTwo = new FormControl();

  filteredOptions: Observable<User[]>;
  filteredOptionsTwo: Observable<Sprint[]>;


  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private sprintService: SprintService,
    private router: Router) { }

  ngOnInit(): void {

    this.filteredOptionsTwo = this.myControlTwo.valueChanges
    .pipe(
       startWith(''),
       map(value => typeof value === 'string' ? value : value.name),
       flatMap(name => this.sprintService.searchByName(name))
    );
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        flatMap(name => this.userService.searchUserByName(name))
      );
  }

  displayFnTwo(sprint?: Sprint): string | undefined {
    return sprint ? sprint.name : undefined;
  }

  displayFn(user?: User): string | undefined {
    return user ? user.displayName : undefined;
  }

  saveTask() {
    const sprint = this.myControlTwo.value;
    const user = this.myControl.value;
    const progress = 'BACKLOG';
    // tslint:disable-next-line: max-line-length
    const task = new Task(null, this.nameTask, this.descriptionTask, sprint, this.difficulty, this.storyPoints, progress, user );
    this.taskService.saveTask(task)
      .subscribe(result => console.log('ok'),
        error => console.log(error));
    // return to table
    // this.router.navigateByUrl('/projects-overview');
  }

}

