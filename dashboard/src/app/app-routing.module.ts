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
  }]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
