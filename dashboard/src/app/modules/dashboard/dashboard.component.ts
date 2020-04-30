import { TaskService } from './../task/task.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { MatPaginator } from '@angular/material/paginator';
import { ProjectService } from '../project/project.service';
import { Observable } from 'rxjs';
import { Project } from 'src/app/shared/model/project';
import { Task } from 'src/app/shared/model/task';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isAdmin: boolean;
  bigChart = [];
  bigChartName = ['BACKLOG', 'TO_DO', 'IN_PROGRESS', 'QA', 'DONE'];
  bigChartProject = [];
  cards = [];
  pieChart = [];
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  projects: Observable<Project[]>;
  columnsToDisplay: string[];
  tasks: Observable<Task[]>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;



  constructor(private dashboardService: DashboardService,
              private projectService: ProjectService,
              private taskService: TaskService) { }

  ngOnInit(): void {

    this.isAdmin = localStorage.getItem('role') === 'ADMIN';
    
    this.cards = this.dashboardService.cards();

    this.projects = this.projectService.getAllProjects();
    this.tasks = this.taskService.getAllTasks();
    this.columnsToDisplay = ['id', 'name', 'description', 'administrator', 'actions'];
    this.projects.subscribe(result => {this.fillPieChart(result); } );

    for (let i = 0; i < this.bigChartName.length; i++) {
         this.bigChart.push({name: this.bigChartName[i],
                            data: [2, 2]});
         //console.log(i, this.bigChart[i]);
    }
    
    this.tasks.subscribe(result => {
      this.countStatus(result);
    });


  }
  countStatus(tasks: Task[]) {
    const projSet = new Map();
    for (const t of tasks) {
      projSet.set(t.sprint.project.name, 0);
    }
    this.bigChartProject = Array.from(projSet.keys());

    this.bigChart = [];
    for (let i = 0; i < this.bigChartName.length; i++) {
      for (const c of projSet.keys()) { projSet.set(c, 0); }
      for (const t of tasks) {
        if (t.progress === this.bigChartName[i]) {
          let val = projSet.get(t.sprint.project.name);
          val++;
          projSet.set(t.sprint.project.name, val);
        }
      }

      this.bigChart.push({name: this.bigChartName[i],
                        data: Array.from(projSet.values())});
      //console.log(i, this.bigChart[i]);
    }
  }
  
  fillPieChart(projects: Project[]) {
    const admins = new Map();
    for (const p of projects) {
      let val = 1;
      if (admins.has(p.administrator.displayName)) {
        val = admins.get(p.administrator.displayName);
        val++;
      }
      admins.set(p.administrator.displayName, val);
    }

    this.pieChart = [];
    for (const k of admins.keys()) {
      // console.log(k, admins.get(k));
      this.pieChart.push({name: k,
                          y:    admins.get(k)});
    }
  }

  deleteProject(id: number) {
    this.projectService.deleteProject(id)
      .subscribe(result => this.projects = this.projectService.getAllProjects());
  }



}
