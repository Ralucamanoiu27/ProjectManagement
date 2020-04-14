import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from 'src/app/shared/model/task';
import { TaskService } from '../task/task.service';

@Component({
  selector: 'app-tasks-overview',
  templateUrl: './tasks-overview.component.html',
  styleUrls: ['./tasks-overview.component.scss']
})
export class TasksOverviewComponent implements OnInit {

  tasks: Observable<Task[]>;
  columnsToDisplay: string[];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.tasks = this.taskService.getAllTasks();
    // tslint:disable-next-line: max-line-length
    this.columnsToDisplay = ['id', 'nameTask', 'descriptionTask',
                             'sprint', 'difficulty', 'storyPoints', 'progress',
                             'assignedPerson', 'actions', 'update'];

  }

  deleteTask(id: number) {
      this.taskService.deleteTasks(id)
        .subscribe(result => this.tasks = this.taskService.getAllTasks());
  }

}
