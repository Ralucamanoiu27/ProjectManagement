import { Component, OnInit } from '@angular/core';
import { MatTooltipDefaultOptions } from '@angular/material/tooltip';
import { Task } from 'src/app/shared/model/task';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/model/user';
import { Sprint } from 'src/app/shared/model/sprint';
import { TaskService } from '../task/task.service';
import { UserService } from '../user/user.service';
import { SprintService } from '../sprint/sprint.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map, flatMap, startWith } from 'rxjs/operators';
import { Email } from 'src/app/shared/model/email';




@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent implements OnInit {


  emailTo: string;
  username: string;
  emailFrom: string;
  subject: string;
  message: string;

difficulties: string[] = ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE'];
progresses: string[] = ['BACKLOG', 'TO_DO', 'IN_PROGRESS', 'QA', 'DONE'];

  task: Task;
  myControl = new FormControl();
  myControlTwo = new FormControl();

  filteredOptions: Observable<User[]>;
  filteredOptionsTwo: Observable<Sprint[]>;


  constructor( private taskService: TaskService,
               private userService: UserService,
               private sprintService: SprintService,
               private router: Router,
               private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      // tslint:disable-next-line: no-string-literal
      map(params => params['id']),
      flatMap(id => this.taskService.getTaskById(id))
    )
    .subscribe(task => {
      this.task = task;
      this.myControl.setValue(task.assignedPerson);
      this.myControlTwo.setValue(task.sprint);
    });


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

  updateTask() {
    this.task.assignedPerson = this.myControl.value;
    this.task.sprint = this.myControlTwo.value;
    this.taskService.updateTask(this.task.id, this.task)
      .subscribe(result => console.log('ok'),
        error => console.log(error));

  }

  sendEmail() {
    const emailTo = this.task.assignedPerson.email;
    const username = this.emailFrom;
    const subject = 'Feedback ticket';
    const e = new Email(username, emailTo, this.emailFrom , subject, this.message);
    this.taskService.sendEmail(e)
        .subscribe(result => console.log("send email"));
    }

}
