import { FeedbackComponent } from './modules/feedback/feedback.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { PostsComponent } from './modules/posts/posts.component';
import { UserComponent } from './modules/user/user.component';
import { ProjectComponent } from './modules/project/project.component';
import { SprintComponent } from './modules/sprint/sprint.component';
import { TaskComponent } from './modules/task/task.component';
import { TodoListComponent } from './modules/todo-list/todo-list.component';
import { ProjectEditComponent } from './modules/project-edit/project-edit.component';
import { SprintsOverviewComponent } from './modules/sprints-overview/sprints-overview.component';
import { SprintEditComponent } from './modules/sprint-edit/sprint-edit.component';
import { TasksOverviewComponent } from './modules/tasks-overview/tasks-overview.component';
import { TaskEditComponent } from './modules/task-edit/task-edit.component';
import { ContactComponent } from './modules/contact/contact.component';



const routes: Routes = [{
  path: '',
  component: DefaultComponent,
  children: [{
    path: '',
    component: DashboardComponent
  }, {
    path: 'posts',
    component: PostsComponent
  }, {
    path: 'user',
    component: UserComponent
  }, {
    path: 'project',
    component: ProjectComponent
  },  {
    path: 'sprint',
    component: SprintComponent
  }, {
    path: 'task',
    component: TaskComponent
  },
  {
    path: 'todo-list',
    component: TodoListComponent
  },
  {
    path: 'projects/:id/edit',
    component: ProjectEditComponent
  },
  {
    path: 'sprints-overview',
    component: SprintsOverviewComponent
  },
  {
    path: 'tasks-overview',
    component: TasksOverviewComponent
  },
  {
    path: 'sprints/:id/edit',
    component: SprintEditComponent
  },
  {
    path: 'tasks/:id/edit',
    component: TaskEditComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'message',
    component: FeedbackComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
