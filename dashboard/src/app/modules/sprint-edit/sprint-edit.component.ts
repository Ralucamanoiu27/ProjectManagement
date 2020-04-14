import { SprintService } from './../sprint/sprint.service';
import { Component, OnInit } from '@angular/core';
import { MatTooltipDefaultOptions } from '@angular/material/tooltip';
import { Sprint } from 'src/app/shared/model/sprint';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Project } from 'src/app/shared/model/project';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../project/project.service';
import { startWith, map, flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-sprint-edit',
  templateUrl: './sprint-edit.component.html',
  styleUrls: ['./sprint-edit.component.scss']
})


export class SprintEditComponent implements OnInit {
  sprint: Sprint;
  myControl = new FormControl();
  filteredOptions: Observable<Project[]>;


constructor(private activatedRoute: ActivatedRoute,
            // tslint:disable-next-line: max-line-length
            private sprintService: SprintService,
            private projectService: ProjectService,
            private router: Router) { }


  ngOnInit(): void {

    this.activatedRoute.params
    .pipe(
      // tslint:disable-next-line: no-string-literal
      map(params => params['id']),
      flatMap(id => this.sprintService.getSprintById(id))
    )
    .subscribe(sprint => {
      this.sprint = sprint;
      this.myControl.setValue(sprint.project);
    });
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

  updateSprint() {
    this.sprint.project = this.myControl.value;
    this.sprintService.updateSprint(this.sprint.id, this.sprint)
      .subscribe(result => console.log('ok'),
        error => console.log(error));

  }

}



