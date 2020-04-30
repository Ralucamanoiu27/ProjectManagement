import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from 'src/app/shared/model/task';
import { TaskService } from '../task/task.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tasks-overview',
  templateUrl: './tasks-overview.component.html',
  styleUrls: ['./tasks-overview.component.scss']
})
export class TasksOverviewComponent implements OnInit {

  isAdmin: boolean;
  tasks: Observable<Task[]>;
  dataSource: MatTableDataSource<Task>;
  columnsToDisplay: string[];
  statusBar = [];
  statusLabel = ['BACKLOG', 'TO_DO', 'IN_PROGRESS', 'QA', 'DONE'];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.isAdmin = localStorage.getItem('role') === 'ADMIN';
    this.tasks = this.taskService.getAllTasks();
    // tslint:disable-next-line: max-line-length
    this.columnsToDisplay = ['id', 'nameTask', 'descriptionTask',
                             'sprint', 'difficulty', 'storyPoints', 'progress',
                             'assignedPerson', 'actions'];
    this.tasks.subscribe(result => {
      this.countStatus(result);
      this.dataSource = new MatTableDataSource(result);

      this.dataSource.filterPredicate = function(data, filter: string): boolean {
      return data.sprint.name.toLowerCase().includes(filter);
    };
    });

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
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
