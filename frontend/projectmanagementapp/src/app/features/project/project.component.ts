import { UserService } from './../user/user.service';
import { Project } from './../../shared/model/project';
import { ProjectService } from './project.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { User } from 'src/app/shared/model/user';

import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  name: string;
  description: string;
  user: User;


  myControl = new FormControl();
  filteredOptions: Observable<User[]>;


  constructor(private projectService: ProjectService,
              private userService: UserService) { }



  saveProject() {
    const project = new Project(null, this.name, this.description);
    this.projectService.saveProject(project)
    .subscribe(result => console.log(result));
  }


  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => this.userService.searchUserByName(name))
      );
  }

  displayFn(user?: User): string | undefined {
    return user ? user.displayedName : undefined;
  }
}

