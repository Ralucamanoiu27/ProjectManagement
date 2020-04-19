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
  statusBar = [];
  statusLabel = ['BACKLOG', 'TO_DO', 'IN_PROGRESS', 'QA', 'DONE'];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.tasks = this.taskService.getAllTasks();
    // tslint:disable-next-line: max-line-length
    this.columnsToDisplay = ['id', 'nameTask', 'descriptionTask',
                             'sprint', 'difficulty', 'storyPoints', 'progress',
                             'assignedPerson', 'actions'];
    this.tasks.subscribe(result => {
      this.countStatus(result);
    });
  }

  countStatus(tasks: Task[]) {
    this.statusBar = [0, 0, 0, 0, 0];
    for (let i = 0; i < this.statusLabel.length; i++) {
      for (const t of tasks) {
        if (t.progress === this.statusLabel[i]) {
          this.statusBar[i]++;
        }
      }
      // console.log(i, this.statusBar[i], this.statusLabel[i]);
    }
  }

  deleteTask(id: number) {
      this.taskService.deleteTasks(id)
        .subscribe(result => this.tasks = this.taskService.getAllTasks());
  }

}
