import { Component, OnInit } from '@angular/core';
import { map, flatMap, startWith } from 'rxjs/operators';
import { ProjectService } from './../project/project.service';
import {ActivatedRoute, Router} from '@angular/router';
import { Project } from 'src/app/shared/model/project';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/model/user';
import { UserService } from '../user/user.service';
import {MatTooltipDefaultOptions} from '@angular/material/tooltip';
import { ToastrService } from 'ngx-toastr';

export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 1000,
  hideDelay: 1000,
  touchendHideDelay: 1000,
};

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent implements OnInit {

  
  project: Project;
  myControl = new FormControl();
  filteredOptions: Observable<User[]>;

  // tslint:disable-next-line: max-line-length
  constructor(private activatedRoute: ActivatedRoute,
              private projectService: ProjectService, private userService: UserService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit() {

    
    this.activatedRoute.params
    .pipe(
      // tslint:disable-next-line: no-string-literal
      map(params => params['id']),
      flatMap(id => this.projectService.getProjectById(id))
    )
    .subscribe(project => {
      this.project = project;
      this.myControl.setValue(project.administrator);
    });
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.username),
        flatMap(name => this.userService.searchUserByName(name))
      );
  }
  displayFn(user?: User): string | undefined {
    return user ? user.displayName : undefined;
  }
  updateProject() {
    this.project.administrator = this.myControl.value;
    this.projectService.updateProject(this.project.id, this.project)
    .subscribe(result => console.log('ok'),
    error => console.log(error));

    // this.router.navigateByUrl('/home');
    this.toastr.success('Updated!', 'The data has been changed!');

  }
}
