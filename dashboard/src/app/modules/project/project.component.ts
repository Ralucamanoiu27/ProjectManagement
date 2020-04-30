import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/model/user';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProjectService } from './project.service';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';
import { map, startWith, flatMap } from 'rxjs/operators';
import { Project } from 'src/app/shared/model/project';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  name: string;
  description: string;
  user: User;


  myControl = new FormControl();
  filteredOptions: Observable<User[]>;


  constructor(private projectService: ProjectService,
              private userService: UserService,
              private router: Router,
              private toastr: ToastrService) { }


  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        flatMap(name => this.userService.searchUserByName(name))
      );

  }

  displayFn(user?: User): string | undefined {
    return user ? user.displayName : undefined;
  }

  saveProject() {
    const user = this.myControl.value;
    const project = new Project(null, this.name, this.description, user);
    this.projectService.saveProject(project)
      // .subscribe(result => console.log(result));
      .subscribe(result => console.log('ok'),
        error => console.log(error));

    this.toastr.success('Success!', 'The data has been saved!');
    
 
  }



}
