import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/model/user';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  username: string;
  password: string;
  email: string;
  displayName: string;
  role: string;
  roles: string[] = ['USER', 'ADMIN'];
  
  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  saveUser() {
    const user = new User(null, this.username, this.password, this.email, this.displayName, this.role);

    this.userService.saveUser(user)
      .subscribe(result => console.log(result));
  }

}




