import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProjectComponent } from './features/project/project.component';
import { HomeComponent } from './features/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './shared/material/material.module';
import { UserComponent } from './features/user/user.component';
import { ProjectsOverviewComponent } from './features/projects-overview/projects-overview.component';
import { ProjectEditComponent } from './features/project-edit/project-edit.component';
import { SprintComponent } from './features/sprint/sprint.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { TaskComponent } from './features/task/task.component';
import { SprintsOverviewComponent } from './features/sprints-overview/sprints-overview.component';
import { TasksOverviewComponent } from './features/tasks-overview/tasks-overview.component';
import { RouterModule, RouterState} from '@angular/router';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

@NgModule({
  declarations: [
    AppComponent,
    ProjectComponent,
    HomeComponent,
    UserComponent,
    ProjectsOverviewComponent,
    ProjectEditComponent,
    SprintComponent,
    TaskComponent,
    SprintsOverviewComponent,
    TasksOverviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatInputModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);