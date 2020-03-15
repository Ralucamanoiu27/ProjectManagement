import { UserComponent } from './features/user/user.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectComponent } from './features/project/project.component';
import { HomeComponent } from './features/home/home.component';
import { ProjectsOverviewComponent } from './features/projects-overview/projects-overview.component';
import { ProjectEditComponent } from './features/project-edit/project-edit.component';
import { SprintComponent } from './features/sprint/sprint.component';
import { TaskComponent } from './features/task/task.component';
import { SprintsOverviewComponent } from './features/sprints-overview/sprints-overview.component';
import { TasksOverviewComponent } from './features/tasks-overview/tasks-overview.component';



const routes: Routes = [
  {
    path: 'project',
    component: ProjectComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: 'sprint',
    component: SprintComponent
  },
  {
    path: 'projects-overview',
    component: ProjectsOverviewComponent
  },
  {
    path: 'sprints-overview',
    component: SprintsOverviewComponent,
    //outlet: 'sprints-overview'
  },
  {
    path: 'tasks-overview',
    component: TasksOverviewComponent
  },
  {
    path: 'sprints/:id/edit',
    component: ProjectEditComponent
  },
  {
    path: 'projects/:id/edit',
    component: ProjectEditComponent
  },
  {
    path: 'task',
    component: TaskComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
