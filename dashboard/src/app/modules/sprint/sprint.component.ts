import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/shared/model/project';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { SprintService } from './sprint.service';
import { ProjectService } from '../project/project.service';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';
import { startWith, map, flatMap } from 'rxjs/operators';
import { Sprint } from 'src/app/shared/model/sprint';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.scss']
})
export class SprintComponent implements OnInit {

  name: string;
  project: Project;
  dateFrom: Date;
  dateTo: Date;
  plannedStoryPoint: string;


  myControl = new FormControl();
  filteredOptions: Observable<Project[]>;



  constructor(private sprintService: SprintService,
              private projectService: ProjectService,
              private userService: UserService,
              private router: Router) { }

              // copiezi de la porject mapp
  ngOnInit(): void {

    // @ts-ignore
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        flatMap(name => this.projectService.searchProjectByName(name))
      );


  }


  displayFn(project?: Project): string | undefined {
    return project ? project.name : undefined;
  }

  saveSprint() {
    const project = this.myControl.value;
    const sprint = new Sprint(null, this.name,  project, this.dateFrom, this.dateTo, this.plannedStoryPoint );
    this.sprintService.saveSprint(sprint)
      // .subscribe(result => console.log(result));
      .subscribe(result => console.log('ok'),
        error => console.log(error));

  }

}
